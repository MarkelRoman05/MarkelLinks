import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import emailjs from '@emailjs/browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgendaEventoTextComponent } from './agenda-evento-text/agenda-evento-text.component';

declare global {
  interface Window {
    clarity: (event: string, options?: any) => void;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgendaEventoTextComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  searchTerm: string = '';
  filteredLinks: any[] = [];
  groupedLinks: { [provider: string]: any[] } = {};
  providers: string[] = [];
  loading: boolean[] = [true, true, true, true, true];
  isMobile: boolean = false;
  isMenuOpen: boolean = false; // Añadido para el menú móvil
  isScrolled: boolean = false; // Para detectar el scroll
  contact = { name: '', email: '', message: '' };

  isImagePopupOpen: boolean = false;
  popupImageUrl: string = '';

  location = window.location;
  lastUpdate: string = '';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    window.clarity('consent');
    this.getLastCommitDate();
  }

  private getLastCommitDate() {
    const owner = 'MarkelRoman05';
    const repo = 'AcestreamLinks';
    const branch = 'master';

    // Token de acceso personal de GitHub (esto debería estar en un archivo de entorno)
    // Este token es un ejemplo y deberá ser reemplazado por tu propio token
    const token = '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';

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;

    console.log('Fetching from URL:', apiUrl);

    // Configurar los headers para la autenticación
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    this.http.get(apiUrl, { headers }).subscribe(
      (response: any) => {
        console.log('Response:', response);
        if (response && response.commit && response.commit.author) {
          this.lastUpdate = response.commit.author.date;
        } else {
          this.lastUpdate = 'Formato de respuesta inesperado';
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching last commit:', error);
        this.lastUpdate = 'No disponible';
      }
    );
  }

  ngOnInit() {
    this.filteredLinks = [...this.links];
    this.groupLinksByProvider();
    this.checkScreenSize();
  }

  /**
   * Agrupa los enlaces por proveedor
   */
  groupLinksByProvider() {
    // Reiniciar los grupos
    this.groupedLinks = this.classifyLinksByProvider(this.links);

    // Definir el orden personalizado de proveedores
    const providerOrder = [
      'Movistar+ LaLiga',
      'DAZN LaLiga',
      'Movistar+ Champions',
      'Canales lineales DAZN',
      'DAZN F1',
      'Movistar+ Otros',
      'Eurosport',
      'LaLiga Hypermotion',
      'Movistar+ Vamos',
      'Movistar+ Golf',
      'Otros deportes',
      'TDT',
    ];

    // Ordenar los proveedores según el orden personalizado
    this.providers = Object.keys(this.groupedLinks).sort((a, b) => {
      const indexA = providerOrder.indexOf(a);
      const indexB = providerOrder.indexOf(b);

      // Si alguno no está en la lista, se coloca al final
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      // Ordenar según la posición en el array de orden
      return indexA - indexB;
    });
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth < 854;
    if (!this.isMobile) {
      this.isMenuOpen = false; // Cierra el menú si se pasa a escritorio
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // MÉTODOS

  /**
   * Abre el popup de la imagen con la URL proporcionada.
   * @param imageUrl - La URL de la imagen a mostrar.
   */
  openImagePopup(imageUrl: string) {
    this.popupImageUrl = imageUrl;
    this.isImagePopupOpen = true;
  }

  /**
   * Cierra el popup de la imagen.
   */
  closeImagePopup() {
    this.isImagePopupOpen = false;
    this.popupImageUrl = '';
  }

  /**
   * Envía un correo electrónico utilizando el servicio EmailJS.
   * @param form - El formulario reactivo que contiene los datos del contacto.
   */
  sendEmail(form: any) {
    if (form.valid) {
      const serviceID = 'service_fs7p4w4';
      const adminTemplateID = 'template_gk496dt'; // Template para Markel
      const userTemplateID = 'template_1lutrs5'; // Template para el usuario
      const publicKey = 'zHLloJ3A1BD4ZTRZM';

      const emailParams = {
        name: this.contact.name,
        email: this.contact.email,
        message: this.contact.message,
      };

      // 1️⃣ Enviar email a Markel
      emailjs
        .send(serviceID, adminTemplateID, emailParams, publicKey)
        .then(() => {
          // No hacer nada
        })
        .catch((err) => console.error('Error al enviar a Markel:', err));

      // 2️⃣ Enviar email de confirmación al usuario
      emailjs
        .send(serviceID, userTemplateID, emailParams, publicKey)
        .then(() => {
          this.snackBar.open('¡Email enviado correctamente!', '', {
            duration: 4500,
          });
          this.contact = { name: '', email: '', message: '' };
        })
        .catch((err) => {
          console.error('Error al enviar al usuario: ', err);
          this.snackBar.open(
            'Error al enviar el email. Por favor, inténtalo de nuevo.',
            '',
            {
              duration: 4500,
            }
          );
        });
    }
  }

  /**
   * Desplaza la ventana hacia la parte superior de la página con un efecto suave.
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Desplaza la ventana hacia la sección de enlaces con un efecto suave.
   */
  scrollToLinks() {
    const linksSection = document.querySelector('.header-enlaces');
    if (linksSection) {
      linksSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Desplaza la ventana hacia la sección "Cómo reproducir" con un efecto suave.
   */
  scrollToHowToPlay() {
    const howToPlaySection = document.getElementById('como-reproducir');
    if (howToPlaySection) {
      howToPlaySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Desplaza la ventana hacia la sección de contacto con un efecto suave.
   */
  scrollToContact() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Limpia el término de búsqueda y actualiza la lista de enlaces filtrados.
   */
  deleteSearch() {
    this.searchTerm = '';
    this.filterLinks();
  }

  /**
   * Copia un enlace al portapapeles y muestra una notificación.
   * @param url - La URL del enlace a copiar.
   * @param title - El título del enlace.
   */
  copyLink(url: string, title: string) {
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('Enlace de ' + title + ' copiado', '', {
        duration: 3000,
      });
      if ((window as any).clarity) {
        (window as any).clarity('set', 'copy_event', { link: url });
      }
    });
  }

  /**
   * Rastrea un evento de clic en un enlace utilizando la herramienta Clarity.
   * @param linkTitle - El título del enlace clicado.
   */
  trackClick(linkTitle: string, url: string, event: Event): void {
    event.preventDefault();
    if ((window as any).clarity) {
      (window as any).clarity('set', 'click_event', { link: linkTitle });
    }

    // Si el enlace es un enlace de Acestream
    if (url.includes('acestream://')) {
      window.location.href = url;
    } else if (url.startsWith('acestream:')) {
      window.location.href = url;
    } else if (!url.includes('://')) {
      // Si el enlace no tiene protocolo, asumimos que es un ID de Acestream
      window.location.href = 'acestream://' + url;
    }
  }

  /**
   * Marca un iframe como cargado al actualizar el estado de carga.
   * @param index - El índice del iframe en el array de estados de carga.
   */
  onIframeLoad(index: number) {
    this.loading[index] = false;
  }

  /**
   * Obtiene los patrones de proveedores para clasificar los enlaces
   */
  getProviderPatterns() {
    return [
      { name: 'Movistar+ LaLiga', pattern: /movistar laliga/i },
      { name: 'DAZN LaLiga', pattern: /dazn laliga/i },
      { name: 'LaLiga Hypermotion', pattern: /laliga hypermotion/i },
      { name: 'Movistar+ Champions', pattern: /movistar liga de campeones/i },
      { name: 'DAZN F1', pattern: /dazn f1/i },
      { name: 'Canales lineales DAZN', pattern: /dazn [0-9]/i },
      { name: 'Eurosport', pattern: /eurosport/i },
      { name: 'TDT', pattern: /la [0-9]/i },
      { name: 'Otros deportes', pattern: /tennis|rally|nba|ufc|bein|gol/i },
    ];
  }

  /**
   * Clasifica los enlaces en grupos según sus tags
   * @param links - Los enlaces a clasificar
   * @returns - Un objeto con los enlaces agrupados por proveedor
   */
  classifyLinksByProvider(links: any[]) {
    const groupedLinks: { [provider: string]: any[] } = {};
    const providerPatterns = this.getProviderPatterns();

    // Clasificar cada enlace
    links.forEach((link) => {
      let assigned = false;

      for (const provider of providerPatterns) {
        if (provider.pattern.test(link.tags)) {
          if (!groupedLinks[provider.name]) {
            groupedLinks[provider.name] = [];
          }
          groupedLinks[provider.name].push(link);
          assigned = true;
          break;
        }
      }

      // Si no coincide con ningún patrón, lo ponemos en "Otros"
      if (!assigned) {
        if (!groupedLinks['Movistar+ Otros']) {
          groupedLinks['Movistar+ Otros'] = [];
        }
        groupedLinks['Movistar+ Otros'].push(link);
      }
    });

    return groupedLinks;
  }

  /**
   * Filtra los enlaces según el término de búsqueda ingresado.
   */
  filterLinks() {
    if (!this.searchTerm) {
      this.filteredLinks = [...this.links];
      this.groupLinksByProvider();
    } else {
      this.filteredLinks = this.links.filter(
        (link) =>
          link.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          link.tags.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

      // Si no hay resultados, no hacemos nada más
      if (this.filteredLinks.length === 0) {
        this.groupedLinks = {};
        this.providers = [];
        return;
      }

      // Reagrupamos los enlaces filtrados
      this.groupedLinks = this.classifyLinksByProvider(this.filteredLinks);

      // Ordenar alfabéticamente los nombres de los proveedores y guardarlos
      this.providers = Object.keys(this.groupedLinks).sort((a, b) => {
        // Asegurarse que 'Otros' siempre va al final
        if (a === 'Otros') return 1;
        if (b === 'Otros') return -1;
        return a.localeCompare(b);
      });
    }
  }

  // LINKS ARRAY
  links = [
    {
      title: 'M+ LALIGA (OPCIÓN 1)',
      url: 'acestream://d4ff041287a43e3114d411d671c4b4e92e21f31e',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 2)',
      url: 'acestream://107c3ce5a5d2527c9f06e4eab87477201791f231',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 3)',
      url: 'acestream://d2ddf9802ccfdc456f872eea4d24596880a638a0',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 4)',
      url: 'acestream://00c9bc9c5d7d87680a5a6bed349edfa775a89947',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 5)',
      url: 'acestream://c9321006921967d6258df6945f1d598a5c0cbf1e',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 6)',
      url: 'acestream://4b528d10eaad747ddf52251206177573ee3e9f74',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 7)',
      url: 'acestream://14b6cd8769cd485f2cffdca64be9698d9bfeac58',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 8)',
      url: 'acestream://31c19ffb3472c289c5bbbbc174449c8ed0d19e38',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA 2 (OPCIÓN 1)',
      url: 'acestream://911ad127726234b97658498a8b790fdd7516541d',
      tags: 'movistar laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG1.png',
    },
    {
      title: 'M+ LALIGA 2 (OPCIÓN 2)',
      url: 'acestream://51b363b1c4d42724e05240ad068ad219df8042ec',
      tags: 'movistar laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG1.png',
    },
    {
      title: 'M+ LALIGA 2 (OPCIÓN 3)',
      url: 'acestream://ad42faa399df66dcd62a1cbc9d1c99ed4512d3b8',
      tags: 'movistar laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG1.png',
    },
    {
      title: 'M+ LALIGA 3 (OPCIÓN 1)',
      url: 'acestream://7ad14386deef2f45ffe17d30a631dbf79b6a1a87',
      tags: 'movistar laliga 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG2.png',
    },
    {
      title: 'M+ LALIGA 3 (OPCIÓN 2)',
      url: 'acestream://382b14499e3d76e557d449d2e5bbc4e4bd63bd39',
      tags: 'movistar laliga 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG2.png',
    },
    {
      title: 'M+ LALIGA 4',
      url: 'acestream://ebe14f1edeb49f2253e3b355a8beeadc9b4f0bc4',
      tags: 'movistar laliga 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG3.png',
    },
    {
      title: 'Movistar Plus+ (OPCIÓN 1)',
      url: 'acestream://8c67cdb5ba81976662c3a67984a9545d9cfb0f70',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
    },
    {
      title: 'Movistar Plus+ (OPCIÓN 2)',
      url: 'acestream://b6ffbbc72a5b6b579faf79ebac229af7a25b933b',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
    },
    {
      title: 'Movistar Plus+ (OPCIÓN 3)',
      url: 'acestream://199190e3f28c1de0be34bccf0d3568dc65209b99',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
    },
    {
      title: 'Movistar Plus+ (OPCIÓN 4)',
      url: 'acestream://5866e83279307bf919068ae7a0d250e4e424e464',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
    },
    {
      title: 'Movistar Plus+ (OPCIÓN 5)',
      url: 'acestream://1ab443f5b4beb6d586f19e8b25b9f9646cf2ab78',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
    },
    {
      title: 'Movistar Plus+ 2',
      url: 'acestream://e19c1fc5e3ada56c60d45257f7f4ed0d14bf7003',
      tags: 'movistar plus + 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS2.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 1)',
      url: 'acestream://6422e8bc34282871634c81947be093c04ad1bb29',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 2)',
      url: 'acestream://c9c18ae7a9dafba1caae5beb22060f9c92bba553',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 3)',
      url: 'acestream://515efd8115482bda8d92aa6df9a882a5e5797494',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 4)',
      url: 'acestream://82b4f249788f93b8f9ce968803662d7cd4f1b8cc',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 5)',
      url: 'acestream://d5cf2dfa4fb4165ce58bf9db815088c28fec7711',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 6)',
      url: 'acestream://38e9ae1ee0c96d7c6187c9c4cc60ffccb565bdf7',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'Eurosport 1 (OPCIÓN 1)',
      url: 'acestream://bae98f69fbf867550b4f73b4eb176dae84d7f909',
      tags: 'eurosport 1',
      img: 'https://e7.pngegg.com/pngimages/350/883/png-clipart-eurosport-1-eurosport-2-television-channel-1-euro-television-blue-thumbnail.png',
    },
    {
      title: 'Eurosport 1 (OPCIÓN 2)',
      url: 'acestream://714e14e6d6e27660fd25a75b57b0ac5580fe705d',
      tags: 'eurosport 1',
      img: 'https://e7.pngegg.com/pngimages/350/883/png-clipart-eurosport-1-eurosport-2-television-channel-1-euro-television-blue-thumbnail.png',
    },
    {
      title: 'Eurosport 1 (OPCIÓN 3)',
      url: 'acestream://ef2abf419586d9876370be127ad592dbb41b126a',
      tags: 'eurosport 1',
      img: 'https://e7.pngegg.com/pngimages/350/883/png-clipart-eurosport-1-eurosport-2-television-channel-1-euro-television-blue-thumbnail.png',
    },
    {
      title: 'Eurosport 1 (OPCIÓN 3)',
      url: 'acestream://c3da6c4f91d9d10ade00318a869435e19f204d0e',
      tags: 'eurosport 1',
      img: 'https://e7.pngegg.com/pngimages/350/883/png-clipart-eurosport-1-eurosport-2-television-channel-1-euro-television-blue-thumbnail.png',
    },
    {
      title: 'Eurosport 2 (OPCIÓN 1)',
      url: 'acestream://dc4ccb9e72550bc72be9360aa7d77e337ad11ecc',
      tags: 'eurosport 2',
      img: 'https://w7.pngwing.com/pngs/327/493/png-transparent-eurosport-1-television-channel-logo-eurosport-2-others-miscellaneous-television-text.png',
    },
    {
      title: 'Eurosport 2 (OPCIÓN 2)',
      url: 'acestream://2773b39926d15dd3d9495d94c4050604792d7031',
      tags: 'eurosport 2',
      img: 'https://w7.pngwing.com/pngs/327/493/png-transparent-eurosport-1-television-channel-logo-eurosport-2-others-miscellaneous-television-text.png',
    },
    {
      title: 'Eurosport 2 (OPCIÓN 3)',
      url: 'acestream://37d6f1aabcde81ee6e4873b4db6b7bb8964af8bf',
      tags: 'eurosport 4k',
      img: 'https://w7.pngwing.com/pngs/327/493/png-transparent-eurosport-1-television-channel-logo-eurosport-2-others-miscellaneous-television-text.png',
    },
    {
      title: 'Eurosport 2 (OPCIÓN 4)',
      url: 'acestream://0585e09bb8ac9720e4c11934f1b184e309291551',
      tags: 'eurosport 4k',
      img: 'https://w7.pngwing.com/pngs/327/493/png-transparent-eurosport-1-television-channel-logo-eurosport-2-others-miscellaneous-television-text.png',
    },
    {
      title: 'FOX PREMIUM UFC',
      url: 'acestream://ade70f2c51cca519a4d8de1bb181af6e8532e1e1',
      tags: 'ufc tv',
      img: 'https://upload.wikimedia.org/wikipedia/en/7/76/Fox_UFC_logo.jpg',
    },
    {
      title: 'UFC Fight Pass',
      url: 'acestream://108aebe20efc826e56f3a1cb01117a124a6b89ad',
      tags: 'ufc figth pass',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/UFC_Fight_Pass_Logo.svg/2560px-UFC_Fight_Pass_Logo.svg.png',
    },
    {
      title: 'NBA TV',
      url: 'acestream://b0f64a40f333ef5cc02c2b6d4a8c3f4b73dd8073',
      tags: 'nba tv',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/NBA_TV.svg/800px-NBA_TV.svg.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 1)',
      url: 'acestream://0e50439e68aa2435b38f0563bb2f2e98f32ff4b1',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 2)',
      url: 'acestream://1bb5bf76fb2018d6db9aaa29b1467ecdfabe2884',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 3)',
      url: 'acestream://e2b8a4aba2f4ea3dd68992fcdb65c9e62d910b05',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 4)',
      url: 'acestream://74defb8f4ed3a917fd07c21b34f43c17107ec618',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 5)',
      url: 'acestream://4e6d9cf7d177366045d33cd8311d8b1d7f4bed1f',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 6)',
      url: 'acestream://dda5d2cace9bc4cb0918e62bc50d657d4a10496a',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA 2 (OPCIÓN 1)',
      url: 'acestream://5091ea94b75ba4b50b078b4102a3d0e158ef59c3',
      tags: 'dazn laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNL2.png',
    },
    {
      title: 'DAZN LALIGA 2 (OPCIÓN 2)',
      url: 'acestream://a231b2fa1f7754433efeb8bb8d69d7b9096dcba8',
      tags: 'dazn laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNL2.png',
    },
    {
      title: 'DAZN LALIGA 2 (OPCIÓN 3)',
      url: 'acestream://c976c7b37964322752db562b4ad65515509c8d36',
      tags: 'dazn laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNL2.png',
    },
    {
      title: 'DAZN LALIGA 3',
      url: 'acestream://8c71f0e0a5476e10950fc827f9d2a507340aba74',
      tags: 'dazn laliga 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNL3.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 1)',
      url: 'acestream://6538b79ce0da657d8455d1da6a5f342398899a0e',
      tags: 'dazn 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 2)',
      url: 'acestream://50a8a13c474848d1efbd5586efdb5b6cdd173fa9',
      tags: 'dazn 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 3)',
      url: 'acestream://4141892f5df7d6474bf0279895ce02b7336c9928',
      tags: 'dazn 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 4)',
      url: 'acestream://b03f9310155cf3b4eafc1dfba763781abc3ff025',
      tags: 'dazn 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 5)',
      url: 'acestream://36394be1db2e20b5997d987c32fd38c7f0f194b7',
      tags: 'dazn 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 6)',
      url: 'acestream://eb6ffec065b26259ad3d1811e0bbb0a5332ed276',
      tags: 'dazn 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M1SD.png',
    },
    {
      title: 'DAZN 2 (OPCIÓN 1)',
      url: 'acestream://8b081c8afbd9beafc8c5fbf0115eb36eadb07a35',
      tags: 'dazn 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M2SD.png',
    },
    {
      title: 'DAZN 2 (OPCIÓN 2)',
      url: 'acestream://fb2dd566824658eeab27aae19a01c09430f1a97d',
      tags: 'dazn 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M2SD.png',
    },
    {
      title: 'DAZN 2 (OPCIÓN 3)',
      url: 'acestream://43004e955731cd3afcc34d24e5178d4b427bff37',
      tags: 'dazn 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M2SD.png',
    },
    {
      title: 'DAZN 2 (OPCIÓN 4)',
      url: 'acestream://ae68a0835039fab28fd2314108fabd4fab33b8ab',
      tags: 'dazn 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M2SD.png',
    },
    {
      title: 'DAZN 3 (OPCIÓN 1)',
      url: 'acestream://d641cd0fca0f467b3130754a091e2f4d22e68eb1',
      tags: 'dazn 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN3.png',
    },
    {
      title: 'DAZN 3 (OPCIÓN 2)',
      url: 'acestream://4e401fdceebffdf1f09aef954844d09f6c62f460',
      tags: 'dazn 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN3.png',
    },
    {
      title: 'DAZN 3 (OPCIÓN 3)',
      url: 'acestream://d1d9ec2361a6ac8edc0b2841866383768cc28df9',
      tags: 'dazn 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN3.png',
    },
    {
      title: 'DAZN 4 (OPCIÓN 1)',
      url: 'acestream://d1d9ec2361a6ac8edc0b2841866383768cc28df9',
      tags: 'dazn 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN4.png',
    },
    {
      title: 'DAZN 4 (OPCIÓN 2)',
      url: 'acestream://c015d37d1ead8155b1e7b97e743a1fe9850f0af5',
      tags: 'dazn 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN4.png',
    },
    {
      title: 'DAZN 4 (OPCIÓN 3)',
      url: 'acestream://eb884f77ce8815cf1028c4d85e8b092c27ea1693',
      tags: 'dazn 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN4.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION (OPCIÓN 1)',
      url: 'acestream://8ee52f6208e33706171856f99d2ed2dabd317f3a',
      tags: 'laliga hypermotion',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION (OPCIÓN 2)',
      url: 'acestream://70f22be1286ef224b5e4e9451d9a42468152cda4',
      tags: 'laliga hypermotion',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION (OPCIÓN 3)',
      url: 'acestream://87bb542f974b6b9e89d0f2e20ed6dc93426f4be0',
      tags: 'laliga hypermotion',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION (OPCIÓN 4)',
      url: 'acestream://a4f072c9b614323ac1258a175f868a909ea3c8cd',
      tags: 'laliga hypermotion',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 2 (OPCIÓN 1)',
      url: 'acestream://8a05571c0c8fe53f160fb7d116cdf97243679e86',
      tags: 'laliga hypermotion 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS2.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 2 (OPCIÓN 2)',
      url: 'acestream://709075831bf5c41ed0a20dfbd640aab6c28971f8',
      tags: 'laliga hypermotion 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS2.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 3 (OPCIÓN 1)',
      url: 'acestream://1ba18731a8e18bb4b3a5dfa5bb7b0f05762849a6',
      tags: 'laliga hypermotion 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS3.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 3 (OPCIÓN 2)',
      url: 'acestream://778d2f60bb7207addedcca0b9aed98f41529724e',
      tags: 'laliga hypermotion 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS3.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 4',
      url: 'acestream://0829094f216f639b2ac2d00b6cccce6585de6c7b',
      tags: 'laliga hypermotion 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS4.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 5',
      url: 'acestream://061f42fcaa7632fb0a889272a731036d033cddf5',
      tags: 'laliga hypermotion 5',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS5.png',
    },
    {
      title: 'M+ Golf',
      url: 'acestream://8546cff89e4ee8bf3ad31cf6457c3bc2c4341031',
      tags: 'movistar golf',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/GOLF+.png',
    },
    {
      title: 'M+ Golf 2',
      url: 'acestream://96e82321c731e41768a806992ee4d3b9b7a0e7d7',
      tags: 'movistar golf 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/GOLF2.png',
    },
    {
      title: 'M+ Vamos (OPCIÓN 1)',
      url: 'acestream://2940120bf034db79a7f5849846ccea0255172eae',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/VAMOSD.png',
    },
    {
      title: 'M+ Vamos (OPCIÓN 2)',
      url: 'acestream://651d6be899d1fafa107a265a9dc00ff914c1b548',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/VAMOSD.png',
    },
    {
      title: 'M+ Vamos (OPCIÓN 3)',
      url: 'acestream://4e99e755aa32c4bc043a4bb1cd1de35f9bd94dde',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/VAMOSD.png',
    },
    {
      title: 'M+ Vamos (OPCIÓN 4)',
      url: 'acestream://c7c81acdd1a03ecc418c94c2f28e2adb0556c40b',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/VAMOSD.png',
    },
    {
      title: 'M+ Ellas Vamos',
      url: 'acestream://9b84af74b2fa3690c519199326fc2f181b025cdd',
      tags: 'movistar ellas vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MELLAV.png',
    },
    {
      title: 'La 1',
      url: 'acestream://dad5e0e0825cb3e410008f1c4252387b868e740c',
      tags: 'la 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/TVE.png',
    },
    {
      title: 'La 2',
      url: 'acestream://9934906503661142f97a044ae1509a294057c2ed',
      tags: 'la 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/LA2.png',
    },
    {
      title: 'Rally TV',
      url: 'acestream://651dd1e689a9a7d3b0695191dcf44b4d6e7541eb',
      tags: 'rally tv',
      img: 'https://play-lh.googleusercontent.com/yGC9brvzJBdkj8D2iyr1FmtE2FOM4myhn83rWR1DsJR4jXBwpQSHa7OkS9Q1_XVqQGl-',
    },
    {
      title: 'Tennis Channel',
      url: 'acestream://039fae21c9e7e5214d3d898cba80863e37e623ac',
      tags: 'tennis channel',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tennis_Channel_logo.svg/1566px-Tennis_Channel_logo.svg.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 1)',
      url: 'acestream://c16b4fab1f724c94cad92081cbb7fc7c6fe8a2cc',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 2)',
      url: 'acestream://778f08cbae9596ed9e8b2ae0af33ee7a6fe24c6a',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 3)',
      url: 'acestream://152169ce99e1fd27f2249c18384a121079cdef29',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 4)',
      url: 'acestream://afbf2a479c5a5072698139f0f556ef3e77a99bd0',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 5)',
      url: 'acestream://a6620445cbe43b939a66a739e88dfde9d4469779',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 6)',
      url: 'acestream://0f7842f8b6c26571e5a974407b61623e56e6a052',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 7)',
      url: 'acestream://f3eea003e23f94dc2d527306de9dd386e3ebf4ba',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 8)',
      url: 'acestream://97df5b7824948972d041d8ca2a4d29c90b641bc9',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 9)',
      url: 'acestream://2b51710cee513e8939785fa3e7980f32d4e0415f',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 10)',
      url: 'acestream://9db029dff6a9c637d1f670e78dbc1a479b9b406e',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones 2 (OPCIÓN 1)',
      url: 'acestream://c6a3673f6a37b1bd3cf31fdd6404dd33d48cfccb',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 2 (OPCIÓN 2)',
      url: 'acestream://4fc6d0331830ad8743abab2fe2473b63bdfbc49f',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 2 (OPCIÓN 3)',
      url: 'acestream://498c56bd00f535e440c392de5af992421a31355c',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 2 (OPCIÓN 4)',
      url: 'acestream://e7d8cae7f693fe46e89bbf74820caac9ffb32a30',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 2 (OPCIÓN 5)',
      url: 'acestream://74ab4e4ec7e2da001f473ca40893b7307b8029c5',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 2 (OPCIÓN 6)',
      url: 'acestream://38f7b2044e549df2039ff26cefa6f9a60c854d5e',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 3 (OPCIÓN 1)',
      url: 'acestream://1dece791d28be6a5af78537ac4864ec01fa0a6d8-',
      tags: 'movistar liga de campeones 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP2.png',
    },
    {
      title: 'M+ L. de Campeones 3 (OPCIÓN 2)',
      url: 'acestream://2b5129adc57d43790634d796fe3468b9fd061259',
      tags: 'movistar liga de campeones 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP2.png',
    },
    {
      title: 'M+ L. de Campeones 3 (OPCIÓN 3)',
      url: 'acestream://4416843c96b7f7a1bc55c476091a60fff0922bc7-',
      tags: 'movistar liga de campeones 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP2.png',
    },
    {
      title: 'M+ L. de Campeones 4 (OPCIÓN 1)',
      url: 'acestream://77998f8161373611ff6b348e7eda5b4e97d3ec29',
      tags: 'movistar liga de campeones 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP3.png',
    },
    {
      title: 'M+ L. de Campeones 4 (OPCIÓN 2)',
      url: 'acestream://53cd86466d1faed03a607be92af601f7e8da128f',
      tags: 'movistar liga de campeones 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP3.png',
    },
    {
      title: 'M+ L. de Campeones 4 (OPCIÓN 3)',
      url: 'acestream://e9f4493d2d851f4636720f639113e05b4a21a74c',
      tags: 'movistar liga de campeones 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP3.png',
    },
    {
      title: 'M+ L. de Campeones 5',
      url: 'acestream://5620c0ce3dcbf14a6375cb2c2d681207f45eb97d',
      tags: 'movistar liga de campeones 5',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP4.png',
    },
    {
      title: 'M+ L. de Campeones 6',
      url: 'acestream://976983697790ab8a07b764b08843529d38bc6444',
      tags: 'movistar liga de campeones 6',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP5.png',
    },
    {
      title: 'M+ L. de Campeones 7',
      url: 'acestream://83c02982581a536d1321e38a77dc0c520b1cb842',
      tags: 'movistar liga de campeones 7',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP6.png',
    },
    {
      title: 'M+ L. de Campeones 8',
      url: 'acestream://97f8a84212fe6b3d2ab15aadc83c7b5e6af656c9',
      tags: 'movistar liga de campeones 8',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP7.png',
    },
    {
      title: 'M+ L. de Campeones 9',
      url: 'acestream://80abcb38122c25fefb4dffeb57086998447ff49b',
      tags: 'movistar liga de campeones 9',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP8.png',
    },
    {
      title: 'M+ L. de Campeones 10',
      url: 'acestream://0103373118989085dd0d02667c629ee36d462cb1',
      tags: 'movistar liga de campeones 10',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP9.png',
    },
    {
      title: 'M+ L. de Campeones 11',
      url: 'acestream://6e12a5849a4edea248ed9c8689e58bd66fc9f8fa',
      tags: 'movistar liga de campeones 11',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP10.png',
    },
    {
      title: 'M+ L. de Campeones 12',
      url: 'acestream://130d37f9a68bd8f29f0d636dcde522a1e91d1cb7',
      tags: 'movistar liga de campeones 12',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP11.png',
    },
    {
      title: 'Primera Federación (OPCIÓN 1)',
      url: 'acestream://a2ed6f2ca3f804481131c41ce64d4286a5820476',
      tags: 'primera federacion rfef',
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLhKwRnBQ8fw20_UpkL-svjJygTscV6Et9Y1nyIgj2KlGbR2FqEDUVXrRGsNkr-4fU7b8-rrls6RCY7WkdBUhdHweSGY8p3G7lfcPPvsUig3c-amPBAHDGl-4O_6KS9bA8KSJOesjkPR1d2Sw1uB3_O7ROjXc_qON0UR7kIhMO2A32EQW27TDHgit_Dew/s512/Primera%20Federacion.png.png',
    },
    {
      title: 'Primera Federación (OPCIÓN 2)',
      url: 'acestream://599a2fda91aa55703e2c5a51562d9dbf5d3d31d9',
      tags: 'primera federacion rfef',
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLhKwRnBQ8fw20_UpkL-svjJygTscV6Et9Y1nyIgj2KlGbR2FqEDUVXrRGsNkr-4fU7b8-rrls6RCY7WkdBUhdHweSGY8p3G7lfcPPvsUig3c-amPBAHDGl-4O_6KS9bA8KSJOesjkPR1d2Sw1uB3_O7ROjXc_qON0UR7kIhMO2A32EQW27TDHgit_Dew/s512/Primera%20Federacion.png.png',
    },
    {
      title: 'Primera Federación (OPCIÓN 3)',
      url: 'acestream://b40212c43e96e97542ea00f2129212a054853a57',
      tags: 'primera federacion rfef',
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLhKwRnBQ8fw20_UpkL-svjJygTscV6Et9Y1nyIgj2KlGbR2FqEDUVXrRGsNkr-4fU7b8-rrls6RCY7WkdBUhdHweSGY8p3G7lfcPPvsUig3c-amPBAHDGl-4O_6KS9bA8KSJOesjkPR1d2Sw1uB3_O7ROjXc_qON0UR7kIhMO2A32EQW27TDHgit_Dew/s512/Primera%20Federacion.png.png',
    },
    {
      title: 'M+ Deportes (OPCIÓN 1)',
      url: 'acestream://ef9dcc4eaac36a0f608b52a31f8ab237859e071a',
      tags: 'movistar deportes',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CPDEP.png',
    },
    {
      title: 'M+ Deportes (OPCIÓN 2)',
      url: 'acestream://332d8fdeb9c51385230b8c9448e047ccc4a6355d',
      tags: 'movistar deportes',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CPDEP.png',
    },
    {
      title: 'M+ Deportes (OPCIÓN 3)',
      url: 'acestream://f828a32d8ea03a3cabd3ce3ebecb249ec111c7e5',
      tags: 'movistar deportes',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CPDEP.png',
    },
    {
      title: 'M+ Deportes (OPCIÓN 4)',
      url: 'acestream://ebca4a63ce3bfda7b272964a1acc5227218184a4',
      tags: 'movistar deportes',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CPDEP.png',
    },
    {
      title: 'M+ Deportes 2 (OPCIÓN 1)',
      url: 'acestream://edd06f11e1cef292a1d795e15207ef2f580e298c',
      tags: 'movistar deportes 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/ARTHUR.png',
    },
    {
      title: 'M+ Deportes 2 (OPCIÓN 2)',
      url: 'acestream://6e212a916c83638268047dd2757c95b14f7d25a3',
      tags: 'movistar deportes 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/ARTHUR.png',
    },
    {
      title: 'M+ Deportes 3 (OPCIÓN 1)',
      url: 'acestream://753d4b1f7c4ef43238b5cf23b05572b550a44eee',
      tags: 'movistar deportes 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/USOP2.png',
    },
    {
      title: 'M+ Deportes 3 (OPCIÓN 2)',
      url: 'acestream://29d786d72d4b53dbc333af3a50f8fb021aa0296f',
      tags: 'movistar deportes 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/USOP2.png',
    },
    {
      title: 'M+ Deportes 4 (OPCIÓN 1)',
      url: 'acestream://58a4c880ab18486d914751db32a12760e74b75a4',
      tags: 'movistar deportes 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/USOP3.png',
    },
    {
      title: 'M+ Deportes 4 (OPCIÓN 2)',
      url: 'acestream://3f97bafa133b10cfe5c62311e11501326d886a53',
      tags: 'movistar deportes 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/USOP3.png',
    },
    {
      title: 'M+ Deportes 5',
      url: 'acestream://5913205fb6d6d162a50222709aab6129eb7cf916',
      tags: 'movistar deportes 5',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/USOP11.png',
    },
    {
      title: 'M+ Deportes 6',
      url: 'acestream://e4124b2143ed75e5ce902bed61be08cc5e5c3c03',
      tags: 'movistar deportes 6',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/MULTI8.png',
    },
    {
      title: 'M+ Deportes 7',
      url: 'acestream://f7fa1e42376d1d65d1bf5abca8728dff273d02d7',
      tags: 'movistar deportes 7',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/MULTI6.png',
    },
    {
      title: 'GOL',
      url: 'acestream://b2d560741c006fc5e4a42412bb52dbd25a6a4a3a',
      tags: 'gol',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/GOL.png',
    },
    {
      title: 'beIN SPORTS 1',
      url: 'acestream://f0951d40eb84162014752c054ea7a1370d2169eb',
      tags: 'bein sports 1',
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Bein_sport_logo.png',
    },
  ];
}
