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
    AgendaEventoTextComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  searchTerm: string = '';
  filteredLinks: any[] = [];
  loading: boolean[] = [true, true, true, true, true];
  isMobile: boolean = false;
  isMenuOpen: boolean = false; // Añadido para el menú móvil
  contact = { name: '', email: '', message: '' };

  isImagePopupOpen: boolean = false;
  popupImageUrl: string = '';

  location = window.location;

  constructor(private snackBar: MatSnackBar) {
    window.clarity('consent');
  }

  ngOnInit() {
    this.filteredLinks = [...this.links];
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth < 854;
    if (!this.isMobile) {
      this.isMenuOpen = false; // Cierra el menú si se pasa a escritorio
    }
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
  trackClick(linkTitle: string): void {
    if ((window as any).clarity) {
      (window as any).clarity('set', 'click_event', { link: linkTitle });
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
   * Filtra los enlaces según el término de búsqueda ingresado.
   */
  filterLinks() {
    if (!this.searchTerm) {
      this.filteredLinks = [...this.links];
    } else {
      this.filteredLinks = this.links.filter(
        (link) =>
          link.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          link.tags.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // LINKS ARRAY
  links = [
    {
      title: 'M+ LALIGA (OPCIÓN 1)',
      url: 'acestream://00c9bc9c5d7d87680a5a6bed349edfa775a89947',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 2)',
      url: 'acestream://c9321006921967d6258df6945f1d598a5c0cbf1e',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 3)',
      url: 'acestream://4b528d10eaad747ddf52251206177573ee3e9f74',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 4)',
      url: 'acestream://14b6cd8769cd485f2cffdca64be9698d9bfeac58',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 5)',
      url: 'acestream://9ea64600ac7f188a57d14e08f6e3c1055bbb7f1a',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA (OPCIÓN 6)',
      url: 'acestream://cc9b7f5fe416069a2110da0909b0f915043c468b',
      tags: 'movistar laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA 2 (OPCIÓN 1)',
      url: 'acestream://51b363b1c4d42724e05240ad068ad219df8042ec',
      tags: 'movistar laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG1.png',
    },
    {
      title: 'M+ LALIGA 2 (OPCIÓN 2)',
      url: 'acestream://ad42faa399df66dcd62a1cbc9d1c99ed4512d3b8',
      tags: 'movistar laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG1.png',
    },
    {
      title: 'M+ LALIGA 3',
      url: 'acestream://7ad14386deef2f45ffe17d30a631dbf79b6a1a87',
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
      url: 'acestream://b2a4d1eba9b46df5f52a87105df779f9d39abeb4',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
    },
    {
      title: 'Movistar Plus+ (OPCIÓN 2)',
      url: 'acestream://56ac8e227d526e722624675ccdd91b0cc850582f',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
    },
    {
      title: 'Movistar Plus+ 2',
      url: 'acestream://fbc39d8a9e5d7c9ac6a1438d440104620f54e09c',
      tags: 'movistar plus + 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS2.png',
    },
    {
      title: 'LALIGA TV Bar',
      url: 'acestream://608b0faf7d3d25f6fe5dba13d5e4b4142949990e',
      tags: 'laliga tv bar',
      img: 'https://laligabares.com/wp-content/uploads/white-bar-tv.svg',
    },
    {
      title: 'DAZN F1 (OPCIÓN 1)',
      url: 'acestream://c9c18ae7a9dafba1caae5beb22060f9c92bba553',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 2)',
      url: 'acestream://515efd8115482bda8d92aa6df9a882a5e5797494',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
        {
      title: 'DAZN F1 (OPCIÓN 3)',
      url: 'acestream://6422e8bc34282871634c81947be093c04ad1bb29',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 4)',
      url: 'acestream://2c6e4c897661e6b0257bfe931b66d20b2ec763b6',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (OPCIÓN 5)',
      url: 'acestream://4f1d222c600e66ef4990b3d7ea13bfa53f7bfea1',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'M+ Copa del Rey (OPCIÓN 1)',
      url: 'acestream://25181134e74e9af67c27d6af8489d08179b599fb',
      tags: 'movistar copa del rey',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MCOPA.png',
    },
    {
      title: 'M+ Copa del Rey (OPCIÓN 2)',
      url: 'acestream://f6beccbc4eea4bc0cda43b3e8ac14790a98b61b4',
      tags: 'movistar copa del rey',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MCOPA.png',
    },
    {
      title: 'M+ Copa del Rey (OPCIÓN 3)',
      url: 'acestream://6118cada4cbe7650eeb21d170e184c26a4cdc808',
      tags: 'movistar copa del rey',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MCOPA.png',
    },
    {
      title: 'M+ Copa del Rey (OPCIÓN 4)',
      url: 'acestream://08cf776c4d1ac0c7fa5b99bf1ad9de4dce545e04',
      tags: 'movistar copa del rey',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MCOPA.png',
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
      title: 'Eurosport 2 (OPCIÓN 1)',
      url: 'acestream://dc4ccb9e72550bc72be9360aa7d77e337ad11ecc',
      tags: 'eurosport 2',
      img: 'https://w7.pngwing.com/pngs/327/493/png-transparent-eurosport-1-television-channel-logo-eurosport-2-others-miscellaneous-television-text.png',
    },
    {
      title: 'Eurosport 2 (OPCIÓN 2)',
      url: 'acestream://4b87a5b67f39dfc151a163ec8c08039520f0a372',
      tags: 'eurosport 2',
      img: 'https://w7.pngwing.com/pngs/327/493/png-transparent-eurosport-1-television-channel-logo-eurosport-2-others-miscellaneous-television-text.png',
    },
    {
      title: 'Eurosport 4K (OPCIÓN 1)',
      url: 'acestream://63135c171f056d1d6028f9ffb1637ed704b88a20',
      tags: 'eurosport 4k',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMgdqJODqwW6zAFu6rkzH-mNfUvkcdX52R2g&s',
    },
    {
      title: 'Eurosport 4K (OPCIÓN 2)',
      url: 'acestream://c525471499b936decc037ea86e0f8125ebf78c28',
      tags: 'eurosport 4k',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMgdqJODqwW6zAFu6rkzH-mNfUvkcdX52R2g&s',
    },
    {
      title: 'UFC TV',
      url: 'acestream://c73e3eefe1f4a90fd7495f8be2d5f772d758713b',
      tags: 'ufc tv',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UFC_Logo.svg/2560px-UFC_Logo.svg.png',
    },
    {
      title: 'UFC Fight Pass',
      url: 'acestream://e3ad553098e0c1e70cba1ea2a906dc27aa3452a2',
      tags: 'ufc figth pass',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/UFC_Fight_Pass_Logo.svg/2560px-UFC_Fight_Pass_Logo.svg.png',
    },
    {
      title: 'NBA TV',
      url: 'acestream://7146e467aee3cb0bcdc286b39a3022c992428f01',
      tags: 'nba tv',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/NBA_TV.svg/800px-NBA_TV.svg.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 1)',
      url: 'acestream://e2b8a4aba2f4ea3dd68992fcdb65c9e62d910b05',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 2)',
      url: 'acestream://4e6d9cf7d177366045d33cd8311d8b1d7f4bed1f',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 3)',
      url: 'acestream://d10a14db9cdba08c05b475071de68b86a400e35b',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 4)',
      url: 'acestream://8c8c1e047a1c5ed213ba74722a5345dc55c3c0eb',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA 2 (OPCIÓN 1)',
      url: 'acestream://a231b2fa1f7754433efeb8bb8d69d7b9096dcba8',
      tags: 'dazn laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNL2.png',
    },
    {
      title: 'DAZN LALIGA 2 (OPCIÓN 2)',
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
      url: 'acestream://4141892f5df7d6474bf0279895ce02b7336c9928',
      tags: 'dazn 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 2)',
      url: 'acestream://6538b79ce0da657d8455d1da6a5f342398899a0e',
      tags: 'dazn 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 3)',
      url: 'acestream://50a8a13c474848d1efbd5586efdb5b6cdd173fa9',
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
      url: 'acestream://0f5402f75107112d59d924a5f381cfed33dbe6d2',
      tags: 'dazn 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M2SD.png',
    },
    {
      title: 'DAZN 2 (OPCIÓN 3)',
      url: 'acestream://b0eabe0fdd02fdd165896236765a9b753a2ff516',
      tags: 'dazn 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/M2SD.png',
    },
    {
      title: 'DAZN 3',
      url: 'acestream://d641cd0fca0f467b3130754a091e2f4d22e68eb1',
      tags: 'dazn 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN3.png',
    },
    {
      title: 'DAZN 4',
      url: 'acestream://75306ac6ffbe33b08c5c28487674f75f012c7f50',
      tags: 'dazn 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN4.png',
    },
        {
      title: 'LALIGA TV HYPERMOTION (OPCIÓN 1)',
      url: 'acestream://b2706a7ffbea236a3b398139a3a606ada664c0eb',
      tags: 'laliga hypermotion',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION (OPCIÓN 2)',
      url: 'acestream://121f719ebb94193c6086ef92865cf9b197750980',
      tags: 'laliga hypermotion',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 2',
      url: 'acestream://0cfdfde1b70623b8c210b0f7301be2a87456481d',
      tags: 'laliga hypermotion 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS2.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 2',
      url: 'acestream://0cfdfde1b70623b8c210b0f7301be2a87456481d',
      tags: 'laliga hypermotion 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS2.png',
    },
    {
      title: 'LALIGA TV HYPERMOTION 3',
      url: 'acestream://fefd45ed6ff415e05f1341b7d9da2988eacd13ea',
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
      url: 'acestream://c7c81acdd1a03ecc418c94c2f28e2adb0556c40b',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/VAMOSD.png',
    },
    {
      title: 'M+ Vamos (OPCIÓN 2)',
      url: 'acestream://3b2a8b41e7097c16b0468b42d7de0320886fa933',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/VAMOSD.png',
    },
    {
      title: 'M+ Vamos (OPCIÓN 3)',
      url: 'acestream://57313e1ef438538df4feb5a6028dc78ee4f66b6a',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/VAMOSD.png',
    },
    {
      title: 'M+ Ellas Vamos',
      url: 'acestream://67654e63b5065cdaa6c8e8d41bb5428b42b32830',
      tags: 'movistar ellas vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MELLAV.png',
    },
    {
      title: 'La 1',
      url: 'acestream://8bdd29882fa2c2f9fe49e67b102934c9e293f5a5',
      tags: 'la 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/TVE.png',
    },
    {
      title: 'La 2',
      url: 'acestream://fc36c7249aef74e3ea579500efdfd7a98d8e9ac5',
      tags: 'la 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/LA2.png',
    },
    {
      title: 'GOL',
      url: 'acestream://b2d560741c006fc5e4a42412bb52dbd25a6a4a3a',
      tags: 'gol',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/GOL.png',
    },
    {
      title: 'beIN SPORTS ñ',
      url: 'acestream://41af6926a6010b68ba2540975761436bb077748f',
      tags: 'bein sports ñ',
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Bein_sport_logo.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 1)',
      url: 'acestream://0a26e20f39845e928411e09a124374fccb6e1478',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 2)',
      url: 'acestream://e572a5178ff72eed7d1d751a18b4b3419699f370',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 3)',
      url: 'acestream://97df5b7824948972d041d8ca2a4d29c90b641bc9',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 4)',
      url: 'acestream://47223e64a576c21bd61e818a42397a753d34fba5',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones 2 (OPCIÓN 1)',
      url: 'acestream://abdf9058786a48623d0de51a3adb414ae10b6e72',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 2 (OPCIÓN 2)',
      url: 'acestream://74ab4e4ec7e2da001f473ca40893b7307b8029c5',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 3 (OPCIÓN 1)',
      url: 'acestream://17b8bc4bf8e29547b0071c742e3d7da3bcbc484d',
      tags: 'movistar liga de campeones 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP2.png',
    },
    {
      title: 'M+ L. de Campeones 3 (OPCIÓN 2)',
      url: 'acestream://4fc2fce0d019bdb622164bba3cff84c120fb9243',
      tags: 'movistar liga de campeones 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP2.png',
    },
    {
      title: 'M+ L. de Campeones 4',
      url: 'acestream://77998f8161373611ff6b348e7eda5b4e97d3ec29',
      tags: 'movistar liga de campeones 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP3.png',
    },
    {
      title: 'M+ L. de Campeones 5',
      url: 'acestream://cb6410a6355a645cfc6f6f5a7c7d71298fcbc2c5',
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
      title: 'M+ L. de Campeones 13',
      url: 'acestream://9c246c5e6a153ba2b765e4b84f4d50e0836b3556',
      tags: 'movistar liga de campeones 13',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP12.png',
    },
    {
      title: 'M+ L. de Campeones 14',
      url: 'acestream://773ef9e2d2feb4f80ef558b253c72fda8d8e53cf',
      tags: 'movistar liga de campeones 14',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP13.png',
    },
    {
      title: 'M+ L. de Campeones 15',
      url: 'acestream://47ce8fe15adfcf4e1749b0c0dee1fc79a3d5ca6d',
      tags: 'movistar liga de campeones 15',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP14.png',
    },
    {
      title: 'M+ Deportes (OPCIÓN 1)',
      url: 'acestream://ef9dcc4eaac36a0f608b52a31f8ab237859e071a',
      tags: 'movistar deportes',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CPDEP.png',
    },
    {
      title: 'M+ Deportes (OPCIÓN 2)',
      url: 'acestream://b5842718859345a596107ab8e6b24d7bfa2d617e',
      tags: 'movistar deportes',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CPDEP.png',
    },
    {
      title: 'M+ Deportes 2',
      url: 'acestream://edd06f11e1cef292a1d795e15207ef2f580e298c',
      tags: 'movistar deportes 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/ARTHUR.png',
    },
    {
      title: 'M+ Deportes 3',
      url: 'acestream://753d4b1f7c4ef43238b5cf23b05572b550a44eee',
      tags: 'movistar deportes 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/USOP2.png',
    },
    {
      title: 'M+ Deportes 4',
      url: 'acestream://58a4c880ab18486d914751db32a12760e74b75a4',
      tags: 'movistar deportes 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/USOP3.png',
    },
    {
      title: 'M+ Deportes 5',
      url: 'acestream://fcc0fd75bf1dba40b108fcf0d3514e0e549bfbac',
      tags: 'movistar deportes 5',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/USOP11.png',
    },
    {
      title: 'M+ Deportes 6',
      url: 'acestream://cc5782d37ae6b6e0bab396dd64074982d0879046',
      tags: 'movistar deportes 6',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/MULTI8.png',
    },
    {
      title: 'M+ Deportes 7',
      url: 'acestream://070f82d6443a52962d6a2ed9954c979b29404932',
      tags: 'movistar deportes 7',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/MULTI6.png',
    },
    {
      title: 'DAZN Liga F 1',
      url: 'acestream://600222a4f98df80a2c0df2d60cb5ff3df9620710',
      tags: 'dazn liga f 1',
      img: 'https://ligaf.es/media/images/img_web/logos/logo-ligaf-completo-color1.svg?v=4',
    },
    {
      title: 'DAZN Liga F 2',
      url: 'acestream://d6cdd724a97fcf851e7ef641c28d6beb8663496e',
      tags: 'dazn liga f 2',
      img: 'https://ligaf.es/media/images/img_web/logos/logo-ligaf-completo-color1.svg?v=4',
    },
    {
      title: 'DAZN Liga F 3',
      url: 'acestream://162942adc047d0f78eac056effbe5bbec54a5e51',
      tags: 'dazn liga f 3',
      img: 'https://ligaf.es/media/images/img_web/logos/logo-ligaf-completo-color1.svg?v=4',
    },
    {
      title: 'DAZN Liga F 4',
      url: 'acestream://e454681a152a86da504e63694f17f90d0586867d',
      tags: 'dazn liga f 4',
      img: 'https://ligaf.es/media/images/img_web/logos/logo-ligaf-completo-color1.svg?v=4',
    },
  ];
}
