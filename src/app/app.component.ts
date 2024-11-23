import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AgendaEventoTextComponent } from './agenda-evento-text/agenda-evento-text.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatIcon,
    MessagesModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    AgendaEventoTextComponent
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  searchTerm: string = '';
  filteredLinks: any[] = [];

  ngOnInit() {
    this.filteredLinks = [...this.links];
  }

  links = [
    {
      title: 'M+ LALIGA TV 1080 MultiAudio (OPCIÓN 1)',
      url: 'acestream://d3de78aebe544611a2347f54d5796bd87f16c92d',
      tags: 'movistar laliga tv 1080 multi audio'
    },
    {
      title: 'M+ LALIGA TV 1080 MultiAudio (OPCIÓN 2)',
      url: 'acestream://6d05b31e5e8fdae312fbd57897363a7b10ddb163',
      tags: 'movistar laliga tv 1080 multi audio'
    },
    {
      title: 'M+ LALIGA TV 1080 MultiAudio (OPCIÓN 3)',
      url: 'acestream://7d8c87e057be98f00f22e23b23fbf08999e4b02f',
      tags: 'movistar laliga tv 1080 multi audio'
    },
    {
      title: 'M+ LALIGA TV 1080 MultiAudio (OPCIÓN 4)',
      url: 'acestream://1969c27658d4c8333ab2c0670802546121a774a5',
      tags: 'movistar laliga tv 1080 multi audio'
    },
    {
      title: 'M+ LALIGA TV 1080 (OPCIÓN 5)',
      url: 'acestream://aa82e7d4f03061f2144a2f4be22f2e2210d42280',
      tags: 'movistar laliga tv 1080'
    },
    {
      title: 'M+ LALIGA TV 720',
      url: 'acestream://f031f5728b32f6089dda28edebe990cf198108d8',
      tags: 'movistar laliga tv 720'
    },
    {
      title: 'M+ LALIGA TV UHD 4K (No suele funcionar)',
      url: 'acestream://dce1579e3a2e5bd29071fca8eae364f1eb3205cf',
      tags: 'movistar laliga tv uhd 4k'
    },
    {
      title: 'M+ LALIGA TV 2 1080',
      url: 'acestream://26029f72a4ca831d09deefe89534818db1d105bc',
      tags: 'movistar laliga tv 2 1080'
      },
    {
      title: 'M+ LALIGA TV 2 720',
      url: 'acestream://80126b240f3e4e004754fd8f8103e857ab2556a0',
      tags: 'movistar laliga tv 2 720'
    },
    {
      title: 'M+ LALIGA TV 3 1080',
      url: 'acestream://4c4844564313e39a888f593511f299f5ba3cf929',
      tags: 'movistar laliga tv 3 1080'
    },
    {
      title: 'M+ LALIGA TV 4 1080',
      url: 'acestream://aa8f826da70e27a26b29c7b32402f17e8a67a8b0',
      tags: 'movistarlaliga tv 4 1080'
    },
    {
      title: 'M+ LALIGA TV 5 1080',
      url: 'acestream://535394f62a810bc5aeb25be75ea5ff7d03e070b2',
      tags: 'movistar laliga tv 5 1080'
    },
    {
      title: 'M+ LALIGA TV 6 1080',
      url: 'acestream://c896d37778f9e43549a788fc22206a655895b51b',
      tags: 'movistar laliga tv 6 1080'
    },
    {
      title: 'LALIGA TV BAR 1080',
      url: 'acestream://94d34491106e00394835c8cb68aa94481339b53f',
      tags: 'laliga tv bar 1080'
    },
    {
      title: 'DAZN LALIGA 1080 MultiAudio (OPCIÓN 1)',
      url: 'acestream://1960a9be8ae9e8c755330218eac4c5805466290a',
      tags: 'dazn laliga 1080 multi audio'
    },
    {
      title: 'DAZN LALIGA 1080 MultiAudio (OPCIÓN 2)',
      url: 'acestream://75251ba975132ec9a202806ba5bf606e87280c96',
      tags: 'dazn laliga 1080 multi audio'
    },
    {
      title: 'DAZN LALIGA 1080 MultiAudio (OPCIÓN 3)',
      url: 'acestream://95b2238dec35cf00dfdf8fba18e9920bc2c56256',
      tags: 'dazn laliga 1080 multi audio'
    },
    {
      title: 'DAZN LALIGA 720',
      url: 'acestream://a3bca895c58d3fc7d5e4259d3d5e3cf0291d1914',
      tags: 'dazn laliga 720'
      },
    {
      title: 'DAZN LALIGA 2 1080 MultiAudio',
      url: 'acestream://e33e666c393ef04ebe99a9b92135d2e0b48c4d10',
      tags: 'dazn laliga 2 1080 multi audio'
    },
    {
      title: 'DAZN LALIGA 2 720 MultiAudio',
      url: 'acestream://02b9307c5c97c86914cc5939d6bbeb5b4ec60b47',
      tags: 'dazn laliga 2 720 multi audio'
    },
    {
      title: 'DAZN LALIGA 3 1080 MultiAudio',
      url: 'acestream://8c71f0e0a5476e10950fc827f9d2a507340aba74',
      tags: 'dazn laliga 3 1080 multi audio'
    },
    {
      title: 'DAZN LALIGA 4 1080 MultiAudio',
      url: 'acestream://2792a8a5f4a3f53cd72dec377a2639cd12a6973e',
      tags: 'dazn laliga 4 1080 multi audio'
    },
    {
      title: 'DAZN LALIGA 5 1080 MultiAudio',
      url: 'acestream://99e544cddbee13798e854c1009ee7d1a93fdedf7',
      tags: 'dazn laliga 5 1080 multi audio'
    },
    {
      title: 'Movistar Plus+ 1080 [OPCION 1]',
      url: 'acestream://56ac8e227d526e722624675ccdd91b0cc850582f',
      tags: 'movistar plus 1080'
    },
    {
      title: 'Movistar Plus+ 1080 [OPCION 2]',
      url: 'acestream://8ba764f6a3bce6eae87ec71208fad1aa3a20528d',
      tags: 'movistar plus 1080'
    },
    {
      title: 'M+ Copa 1080 (OPCIÓN 1)',
      url: 'acestream://8ba764f6a3bce6eae87ec71208fad1aa3a20528d',
      tags: 'movistar copa 1080'
    },
    {
      title: 'M+ Copa 1080 (OPCIÓN 2)',
      url: 'acestream://d6cdd724a97fcf851e7ef641c28d6beb8663496e',
      tags: 'movistar copa 1080'
    },
    {
      title: 'M+ Copa 1080 (OPCIÓN 3)',
      url: 'acestream://7d70685696722c2b1b48a5ae1a7f92c445d9443d',
      tags: 'movistar copa 1080'
      },
    {
      title: 'M+ Copa 1080 MultiAudio',
      url: 'acestream://3a4c8ac955d451bf3c29b45256e74aa0ea82d281',
      tags: 'movistar copa 1080 multi audio'
    },
    {
      title: 'M+ Copa 720',
      url: 'acestream://dab7cab5d6d177df36c3b333ca363c2266d91a03',
      tags: 'movistar copa 720'
    },
    {
      title: 'Eurosport 1 1080 (OPCIÓN 1)',
      url: 'acestream://5e4cd48c79f991fcbee2de8b9d30c4b16de3b952',
      tags: 'eurosport 1 1080'
    },
    {
      title: 'Eurosport 1 1080 (OPCIÓN 2)',
      url: 'acestream://f233f3a8e9ddfae2e43d919789073fc17d9bbd7c',
      tags: 'eurosport 1 1080'
    },
    {
      title: 'Eurosport 2 1080 (OPCIÓN 1)',
      url: 'acestream://c373da9e901d414b7384e671112e64d5a2310c29',
      tags: 'eurosport 2 1080'
    },
    {
      title: 'Eurosport 2 1080 (OPCIÓN 2)',
      url: 'acestream://3e0df5e0e93cc867022e320afef0aaecda9509fe',
      tags: 'eurosport 2 1080'
    },
    {
      title: 'Eurosport 4K (OPCIÓN 1)',
      url: 'acestream://63135c171f056d1d6028f9ffb1637ed704b88a20',
      tags: 'eurosport 4k 1'
    },
    {
      title: 'Eurosport 4K (OPCIÓN 2)',
      url: 'acestream://c525471499b936decc037ea86e0f8125ebf78c28',
      tags: 'eurosport 4k 2'
    },
    {
      title: 'Eurosport 3 1080',
      url: 'acestream://a62c010c71bfb76b18188f108c3cc4541c34f45e',
      tags: 'eurosport 3 1080'
    },
    {
      title: 'Eurosport 4 1080',
      url: 'acestream://76a482a4cb53fc28518187c6b814f136b3db3c95',
      tags: 'eurosport 4 1080'
    },
    {
      title: 'Eurosport 5 1080',
      url: 'acestream://914ce366baec9b0fb3523dd7ba762a44b597fc40',
      tags: 'eurosport 5 1080'
    },
    {
      title: 'Eurosport 6 1080',
      url: 'acestream://1bc614c5aa2a94117c13c7f0be2b8ea31b535f38',
      tags: 'eurosport 6 1080'
    },
    {
      title: 'Eurosport 7 1080',
      url: 'acestream://e899a4f1e20f7ce1b39cc529dc237fc29a21855f',
      tags: 'eurosport 7 1080'
    },
    {
      title: 'Eurosport 8 1080',
      url: 'acestream://721a78f2076faa584c9c09059ffb4e10159f4665',
      tags: 'eurosport 8 1080'
    },
    {
      title: 'Eurosport 9 1080',
      url: 'acestream://dd9c56ef2f09753c59d9c2e2d2af31aeea6451c0',
      tags: 'eurosport 9 1080'
    },
    {
      title: 'LALIGA Hypermotion 1080',
      url: 'acestream://4c46585214b23b1d802ef2168060c7649a3894cf',
      tags: 'laliga hypermotion 1080'
    },
    {
      title: 'LALIGA Hypermotion 720',
      url: 'acestream://06b367c22394a1358c9cefa0cb5d0b64b9b2b3f4',
      tags: 'laliga hypermotion 720'
    },
    {
      title: 'LALIGA Hypermotion 2 1080',
      url: 'acestream://d81b4f2f3fde433539c097b2edc9b587ca47b087',
      tags: 'laliga hypermotion 2 1080'
    },
    {
      title: 'LALIGA Hypermotion 2 720',
      url: 'acestream://2709d0ab86cb6ce7ba4d3ad188d7fa80668f2924',
      tags: 'laliga hypermotion 2 720'
    },
    {
      title: 'LALIGA Hypermotion 3',
      url: 'acestream://bd2f7970c17f427ae92867e2eb86696dd7900a3e',
      tags: 'laliga hypermotion 3'
    },
    {
      title: 'LALIGA Hypermotion 4',
      url: 'acestream://ef3a9359800bba51018fe00ac84afb8e79a7bbf2',
      tags: 'laliga hypermotion 4'
    },
    {
      title: 'LALIGA Hypermotion 5',
      url: 'acestream://7a6f7c3acc3689c40f2300432723c55d41222af0',
      tags: 'laliga hypermotion 5'
    },
    {
      title: 'LALIGA Hypermotion 6',
      url: 'acestream://5bd78125bd1e98c3f49e98910ed15e39d0b9f631',
      tags: 'laliga hypermotion 6'
    },
    {
      title: 'LALIGA Hypermotion 7',
      url: 'acestream://b7e43c2c3887864193578eb57079955c50070f69',
      tags: 'laliga hypermotion 7'
    },
    {
      title: 'LALIGA Hypermotion 8',
      url: 'acestream://11c89343be863cf2a69b3973747c629d9e79d7b8',
      tags: 'laliga hypermotion 8'
    },
    {
      title: 'LALIGA Hypermotion 9',
      url: 'acestream://0fd11e74d20919c25d2c5d96ba6f7fc7532394c1',
      tags: 'laliga hypermotion 9'
    },
    {
      title: 'LALIGA Hypermotion 10',
      url: 'acestream://629222201d6e36cc0f4ab6244362de32bed783b2',
      tags: 'laliga hypermotion 10'
    },
    {
      title: 'LALIGA Hypermotion 11',
      url: 'acestream://d6ecda8ad7be7a9a4de3767eb40569b73b738cb4',
      tags: 'laliga hypermotion 11'
    },
    {
      title: 'LALIGA Hypermotion 12',
      url: 'acestream://7b975804279b0aa421496538ad21397cc06ddfb8',
      tags: 'laliga hypermotion 12'
    },
    {
      title: 'DAZN F1 Multicámara (Fórmula 1)',
      url: 'acestream://968627d24eec1c16b51d88e4a4a6c02211e3346e',
      tags: 'dazn f1 formula 1 multicamara'
    },
    {
      title: 'DAZN F1 1080 (Fórmula 1) [OPCIÓN 1]',
      url: 'acestream://5789ca155323664edd293b848606688edf803f4d',
      tags: 'dazn f1 formula 1 1080'
    },
    {
      title: 'DAZN F1 1080 (Fórmula 1) [OPCIÓN 2]',
      url: 'acestream://9dad717d99b29a05672166258a77c25b57713dd5',
      tags: 'dazn f1 formula 1 1080'
    },
    {
      title: 'DAZN F1 720 (Fórmula 1)',
      url: 'acestream://e1fcad9de0c782c157fde6377805c58297ab65c2',
      tags: 'dazn f1 formula 1 720'
    },
    {
      title: 'M+ L. de Campeones 1080 MultiAudio (OPCIÓN 1)',
      url: 'acestream://931b1984badcb821df7b47a66ac0835ac871b51c',
      tags: 'movistar liga de campeones 1080 multi audio'
    },
    {
      title: 'M+ L. de Campeones 1080 MultiAudio (OPCIÓN 2)',
      url: 'acestream://f096a64dd756a6d549aa7b12ee9acf7eee27e833',
      tags: 'movistar liga de campeones 1080 multi audio'
    },
    {
      title: 'M+ L. de Campeones 1080 (OPCIÓN 3)',
      url: 'acestream://1d79a7543d691666135669f89f3541f54e2dd0a9',
      tags: 'movistar liga de campeones 1080'
    },
    {
      title: 'M+ L. de Campeones 720',
      url: 'acestream://e2e2aca792aae5da19995ac516b1d620531bd49c',
      tags: 'movistar liga de campeones 720'
    },
    {
      title: 'M+ L. de Campeones 2 1080',
      url: 'acestream://fc2fe31b0bce25e2dc7ab4d262bf645e2be5a393',
      tags: 'movistar liga de campeones 2 1080'
    },
    {
      title: 'M+ L. de Campeones 2 720',
      url: 'acestream://6753492c1908274c268a1b28e2a054a0ff8f86f9',
      tags: 'movistar liga de campeones 2 720'
    },
    {
      title: 'M+ L. de Campeones 3 1080',
      url: 'acestream://ad372cba73aa0ece207a79532b3e30b731136bb2',
      tags: 'movistar liga de campeones 3 1080'
    },
    {
      title: 'M+ L. de Campeones 3 720',
      url: 'acestream://d59fe9978eed49f256b312a60671b5bce43d3f24',
      tags: 'movistar liga de campeones 3 720'
    },
    {
      title: 'M+ L. de Campeones 4 1080 (Multi)',
      url: 'acestream://f2df4f96b23388b45e75d848a48a510cf8af560f',
      tags: 'movistar liga de campeones 4 1080 multi'
    },
    {
      title: 'M+ L. de Campeones 5 1080',
      url: 'acestream://67b353ab1c4c2f6396b3ca5c4b45023bd9927561',
      tags: 'movistar liga de campeones 5 1080'
    },
    {
      title: 'M+ L. de Campeones 6 1080',
      url: 'acestream://64a9353032efa2acb093d0bb86481f20f482d47e',
      tags: 'movistar liga de campeones 6 1080'
    },
    {
      title: 'M+ L. de Campeones 7 1080',
      url: 'acestream://5932623d2fd7ed16b01787251b418e4f59a01cda',
      tags: 'movistar liga de campeones 7 1080'
    },
    {
      title: 'M+ L. de Campeones 8 1080',
      url: 'acestream://6c445141445b06d7b4328d80e2dd936bd0ca52ca',
      tags: 'movistar liga de campeones 8 1080'
    },
    {
      title: 'M+ L. de Campeones 9 SD',
      url: 'acestream://7244379f8f6382d40afec871fb8e4219a803840b',
      tags: 'movistar liga de campeones 9 sd'
    },
    {
      title: 'M+ L. de Campeones 10 SD',
      url: 'acestream://d42e1b592b840ea34394fd3e1b1d3a4d0f399213',
      tags: 'movistar liga de campeones 10 sd'
    },
    {
      title: 'M+ L. de Campeones 11 SD',
      url: 'acestream://e737c681a92a4328703761c6ed9d8a951655f3e4',
      tags: 'movistar liga de campeones 11 sd'
    },
    {
      title: 'M+ L. de Campeones 12 SD',
      url: 'acestream://33369549c635dabdb78b95c478c21fcc9e4ee854',
      tags: 'movistar liga de campeones 12 sd'
    },
    {
      title: 'M+ L. de Campeones 13 SD',
      url: 'acestream://60296c246e3596f334903fefd48cfaa724a5053b',
      tags: 'movistar liga de campeones 13 sd'
    },
    {
      title: 'M+ L. de Campeones 17 SD',
      url: 'acestream://60296c246e3596f334903fefd48cfaa724a5053b',
      tags: 'movistar liga de campeones 17 sd'
    },
    {
      title: 'DAZN 1 1080 (OPCIÓN 1)',
      url: 'acestream://8ca07071b39185431f8e940ec98d1add9e561639',
      tags: 'dazn 1 1080'
    },
    {
      title: 'DAZN 1 1080 (OPCIÓN 2)',
      url: 'acestream://7cf0086fa7d478f51dbba952865c79e66cb9add5',
      tags: 'dazn 1 1080'
    },
    {
      title: 'DAZN 1 720',
      url: 'acestream://eaff9293c76a324c750ef5094c2a4e2c96518d1f',
      tags: 'dazn 1 720'
    },
    {
      title: 'DAZN 2 1080 (OPCIÓN 1)',
      url: 'acestream://60dbeeb299ec04bf02bc7426d827547599d3d9fc',
      tags: 'dazn 2 1080'
    },
    {
      title: 'DAZN 2 1080 (OPCIÓN 2)',
      url: 'acestream://ca923c9873fd206a41c1e83ff8fc40e3cf323c9a',
      tags: 'dazn 2 1080'
    },
    {
      title: 'DAZN 2 720',
      url: 'acestream://7aa402bab9fff43258f',
      tags: 'dazn 2 720'
    },
    {
      title: 'DAZN 3 1080',
      url: 'acestream://a8ffddef56f082d4bb5c0be0d3d2fdd8c16dbd97',
      tags: 'dazn 3 1080'
    },
    {
      title: 'DAZN 4 1080',
      url: 'acestream://2fcdf7a19c0858f686efdfabd3c8c2b92bf6bcfd',
      tags: 'dazn 4 1080'
    },
    {
      title: '#Vamos 1080 (OPCIÓN 1)',
      url: 'acestream://859bb6295b8d0f224224d3063d9db7cdeca03122',
      tags: '#vamos 1080'
    },
    {
      title: '#Vamos 1080 (OPCIÓN 2)',
      url: 'acestream://d03c13b6723f66155d7a0df3692a3b073fe630f2',
      tags: '#vamos 1080'
    },
    {
      title: '#Vamos 720',
      url: 'acestream://3bba7c95857c2502c7e03ced1a6a9b00eb567fa0',
      tags: '#ellas 720'
    },
    {
      title: '#Ellas 1080',
      url: 'acestream://67654e63b5065cdaa6c8e8d41bb5428b42b32830',
      tags: '#ellas 1080'
    },
    {
      title: 'M+ Deportes 1080',
      url: 'acestream://d00223931b1854163e24c5c22475015d7d45c112',
      tags: 'movistar deportes 1080'
    },
    {
      title: 'M+ Deportes 720',
      url: 'acestream://77d83a79afcf6c865289cd8cdb42223cd4b6501c',
      tags: 'movistar deportes 720'
    },
    {
      title: 'M+ Deportes 2 1080',
      url: 'acestream://639c561dd57fa3fc91fde715caeb696c5efb7ce7',
      tags: 'movistar deportes 2 1080'
    },
    {
      title: 'M+ Deportes 3 1080',
      url: 'acestream://aee0a595220e0f1c2fee725fd1dbc602d7152a9a',
      tags: 'movistar deportes 3 1080'
    },
    {
      title: 'M+ Deportes 4 1080',
      url: 'acestream://42e83c337ece0af9ca7808859f84c7960e9cb6f5',
      tags: 'movistar deportes 4 1080'
    },
    {
      title: 'M+ Deportes 5 1080',
      url: 'acestream://b1e5abc48195b7ca9b2ee1b352e790eb9f7292e3',
      tags: 'movistar deportes 5 1080'
    },
    {
      title: 'M+ Deportes 6 1080',
      url: 'acestream://8587ed8ac36ac477e1d4176d3159a38bd154d4ce',
      tags: 'movistar deportes 6 1080'
    },
    {
      title: 'M+ Deportes 7 1080',
      url: 'acestream://2448f1d084f440eed2fbe847e24f1c02f5659a78',
      tags: 'movistar deportes 7 1080'
    },
    {
      title: 'M+ Golf 1080',
      url: 'acestream://688cc3af0f517c598e07d35f1ce79f8bcba17d81',
      tags: 'movistar golf 1080'
    },
    {
      title: 'M+ Golf 2 1080',
      url: 'acestream://0742f7fabb74715b11c5a5dae24e93a4644697a5',
      tags: 'movistar golf 2 1080'
    },
    {
      title: 'La 1',
      url: 'acestream://02b9307c5c97c86914cc5939d6bbeb5b4ec60b47',
      tags: 'la 1'
    },
    {
      title: 'La 1 UHD',
      url: 'acestream://61a38b6c3b6c3fdffcb2f61053f3437e569eb666',
      tags: 'la 1 uhd'
    },
    {
      title: 'La 2',
      url: 'acestream://60106275d34f995e26bb2cc4a21a42f586c6c555',
      tags: 'la 2'
    },
    {
      title: 'tdp 1080',
      url: 'acestream://e2395d28ad19423212fd3aa0e81f387db3e8bb9f',
      tags: 'tdp 1080'
    },
    {
      title: 'GOL PLAY 1080',
      url: 'acestream://d4627f7b6b237a8556819445b3283d866caceca2',
      tags: 'gol play 1080'
    },
    {
      title: 'Tennis Channel',
      url: 'acestream://9292d3b32432efb56db4014933cbdec0a7cf2e36',
      tags: 'tennis channel'
    },
    {
      title: 'NBA TV',
      url: 'acestream://e72d03fb9694164317260f684470be9ab781ed95',
      tags: 'nba tv'
    },
    {
      title: 'Wimbledon UHD',
      url: 'acestream://78aa81aedb1e2b6a9ba178398148940857155f6a',
      tags: 'wimbledon uhd'
    },
    {
      title: 'ONETORO TV HD',
      url: 'acestream://f763ab71f6f646e6c993f37e237be97baf2143ef',
      tags: 'onetoro tv hd'
    },
    {
      title: 'beIN SPORTS ñ',
      url: 'acestream://41af6926a6010b68ba2540975761436bb077748f',
      tags: 'bein sports'
    },
    {
      title: 'DAZN Liga F 1',
      url: 'acestream://600222a4f98df80a2c0df2d60cb5ff3df9620710',
      tags: 'dazn liga f 1'
    },
    {
      title: 'DAZN Liga F 2',
      url: 'acestream://d6cdd724a97fcf851e7ef641c28d6beb8663496e',
      tags: 'dazn liga f 2'
    },
    {
      title: 'DAZN Liga F 3',
      url: 'acestream://162942adc047d0f78eac056effbe5bbec54a5e51',
      tags: 'dazn liga f 3'
    },
    {
      title: 'DAZN Liga F 4',
      url: 'acestream://e454681a152a86da504e63694f17f90d0586867d',
      tags: 'dazn liga f 4'
    },
  ];

  constructor(private messageService: MessageService) {}

  copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Enlace copiado',
      });
      setTimeout(() => {
        this.messageService.clear();
      }, 2000);
    });
  }

  loading: boolean[] = [true, true, true, true, true];

  onIframeLoad(index: number) {
    this.loading[index] = false;
  }

  filterLinks() {
    if (!this.searchTerm) {
      this.filteredLinks = [...this.links];
    } else {
      this.filteredLinks = this.links.filter(link => 
        link.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        link.tags.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
