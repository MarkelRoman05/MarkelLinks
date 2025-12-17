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
import { environment } from '../environments/enviroment';

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
  links: any[] = [];
  currentYear: number = new Date().getFullYear();

  // Mapeo de imágenes para cada provider
  providerImages: { [key: string]: string } = {
    'Movistar+ LaLiga': '/images/M++LALIGA.png',
    'DAZN LaLiga': '/images/DAZN+LALIGA.png',
    'Movistar+ Champions': 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/d6297891682131.5e3864b00f466.png',
    'Canales lineales DAZN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/DAZN_Logo_Chalk.svg/480px-DAZN_Logo_Chalk.svg.png',
    'DAZN FÓRMULA 1': 'https://logos-world.net/wp-content/uploads/2023/12/F1-Logo.png',
    'DAZN Liga Endesa': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Liga_Endesa_2019_logo.svg',
    'Movistar+ Otros': 'https://comunicacion.movistarplus.es/wp-content/uploads/2020/10/MOVISTAR-logo-footer-ndp.png',
    'Eurosport': 'https://cdn-1.webcatalog.io/catalog/eurosport/eurosport-icon-filled-256.png?v=1714774288533',
    'LaLiga Hypermotion': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/LaLiga_Hypermotion_2023_Vertical_Logo.svg/2335px-LaLiga_Hypermotion_2023_Vertical_Logo.svg.png',
    'Movistar+ Cine, Documentales y Series': 'https://comunicacion.movistarplus.es/wp-content/uploads/2020/10/MOVISTAR-logo-footer-ndp.png',
    'Otros deportes': '/images/balon.png',
    'TDT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/TDT_wordmark.svg/1344px-TDT_wordmark.svg.png'
  };

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    window.clarity('consent');
    this.getLastCommitDate();
    this.loadLinks();
  }

  private getLastCommitDate() {
    const owner = 'MarkelRoman05';
    const repo = 'AcestreamLinks';
    const branch = 'master';

    const gitHubToken = environment.gitHubToken;

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;

    // Configurar los headers para la autenticación
    const headers = {
      Authorization: `Bearer ${gitHubToken}`,
      Accept: 'application/vnd.github.v3+json',
    };

    this.http.get(apiUrl, { headers }).subscribe(
      (response: any) => {
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

  /**
   * Carga los links desde el archivo JSON
   */
  private loadLinks() {
    this.http.get<any[]>('/assets/links.json').subscribe(
      (data) => {
        this.links = data;
        this.filteredLinks = [...this.links];
        this.groupLinksByProvider();
      },
      (error) => {
        console.error('Error al cargar los links:', error);
        this.links = [];
        this.filteredLinks = [];
      }
    );
  }

  ngOnInit() {
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
      'DAZN FÓRMULA 1',
      'DAZN Liga Endesa',
      'Movistar+ Otros',
      'Eurosport',
      'LaLiga Hypermotion',
      'Otros deportes',
      'Movistar+ Cine, Documentales y Series',
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
      { name: 'DAZN FÓRMULA 1', pattern: /dazn f1/i },
      { name: 'DAZN Liga Endesa', pattern: /dazn baloncesto/i },
      { name: 'Canales lineales DAZN', pattern: /dazn [0-9]/i },
      { name: 'Eurosport', pattern: /eurosport/i },
      { name: 'Movistar+ Cine, Documentales y Series', pattern: /movistar (cine|acción|clásicos|clasicos|comedia|documentales|drama|estrenos|originales|cine español|español)/i },
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
   * Obtiene el número total de canales disponibles
   */
  getTotalChannels(): number {
    return this.links.length;
  }

  /**
   * Obtiene el número de canales mostrados actualmente
   */
  getDisplayedChannels(): number {
    return this.filteredLinks.length;
  }

  /**
   * Obtiene la imagen del provider
   */
  getProviderImage(provider: string): string {
    return this.providerImages[provider] || '/images/balon.png';
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
}
