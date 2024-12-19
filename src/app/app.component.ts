import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AgendaEventoTextComponent } from './agenda-evento-text/agenda-evento-text.component';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    //AgendaEventoTextComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  searchTerm: string = '';
  filteredLinks: any[] = [];

  constructor(private snackBar: MatSnackBar) {
    window.clarity('consent');
  }

  ngOnInit() {
    this.filteredLinks = [...this.links];
  }

  // SCROLL TO TOP
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.querySelector('.scroll-to-top') as HTMLElement;
    if (window.pageYOffset > 280) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  links = [
    {
      title: 'M+ LALIGA TV 1080 (OPCIÓN 1)',
      url: 'acestream://d3de78aebe544611a2347f54d5796bd87f16c92d',
      tags: 'movistar laliga tv 1080',
    },
    {
      title: 'M+ LALIGA TV 1080 (OPCIÓN 2)',
      url: 'acestream://6d05b31e5e8fdae312fbd57897363a7b10ddb163',
      tags: 'movistar laliga tv 1080',
    },
    {
      title: 'M+ LALIGA TV 1080 (OPCIÓN 3)',
      url: 'acestream://94d34491106e00394835c8cb68aa94481339b53f',
      tags: 'movistar laliga tv 1080',
    },
    {
      title: 'M+ LALIGA TV 1080 (OPCIÓN 4)',
      url: 'acestream://7d8c87e057be98f00f22e23b23fbf08999e4b02f',
      tags: 'movistar laliga tv 1080',
    },
    {
      title: 'M+ LALIGA TV 1080 (OPCIÓN 5)',
      url: 'acestream://1969c27658d4c8333ab2c0670802546121a774a5',
      tags: 'movistar laliga tv 1080',
    },
    {
      title: 'M+ LALIGA TV 720',
      url: 'acestream://1bc437bce57b4b0450f6d1f8d818b7e97000745e',
      tags: 'movistar laliga tv 720',
    },
    {
      title: 'M+ LALIGA TV 2 1080',
      url: 'acestream://83c6c4942d69f4aa324aa746c5d7dbfd7d1572b3',
      tags: 'movistar laliga tv 2 1080',
    },
    {
      title: 'M+ LALIGA TV 2 720',
      url: 'acestream://f31a586422c9244196c810c84b6c85da350318a5',
      tags: 'movistar laliga tv 2 720',
    },
    {
      title: 'M+ LALIGA TV 3 1080',
      url: 'acestream://ebe14f1edeb49f2253e3b355a8beeadc9b4f0bc4',
      tags: 'movistar laliga tv 3 1080',
    },
    {
      title: 'LALIGA TV Bar 1080 (OPCIÓN 1)',
      url: 'acestream://94d34491106e00394835c8cb68aa94481339b53f',
      tags: 'laliga tv bar 1080',
    },
    {
      title: 'LALIGA TV Bar 1080 (OPCIÓN 2)',
      url: 'acestream://608b0faf7d3d25f6fe5dba13d5e4b4142949990e',
      tags: 'laliga tv bar 1080',
    },
    {
      title: 'DAZN LALIGA 1080 (OPCIÓN 1)',
      url: 'acestream://110d441ddc9713a7452588770d2bc85504672f47',
      tags: 'dazn laliga 1080',
    },
    {
      title: 'DAZN LALIGA 1080 (OPCIÓN 2)',
      url: 'acestream://ec29289b0b14756e686c03a501bae1efa05be70c',
      tags: 'dazn laliga 1080',
    },
    {
      title: 'DAZN LALIGA 1080 (OPCIÓN 3)',
      url: 'acestream://6de4794cd02f88f14354b5996823413a59a1de0f',
      tags: 'dazn laliga 1080',
    },
    {
      title: 'DAZN LALIGA 720',
      url: 'acestream://8c8c1e047a1c5ed213ba74722a5345dc55c3c0eb',
      tags: 'dazn laliga 720',
    },
    {
      title: 'DAZN LALIGA 2 1080',
      url: 'acestream://97ba38d47680954be40e48bd8f43e17222fefecb',
      tags: 'dazn laliga 2 1080',
    },
    {
      title: 'DAZN LALIGA 2 720',
      url: 'acestream://51dbbfb42f8091e4ea7a2186b566a40e780953d9',
      tags: 'dazn laliga 2 720',
    },
    {
      title: 'DAZN LALIGA 3 1080 ',
      url: 'acestream://8c71f0e0a5476e10950fc827f9d2a507340aba74',
      tags: 'dazn laliga 3 1080',
    },
    {
      title: 'Movistar Plus+ 1080 (OPCIÓN 1)',
      url: 'acestream://56ac8e227d526e722624675ccdd91b0cc850582f',
      tags: 'movistar plus + 1080',
    },
    {
      title: 'Movistar Plus+ 1080 (OPCIÓN 2)',
      url: 'acestream://8ba764f6a3bce6eae87ec71208fad1aa3a20528d',
      tags: 'movistar plus + 1080',
    },
    {
      title: 'M+ Copa del Rey 1080 (OPCIÓN 1)',
      url: 'acestream://f6beccbc4eea4bc0cda43b3e8ac14790a98b61b4',
      tags: 'movistar copa del rey 1080',
    },
    {
      title: 'M+ Copa del Rey 1080 (OPCIÓN 2)',
      url: 'acestream://3a4c8ac955d451bf3c29b45256e74aa0ea82d281',
      tags: 'movistar copa del rey 1080',
    },
    {
      title: 'M+ Copa del Rey 1080 (OPCIÓN 3)',
      url: 'acestream://d6cdd724a97fcf851e7ef641c28d6beb8663496e',
      tags: 'movistar copa del rey 1080',
    },
    {
      title: 'M+ Copa del Rey 1080 (OPCIÓN 4)',
      url: 'acestream://7d70685696722c2b1b48a5ae1a7f92c445d9443d',
      tags: 'movistar copa del rey 1080',
    },
    {
      title: 'M+ Copa del Rey 720',
      url: 'acestream://b51f2d9a15b6956a44385b6be531bcabeb099d9d',
      tags: 'movistar copa del rey 720',
    },
    {
      title: 'Eurosport 1 1080 (OPCIÓN 1)',
      url: 'acestream://5e4cd48c79f991fcbee2de8b9d30c4b16de3b952',
      tags: 'eurosport 1 1080',
    },
    {
      title: 'Eurosport 1 1080 (OPCIÓN 2)',
      url: 'acestream://f233f3a8e9ddfae2e43d919789073fc17d9bbd7c',
      tags: 'eurosport 1 1080',
    },
    {
      title: 'Eurosport 2 1080 (OPCIÓN 1)',
      url: 'acestream://c373da9e901d414b7384e671112e64d5a2310c29',
      tags: 'eurosport 2 1080',
    },
    {
      title: 'Eurosport 2 1080 (OPCIÓN 2)',
      url: 'acestream://3e0df5e0e93cc867022e320afef0aaecda9509fe',
      tags: 'eurosport 2 1080',
    },
    {
      title: 'Eurosport 4K (OPCIÓN 1)',
      url: 'acestream://63135c171f056d1d6028f9ffb1637ed704b88a20',
      tags: 'eurosport 4k',
    },
    {
      title: 'Eurosport 4K (OPCIÓN 2)',
      url: 'acestream://c525471499b936decc037ea86e0f8125ebf78c28',
      tags: 'eurosport 4k',
    },
    {
      title: 'LALIGA TV Hypermotion 1080',
      url: 'acestream://4c46585214b23b1d802ef2168060c7649a3894cf',
      tags: 'laliga hypermotion 1080',
    },
    {
      title: 'LALIGA TV Hypermotion 720',
      url: 'acestream://06b367c22394a1358c9cefa0cb5d0b64b9b2b3f4',
      tags: 'laliga hypermotion 720',
    },
    {
      title: 'LALIGA TV Hypermotion 2 1080',
      url: 'acestream://d81b4f2f3fde433539c097b2edc9b587ca47b087',
      tags: 'laliga hypermotion 2 1080',
    },
    {
      title: 'LALIGA TV Hypermotion 2 720',
      url: 'acestream://2709d0ab86cb6ce7ba4d3ad188d7fa80668f2924',
      tags: 'laliga hypermotion 2 720',
    },
    {
      title: 'LALIGA TV Hypermotion 3',
      url: 'acestream://bd2f7970c17f427ae92867e2eb86696dd7900a3e',
      tags: 'laliga hypermotion 3',
    },
    {
      title: 'LALIGA TV Hypermotion 4',
      url: 'acestream://ef3a9359800bba51018fe00ac84afb8e79a7bbf2',
      tags: 'laliga hypermotion 4',
    },
    {
      title: 'LALIGA TV Hypermotion 5',
      url: 'acestream://7a6f7c3acc3689c40f2300432723c55d41222af0',
      tags: 'laliga hypermotion 5',
    },
    {
      title: 'LALIGA TV Hypermotion 6',
      url: 'acestream://5bd78125bd1e98c3f49e98910ed15e39d0b9f631',
      tags: 'laliga hypermotion 6',
    },
    {
      title: 'LALIGA TV Hypermotion 7',
      url: 'acestream://b7e43c2c3887864193578eb57079955c50070f69',
      tags: 'laliga hypermotion 7',
    },
    {
      title: 'LALIGA TV Hypermotion 8',
      url: 'acestream://11c89343be863cf2a69b3973747c629d9e79d7b8',
      tags: 'laliga hypermotion 8',
    },
    {
      title: 'LALIGA TV Hypermotion 9',
      url: 'acestream://0fd11e74d20919c25d2c5d96ba6f7fc7532394c1',
      tags: 'laliga hypermotion 9',
    },
    {
      title: 'LALIGA TV Hypermotion 10',
      url: 'acestream://629222201d6e36cc0f4ab6244362de32bed783b2',
      tags: 'laliga hypermotion 10',
    },
    {
      title: 'LALIGA TV Hypermotion 11',
      url: 'acestream://d6ecda8ad7be7a9a4de3767eb40569b73b738cb4',
      tags: 'laliga hypermotion 11',
    },
    {
      title: 'LALIGA TV Hypermotion 12',
      url: 'acestream://7b975804279b0aa421496538ad21397cc06ddfb8',
      tags: 'laliga hypermotion 12',
    },
    {
      title: 'DAZN F1 1080 (Fórmula 1) [OPCIÓN 1]',
      url: 'acestream://d6281d4e6310269b416180442a470d23a4a99dc9',
      tags: 'dazn f1 formula 1 1080',
    },
    {
      title: 'DAZN F1 1080 (Fórmula 1) [OPCIÓN 2]',
      url: 'acestream://2c6e4c897661e6b0257bfe931b66d20b2ec763b6',
      tags: 'dazn f1 formula 1 1080',
    },
    {
      title: 'DAZN F1 1080 (Fórmula 1) [OPCIÓN 3]',
      url: 'acestream://71eef80158aa8b37f3dc59f6793c6696df9a2dfa',
      tags: 'dazn f1 formula 1 1080',
    },
    {
      title: 'DAZN F1 720 (Fórmula 1)',
      url: 'acestream://268289e7a3c5209960b53b4d43c8c65fab294b85',
      tags: 'dazn f1 formula 1 720',
    },
    {
      title: 'DAZN F1 Multicámara (Fórmula 1)',
      url: 'acestream://968627d24eec1c16b51d88e4a4a6c02211e3346e',
      tags: 'dazn f1 formula 1 multicamara',
    },
    {
      title: 'M+ Golf 1080',
      url: 'acestream://f41f1096862767289620be5bd85727f946a434db',
      tags: 'movistar golf 1080',
    },
    {
      title: 'M+ Golf 2 1080',
      url: 'acestream://e258e75e0e802afa5fcc53d46b47d8801a254ad5',
      tags: 'movistar golf 2 1080',
    },
    {
      title: 'M+ L. de Campeones 1080 (OPCIÓN 1)',
      url: 'acestream://0a26e20f39845e928411e09a124374fccb6e1478',
      tags: 'movistar liga de campeones 1080',
    },
    {
      title: 'M+ L. de Campeones 1080 (OPCIÓN 2)',
      url: 'acestream://775abd8697715c48a357906d40734ccd2a10513c',
      tags: 'movistar liga de campeones 1080',
    },
    {
      title: 'M+ L. de Campeones 1080 (OPCIÓN 3)',
      url: 'acestream://1d79a7543d691666135669f89f3541f54e2dd0a9',
      tags: 'movistar liga de campeones 1080',
    },
    {
      title: 'M+ L. de Campeones 720',
      url: 'acestream://8edb264520569b2280c5e86b2dc734e120032903',
      tags: 'movistar liga de campeones 720',
    },
    {
      title: 'M+ L. de Campeones 2 1080',
      url: 'acestream://c070cdb701fc46bb79d17568d99fc64620443d63',
      tags: 'movistar liga de campeones 2 1080',
    },
    {
      title: 'M+ L. de Campeones 2 720',
      url: 'acestream://abdf9058786a48623d0de51a3adb414ae10b6e72',
      tags: 'movistar liga de campeones 2 720',
    },
    {
      title: 'M+ L. de Campeones 3 1080',
      url: 'acestream://3618edda333dad5374ac2c801f5f14483934b97d',
      tags: 'movistar liga de campeones 3 1080',
    },
    {
      title: 'M+ L. de Campeones 3 720',
      url: 'acestream://0b348cc1ae499e810729661878764a0fab88ab69',
      tags: 'movistar liga de campeones 3 720',
    },
    {
      title: 'M+ L. de Campeones 4 1080 (Multi)',
      url: 'acestream://65a18a6bd83918a9586b673fec12405aaf4e9f7d',
      tags: 'movistar liga de campeones 4 1080',
    },
    {
      title: 'M+ L. de Campeones 5 1080',
      url: 'acestream://11744c25a594e17d587ed0871fe40ff21b4bd1e0',
      tags: 'movistar liga de campeones 5 1080',
    },
    {
      title: 'M+ L. de Campeones 6 1080',
      url: 'acestream://64a9353032efa2acb093d0bb86481f20f482d47e',
      tags: 'movistar liga de campeones 6 1080',
    },
    {
      title: 'M+ L. de Campeones 7 1080',
      url: 'acestream://5932623d2fd7ed16b01787251b418e4f59a01cda',
      tags: 'movistar liga de campeones 7 1080',
    },
    {
      title: 'M+ L. de Campeones 8 1080',
      url: 'acestream://6c445141445b06d7b4328d80e2dd936bd0ca52ca',
      tags: 'movistar liga de campeones 8 1080',
    },
    {
      title: 'M+ L. de Campeones 9 SD',
      url: 'acestream://7244379f8f6382d40afec871fb8e4219a803840b',
      tags: 'movistar liga de campeones 9 sd',
    },
    {
      title: 'M+ L. de Campeones 10 SD',
      url: 'acestream://d42e1b592b840ea34394fd3e1b1d3a4d0f399213',
      tags: 'movistar liga de campeones 10 sd',
    },
    {
      title: 'M+ L. de Campeones 11 SD',
      url: 'acestream://e737c681a92a4328703761c6ed9d8a951655f3e4',
      tags: 'movistar liga de campeones 11 sd',
    },
    {
      title: 'M+ L. de Campeones 12 SD',
      url: 'acestream://33369549c635dabdb78b95c478c21fcc9e4ee854',
      tags: 'movistar liga de campeones 12 sd',
    },
    {
      title: 'M+ L. de Campeones 13 SD',
      url: 'acestream://60296c246e3596f334903fefd48cfaa724a5053b',
      tags: 'movistar liga de campeones 13 sd',
    },
    {
      title: 'M+ L. de Campeones 17 SD',
      url: 'acestream://60296c246e3596f334903fefd48cfaa724a5053b',
      tags: 'movistar liga de campeones 17 sd',
    },
    {
      title: 'DAZN 1 1080 (OPCIÓN 1)',
      url: 'acestream://7cf0086fa7d478f51dbba952865c79e66cb9add5',
      tags: 'dazn 1 1080',
    },
    {
      title: 'DAZN 1 1080 (OPCIÓN 2)',
      url: 'acestream://8ca07071b39185431f8e940ec98d1add9e561639',
      tags: 'dazn 1 1080',
    },
    {
      title: 'DAZN 1 720',
      url: 'acestream://35c7f0c966ecde3390f4510bb4caded40018c07a',
      tags: 'dazn 1 720',
    },
    {
      title: 'DAZN 2 1080 (OPCIÓN 1)',
      url: 'acestream://ca923c9873fd206a41c1e83ff8fc40e3cf323c9a',
      tags: 'dazn 2 1080',
    },
    {
      title: 'DAZN 2 1080 (OPCIÓN 2)',
      url: 'acestream://60dbeeb299ec04bf02bc7426d827547599d3d9fc',
      tags: 'dazn 2 1080',
    },
    {
      title: 'DAZN 2 720',
      url: 'acestream://a929eeec1268d69d1556a2e3ace793b2577d8810',
      tags: 'dazn 2',
    },
    {
      title: 'DAZN 3 1080',
      url: 'acestream://19cd05c7ae26f22737ae5728b571ca36abd8a2e8',
      tags: 'dazn 3',
    },
    {
      title: 'DAZN 4 1080',
      url: 'acestream://4e83f23945ab3e43982045f88ec31daaa4683102',
      tags: 'dazn 4',
    },
    {
      title: 'M+ Vamos 1080 (OPCIÓN 1)',
      url: 'acestream://d03c13b6723f66155d7a0df3692a3b073fe630f2',
      tags: 'movistar vamos 1080',
    },
    {
      title: 'M+ Vamos 1080 (OPCIÓN 2)',
      url: 'acestream://859bb6295b8d0f224224d3063d9db7cdeca03122',
      tags: 'movistar vamos 1080',
    },
    {
      title: 'M+ Vamos 720',
      url: 'acestream://12ba546d229bc39f01c3c18988a034b215fe6adb',
      tags: 'movistar vamos 720',
    },
    {
      title: 'M+ Ellas Vamos 1080',
      url: 'acestream://67654e63b5065cdaa6c8e8d41bb5428b42b32830',
      tags: 'movistar ellas vamos 1080',
    },
    {
      title: 'M+ Deportes 1080',
      url: 'acestream://55d4602cb22b0d8a33c10c2c2f42dae64a9e8895',
      tags: 'movistar deportes 1080',
    },
    {
      title: 'M+ Deportes 720',
      url: 'acestream://3a74d9869b13e763476800740c6625e715a39879',
      tags: 'movistar deportes 720',
    },
    {
      title: 'M+ Deportes 2 1080',
      url: 'acestream://639c561dd57fa3fc91fde715caeb696c5efb7ce7',
      tags: 'movistar deportes 2 1080',
    },
    {
      title: 'M+ Deportes 3 1080',
      url: 'acestream://571bff4d12b1791eb99dbf20bec38e630693a6a3',
      tags: 'movistar deportes 3 1080',
    },
    {
      title: 'M+ Deportes 4 1080',
      url: 'acestream://b4d1308a61e4caf8c06ac3d6ce89d165c015c2fb',
      tags: 'movistar deportes 4 1080',
    },
    {
      title: 'M+ Deportes 5 1080',
      url: 'acestream://fcc0fd75bf1dba40b108fcf0d3514e0e549bfbac',
      tags: 'movistar deportes 5 1080',
    },
    {
      title: 'M+ Deportes 6 1080',
      url: 'acestream://cc5782d37ae6b6e0bab396dd64074982d0879046',
      tags: 'movistar deportes 6 1080',
    },
    {
      title: 'M+ Deportes 7 1080',
      url: 'acestream://2448f1d084f440eed2fbe847e24f1c02f5659a78',
      tags: 'movistar deportes 7 1080',
    },
    {
      title: 'La 1',
      url: 'acestream://02b9307c5c97c86914cc5939d6bbeb5b4ec60b47',
      tags: 'la 1',
    },
    {
      title: 'La 1 UHD',
      url: 'acestream://61a38b6c3b6c3fdffcb2f61053f3437e569eb666',
      tags: 'la 1 uhd',
    },
    {
      title: 'La 2',
      url: 'acestream://60106275d34f995e26bb2cc4a21a42f586c6c555',
      tags: 'la 2',
    },
    {
      title: 'tdp 1080',
      url: 'acestream://e2395d28ad19423212fd3aa0e81f387db3e8bb9f',
      tags: 'tdp 1080',
    },
    {
      title: 'GOL PLAY 1080',
      url: 'acestream://d4627f7b6b237a8556819445b3283d866caceca2',
      tags: 'gol play 1080',
    },
    {
      title: 'Tennis Channel',
      url: 'acestream://9292d3b32432efb56db4014933cbdec0a7cf2e36',
      tags: 'tennis channel',
    },
    {
      title: 'NBA TV',
      url: 'acestream://e72d03fb9694164317260f684470be9ab781ed95',
      tags: 'nba tv',
    },
    {
      title: 'Wimbledon UHD',
      url: 'acestream://78aa81aedb1e2b6a9ba178398148940857155f6a',
      tags: 'wimbledon uhd',
    },
    {
      title: 'ONETORO TV HD',
      url: 'acestream://f763ab71f6f646e6c993f37e237be97baf2143ef',
      tags: 'onetoro tv hd',
    },
    {
      title: 'beIN SPORTS ñ',
      url: 'acestream://41af6926a6010b68ba2540975761436bb077748f',
      tags: 'bein sports ñ',
    },
    {
      title: 'DAZN Liga F 1',
      url: 'acestream://600222a4f98df80a2c0df2d60cb5ff3df9620710',
      tags: 'dazn liga f 1',
    },
    {
      title: 'DAZN Liga F 2',
      url: 'acestream://d6cdd724a97fcf851e7ef641c28d6beb8663496e',
      tags: 'dazn liga f 2',
    },
    {
      title: 'DAZN Liga F 3',
      url: 'acestream://162942adc047d0f78eac056effbe5bbec54a5e51',
      tags: 'dazn liga f 3',
    },
    {
      title: 'DAZN Liga F 4',
      url: 'acestream://e454681a152a86da504e63694f17f90d0586867d',
      tags: 'dazn liga f 4',
    },
  ];

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

  loading: boolean[] = [true, true, true, true, true];

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
}
