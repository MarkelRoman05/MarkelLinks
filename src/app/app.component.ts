import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    AgendaEventoTextComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  searchTerm: string = '';
  filteredLinks: any[] = [];
  loading: boolean[] = [true, true, true, true, true];

  constructor(private snackBar: MatSnackBar) {
    window.clarity('consent');
  }

  ngOnInit() {
    this.filteredLinks = [...this.links];
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteSearch() {
    this.searchTerm = '';
    this.filterLinks();
  }

  copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('Enlace copiado', '', {
        duration: 2500,
      });
      if ((window as any).clarity) {
        (window as any).clarity('set', 'copy_event', { link: url });
      }
    });
  }

  trackClick(linkTitle: string): void {
    if ((window as any).clarity) {
      (window as any).clarity('set', 'click_event', { link: linkTitle });
    }
  }

  onIframeLoad(index: number) {
    this.loading[index] = false;
  }

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
      title: 'M+ LALIGA TV (OPCIÓN 1)',
      url: 'acestream://d3de78aebe544611a2347f54d5796bd87f16c92d',
      tags: 'movistar laliga tv',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA TV (OPCIÓN 2)',
      url: 'acestream://6d05b31e5e8fdae312fbd57897363a7b10ddb163',
      tags: 'movistar laliga tv',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA TV (OPCIÓN 3)',
      url: 'acestream://cc9b7f5fe416069a2110da0909b0f915043c468b',
      tags: 'movistar laliga tv',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA TV (OPCIÓN 4)',
      url: 'acestream://94d34491106e00394835c8cb68aa94481339b53f',
      tags: 'movistar laliga tv',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA TV (OPCIÓN 5)',
      url: 'acestream://1969c27658d4c8333ab2c0670802546121a774a5',
      tags: 'movistar laliga tv',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA TV SD',
      url: 'acestream://1bc437bce57b4b0450f6d1f8d818b7e97000745e',
      tags: 'movistar laliga tv SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGA.png',
    },
    {
      title: 'M+ LALIGA TV 2 (OPCIÓN 1)',
      url: 'acestream://83c6c4942d69f4aa324aa746c5d7dbfd7d1572b3',
      tags: 'movistar laliga tv 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG1.png',
    },
    {
      title: 'M+ LALIGA TV 2 (OPCIÓN 2)',
      url: 'acestream://83a2be1d789584c6040308d485ab1b29880af100',
      tags: 'movistar laliga tv 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG1.png',
    },
    {
      title: 'M+ LALIGA TV 3',
      url: 'acestream://ebe14f1edeb49f2253e3b355a8beeadc9b4f0bc4',
      tags: 'movistar laliga tv 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIG2.png',
    },
    {
      title: 'LALIGA TV Bar (OPCIÓN 1)',
      url: 'acestream://94d34491106e00394835c8cb68aa94481339b53f',
      tags: 'laliga tv bar',
      img: 'https://r2.thesportsdb.com/images/media/channel/logo/f9y6oe1692444384.png',
    },
    {
      title: 'LALIGA TV Bar (OPCIÓN 2)',
      url: 'acestream://608b0faf7d3d25f6fe5dba13d5e4b4142949990e',
      tags: 'laliga tv bar',
      img: 'https://r2.thesportsdb.com/images/media/channel/logo/f9y6oe1692444384.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 1)',
      url: 'acestream://110d441ddc9713a7452588770d2bc85504672f47',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 2)',
      url: 'acestream://6de4794cd02f88f14354b5996823413a59a1de0f',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA (OPCIÓN 3)',
      url: 'acestream://8c8c1e047a1c5ed213ba74722a5345dc55c3c0eb',
      tags: 'dazn laliga SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },  
    {
      title: 'DAZN LALIGA (OPCIÓN 4)',
      url: 'acestream://ec29289b0b14756e686c03a501bae1efa05be70c',
      tags: 'dazn laliga',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNLI.png',
    },
    {
      title: 'DAZN LALIGA 2 (OPCIÓN 1)',
      url: 'acestream://97ba38d47680954be40e48bd8f43e17222fefecb',
      tags: 'dazn laliga 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNL2.png',
    },
    {
      title: 'DAZN LALIGA 2 (OPCIÓN 2)',
      url: 'acestream://c79b272e20f31d1be9103f582e87209a06a63927',
      tags: 'dazn laliga 2 SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNL2.png',
    },
    {
      title: 'DAZN LALIGA 3',
      url: 'acestream://8c71f0e0a5476e10950fc827f9d2a507340aba74',
      tags: 'dazn laliga 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZNL3.png',
    },
    {
      title: 'Movistar Plus+ (OPCIÓN 1)',
      url: 'acestream://56ac8e227d526e722624675ccdd91b0cc850582f',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
    },
    {
      title: 'Movistar Plus+ (OPCIÓN 2)',
      url: 'acestream://bf270b6486daf3a2aa54bc027fd7cb02401a447a',
      tags: 'movistar plus +',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MPLUS.png',
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
      title: 'M+ Copa del Rey SD',
      url: 'acestream://b51f2d9a15b6956a44385b6be531bcabeb099d9d',
      tags: 'movistar copa del rey SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MCOPA.png',
    },
    {
      title: 'Eurosport 1 (OPCIÓN 1)',
      url: 'acestream://16ffa1713f42aa27317ee039a2bd0cdbc89a1580',
      tags: 'eurosport 1',
      img: 'https://e7.pngegg.com/pngimages/350/883/png-clipart-eurosport-1-eurosport-2-television-channel-1-euro-television-blue-thumbnail.png',
    },
    {
      title: 'Eurosport 1 (OPCIÓN 2)',
      url: 'acestream://f233f3a8e9ddfae2e43d919789073fc17d9bbd7c',
      tags: 'eurosport 1',
      img: 'https://e7.pngegg.com/pngimages/350/883/png-clipart-eurosport-1-eurosport-2-television-channel-1-euro-television-blue-thumbnail.png',
    },
    {
      title: 'Eurosport 2 (OPCIÓN 1)',
      url: 'acestream://98784fa0714190de289f42eb5b84e405df7e685a',
      tags: 'eurosport 2',
      img: 'https://w7.pngwing.com/pngs/327/493/png-transparent-eurosport-1-television-channel-logo-eurosport-2-others-miscellaneous-television-text.png',
    },
    {
      title: 'Eurosport 2 (OPCIÓN 2)',
      url: 'acestream://3e0df5e0e93cc867022e320afef0aaecda9509fe',
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
      title: 'LALIGA TV Hypermotion',
      url: 'acestream://b2706a7ffbea236a3b398139a3a606ada664c0eb',
      tags: 'laliga hypermotion',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS.png',
    },
    {
      title: 'LALIGA TV Hypermotion SD',
      url: 'acestream://121f719ebb94193c6086ef92865cf9b197750980',
      tags: 'laliga hypermotion SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS.png',
    },
    {
      title: 'LALIGA TV Hypermotion 2',
      url: 'acestream://0cfdfde1b70623b8c210b0f7301be2a87456481d',
      tags: 'laliga hypermotion 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS2.png',
    },
    {
      title: 'LALIGA TV Hypermotion 2 SD',
      url: 'acestream://0a335406bad0b658aeddb2d38f8c0614b2e5623a',
      tags: 'laliga hypermotion 2 SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS2.png',
    },
    {
      title: 'LALIGA TV Hypermotion 3',
      url: 'acestream://fefd45ed6ff415e05f1341b7d9da2988eacd13ea',
      tags: 'laliga hypermotion 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS3.png',
    },
    {
      title: 'LALIGA TV Hypermotion 4',
      url: 'acestream://ef3a9359800bba51018fe00ac84afb8e79a7bbf2',
      tags: 'laliga hypermotion 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS4.png',
    },
    {
      title: 'LALIGA TV Hypermotion 5',
      url: 'acestream://7a6f7c3acc3689c40f2300432723c55d41222af0',
      tags: 'laliga hypermotion 5',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MLIGS5.png',
    },

    {
      title: 'DAZN F1 (Fórmula 1) [OPCIÓN 1]',
      url: 'acestream://d6281d4e6310269b416180442a470d23a4a99dc9',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (Fórmula 1) [OPCIÓN 2]',
      url: 'acestream://2c6e4c897661e6b0257bfe931b66d20b2ec763b6',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 (Fórmula 1) [OPCIÓN 3]',
      url: 'acestream://71eef80158aa8b37f3dc59f6793c6696df9a2dfa',
      tags: 'dazn f1 formula 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 SD (Fórmula 1)',
      url: 'acestream://268289e7a3c5209960b53b4d43c8c65fab294b85',
      tags: 'dazn f1 formula 1 SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'DAZN F1 Multicámara (Fórmula 1)',
      url: 'acestream://968627d24eec1c16b51d88e4a4a6c02211e3346e',
      tags: 'dazn f1 formula 1 multicamara',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MVF1.png',
    },
    {
      title: 'M+ Golf',
      url: 'acestream://f41f1096862767289620be5bd85727f946a434db',
      tags: 'movistar golf',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/GOLF+.png',
    },
    {
      title: 'M+ Golf 2',
      url: 'acestream://e258e75e0e802afa5fcc53d46b47d8801a254ad5',
      tags: 'movistar golf 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/GOLF2.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 1)',
      url: 'acestream://bb5a8bf7752e978460ee1710e5e8950a5c9e1f99',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 2)',
      url: 'acestream://0a26e20f39845e928411e09a124374fccb6e1478',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 3)',
      url: 'acestream://9796f85036cb987fa21ef70e4b5e608e06f0c29d',
      tags: 'movistar liga de campeones',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAPIO.png',
    },
    {
      title: 'M+ L. de Campeones (OPCIÓN 4)',
      url: 'acestream://e572a5178ff72eed7d1d751a18b4b3419699f370',
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
      url: 'acestream://5c552dda22c9b00a3b7cf8a1a485034f8d90f978',
      tags: 'movistar liga de campeones 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP1.png',
    },
    {
      title: 'M+ L. de Campeones 3 (OPCIÓN 1)',
      url: 'acestream://3618edda333dad5374ac2c801f5f14483934b97d',
      tags: 'movistar liga de campeones 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP2.png',
    },
    {
      title: 'M+ L. de Campeones 3 (OPCIÓN 2)',
      url: 'acestream://e42984ac6529407462f92201af95c01db8988368',
      tags: 'movistar liga de campeones 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP2.png',
    },
    {
      title: 'M+ L. de Campeones 4 (Multi)',
      url: 'acestream://65a18a6bd83918a9586b673fec12405aaf4e9f7d',
      tags: 'movistar liga de campeones 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP3.png',
    },
    {
      title: 'M+ L. de Campeones 5',
      url: 'acestream://11744c25a594e17d587ed0871fe40ff21b4bd1e0',
      tags: 'movistar liga de campeones 5',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP4.png',
    },
    {
      title: 'M+ L. de Campeones 6',
      url: 'acestream://7aded197b3e03057d5b27a27db981ef5eefd95fd',
      tags: 'movistar liga de campeones 6',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP5.png',
    },
    {
      title: 'M+ L. de Campeones 7',
      url: 'acestream://2e2ef8a653d36192d881a438c0578381ff39b5ea',
      tags: 'movistar liga de campeones 7',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP6.png',
    },
    {
      title: 'M+ L. de Campeones 8',
      url: 'acestream://7ca2282e0b700429e991152a82427a37583c5f5f',
      tags: 'movistar liga de campeones 8',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP7.png',
    },
    {
      title: 'M+ L. de Campeones 9 SD',
      url: 'acestream://7244379f8f6382d40afec871fb8e4219a803840b',
      tags: 'movistar liga de campeones 9 sd',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP8.png',
    },
    {
      title: 'M+ L. de Campeones 10 SD',
      url: 'acestream://d42e1b592b840ea34394fd3e1b1d3a4d0f399213',
      tags: 'movistar liga de campeones 10 sd',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP9.png',
    },
    {
      title: 'M+ L. de Campeones 11 SD',
      url: 'acestream://e737c681a92a4328703761c6ed9d8a951655f3e4',
      tags: 'movistar liga de campeones 11 sd',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP10.png',
    },
    {
      title: 'M+ L. de Campeones 12 SD',
      url: 'acestream://33369549c635dabdb78b95c478c21fcc9e4ee854',
      tags: 'movistar liga de campeones 12 sd',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP11.png',
    },
    {
      title: 'M+ L. de Campeones 13 SD',
      url: 'acestream://60296c246e3596f334903fefd48cfaa724a5053b',
      tags: 'movistar liga de campeones 13 sd',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP12.png',
    },
    {
      title: 'M+ L. de Campeones 14 SD',
      url: 'acestream://b149283faf12a9e574380c7ad1eb227261eaca85',
      tags: 'movistar liga de campeones 14 sd',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP13.png',
    },
    {
      title: 'M+ L. de Campeones 15 SD',
      url: 'acestream://bb8506403e19f80ab66e431f2a4c74089a909d06',
      tags: 'movistar liga de campeones 15 sd',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CHAP14.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 1)',
      url: 'acestream://35c7f0c966ecde3390f4510bb4caded40018c07a',
      tags: 'dazn 1 ',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 2)',
      url: 'acestream://7cf0086fa7d478f51dbba952865c79e66cb9add5',
      tags: 'dazn 1 ',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/M1SD.png',
    },
    {
      title: 'DAZN 1 (OPCIÓN 3)',
      url: 'acestream://0908f5dd264ded10b638636cb7479409cfee0813',
      tags: 'dazn 1 ',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/M1SD.png',
    },
    {
      title: 'DAZN 2 (OPCIÓN 1)',
      url: 'acestream://ca923c9873fd206a41c1e83ff8fc40e3cf323c9a',
      tags: 'dazn 2 ',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/M2SD.png',
    },
    {
      title: 'DAZN 2 (OPCIÓN 2)',
      url: 'acestream://b056dfc53c18de02caeff4435ddb6b36bfb7b031',
      tags: 'dazn 2 ',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/M2SD.png',
    },
    {
      title: 'DAZN 2 SD',
      url: 'acestream://a929eeec1268d69d1556a2e3ace793b2577d8810',
      tags: 'dazn 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/M2SD.png',
    },
    {
      title: 'DAZN 3',
      url: 'acestream://b11dd020fc6e89b39b69c1f3bef032be72286e72',
      tags: 'dazn 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN3.png',
    },
    {
      title: 'DAZN 4',
      url: 'acestream://4e83f23945ab3e43982045f88ec31daaa4683102',
      tags: 'dazn 4',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/DAZN4.png',
    },
    {
      title: 'M+ Vamos (OPCIÓN 1)',
      url: 'acestream://d03c13b6723f66155d7a0df3692a3b073fe630f2',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/VAMOSD.png',
    },
    {
      title: 'M+ Vamos (OPCIÓN 2)',
      url: 'acestream://859bb6295b8d0f224224d3063d9db7cdeca03122',
      tags: 'movistar vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/VAMOSD.png',
    },
    {
      title: 'M+ Vamos SD',
      url: 'acestream://12ba546d229bc39f01c3c18988a034b215fe6adb',
      tags: 'movistar vamos SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/VAMOSD.png',
    },
    {
      title: 'M+ Ellas Vamos',
      url: 'acestream://67654e63b5065cdaa6c8e8d41bb5428b42b32830',
      tags: 'movistar ellas vamos',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/MELLAV.png',
    },
    {
      title: 'M+ Deportes',
      url: 'acestream://55d4602cb22b0d8a33c10c2c2f42dae64a9e8895',
      tags: 'movistar deportes ',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CPDEP.png',
    },
    {
      title: 'M+ Deportes SD',
      url: 'acestream://3a74d9869b13e763476800740c6625e715a39879',
      tags: 'movistar deportes SD',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/CPDEP.png',
    },
    {
      title: 'M+ Deportes 2',
      url: 'acestream://911b6c35f4802fd358b78b328528af4650eca020',
      tags: 'movistar deportes 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/ARTHUR.png',
    },
    {
      title: 'M+ Deportes 3',
      url: 'acestream://571bff4d12b1791eb99dbf20bec38e630693a6a3',
      tags: 'movistar deportes 3',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/USOP2.png',
    },
    {
      title: 'M+ Deportes 4',
      url: 'acestream://b4d1308a61e4caf8c06ac3d6ce89d165c015c2fb',
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
      url: 'acestream://2448f1d084f440eed2fbe847e24f1c02f5659a78',
      tags: 'movistar deportes 7',
      img: 'https://www.movistarplus.es/recorte/m-NEO/canal/MULTI6.png',
    },
    {
      title: 'La 1',
      url: 'acestream://71abebf150324106df1d9dc25e34dd8840217835',
      tags: 'la 1',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/TVE.png',
    },
    {
      title: 'La 2',
      url: 'acestream://d27e23deffb2314a9549b00d62fade1e2e38ed60',
      tags: 'la 2',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/LA2.png',
    },
    {
      title: 'GOL PLAY',
      url: 'acestream://d4627f7b6b237a8556819445b3283d866caceca2',
      tags: 'gol play',
      img: 'https://www.movistarplus.es/recorte/m-NEO/ficha_m/GOL.png',
    },
    {
      title: 'beIN SPORTS ñ',
      url: 'acestream://41af6926a6010b68ba2540975761436bb077748f',
      tags: 'bein sports ñ',
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Bein_sport_logo.png',
    },
    {
      title: 'DAZN Liga F 1',
      url: 'acestream://600222a4f98df80a2c0df2d60cb5ff3df9620710',
      tags: 'dazn liga f 1',
      img: 'https://www.thesportsdb.com/images/media/league/badge/xa4s481664007070.png',
    },
    {
      title: 'DAZN Liga F 2',
      url: 'acestream://d6cdd724a97fcf851e7ef641c28d6beb8663496e',
      tags: 'dazn liga f 2',
      img: 'https://www.thesportsdb.com/images/media/league/badge/xa4s481664007070.png',
    },
    {
      title: 'DAZN Liga F 3',
      url: 'acestream://162942adc047d0f78eac056effbe5bbec54a5e51',
      tags: 'dazn liga f 3',
      img: 'https://www.thesportsdb.com/images/media/league/badge/xa4s481664007070.png',
    },
    {
      title: 'DAZN Liga F 4',
      url: 'acestream://e454681a152a86da504e63694f17f90d0586867d',
      tags: 'dazn liga f 4',
      img: 'https://www.thesportsdb.com/images/media/league/badge/xa4s481664007070.png',
    },
  ];
}
