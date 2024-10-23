import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  links = [
    {
      title: 'La1',
      url: 'acestream://02b9307c5c97c86914cc5939d6bbeb5b4ec60b47',
    },
    {
      title: 'La1 UHD',
      url: 'acestream://61a38b6c3b6c3fdffcb2f61053f3437e569eb666',
    },
    {
      title: 'La2',
      url: 'acestream://60106275d34f995e26bb2cc4a21a42f586c6c555',
    },
    {
      title: 'tdp 1080',
      url: 'acestream://e2395d28ad19423212fd3aa0e81f387db3e8bb9f',
    },
    {
      title: 'EuroSport 1 1080',
      url: 'acestream://5e4cd48c79f991fcbee2de8b9d30c4b16de3b952',
    },
    {
      title: 'EuroSport 2 1080',
      url: 'acestream://c373da9e901d414b7384e671112e64d5a2310c29',
    },
    {
      title: 'Euro 4k',
      url: 'acestream://63135c171f056d1d6028f9ffb1637ed704b88a20',
    },
    {
      title: 'Euro1 1080P',
      url: 'acestream://f233f3a8e9ddfae2e43d919789073fc17d9bbd7c',
    },
    {
      title: 'Euro2 1080',
      url: 'acestream://3e0df5e0e93cc867022e320afef0aaecda9509fe',
    },
    {
      title: 'Euro3 1080',
      url: 'acestream://a62c010c71bfb76b18188f108c3cc4541c34f45e',
    },
    {
      title: 'Euro4 1080',
      url: 'acestream://76a482a4cb53fc28518187c6b814f136b3db3c95',
    },
    {
      title: 'Euro5 1080',
      url: 'acestream://914ce366baec9b0fb3523dd7ba762a44b597fc40',
    },
    {
      title: 'Euro6 1080',
      url: 'acestream://1bc614c5aa2a94117c13c7f0be2b8ea31b535f38',
    },
    {
      title: 'Euro7 1080',
      url: 'acestream://e899a4f1e20f7ce1b39cc529dc237fc29a21855f',
    },
    {
      title: 'Euro8 1080',
      url: 'acestream://721a78f2076faa584c9c09059ffb4e10159f4665',
    },
    {
      title: 'Euro9 1080',
      url: 'acestream://dd9c56ef2f09753c59d9c2e2d2af31aeea6451c0',
    },
    {
      title: 'M. LaLiga UHD',
      url: 'acestream://dce1579e3a2e5bd29071fca8eae364f1eb3205cf',
    },
    {
      title: 'M. LaLiga 1080P',
      url: 'acestream://aa82e7d4f03061f2144a2f4be22f2e2210d42280',
    },
    {
      title: 'M. LaLiga 1080 MultiAudio',
      url: 'acestream://7d8c87e057be98f00f22e23b23fbf08999e4b02f',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZDhJ7oqU-bMIGmE6719lIr7vIcJF5gb_ZVA&s',
    },
    {
      title: 'M. LaLiga 1080 MultiAudio',
      url: 'acestream://1969c27658d4c8333ab2c0670802546121a774a5',
    },
    {
      title: 'M. LaLiga 720',
      url: 'acestream://f031f5728b32f6089dda28edebe990cf198108d8',
    },
    {
      title: 'M. LaLiga 2 1080',
      url: 'acestream://26029f72a4ca831d09deefe89534818db1d105bc',
    },
    {
      title: 'M. LaLiga 2 720',
      url: 'acestream://80126b240f3e4e004754fd8f8103e857ab2556a0',
    },
    {
      title: 'M. LaLiga 3 1080',
      url: 'acestream://4c4844564313e39a888f593511f299f5ba3cf929',
    },
    {
      title: 'M. LaLiga 4 1080',
      url: 'acestream://aa8f826da70e27a26b29c7b32402f17e8a67a8b0',
    },
    {
      title: 'M. LaLiga 5 1080',
      url: 'acestream://535394f62a810bc5aeb25be75ea5ff7d03e070b2',
    },
    {
      title: 'M. LaLiga 6 1080',
      url: 'acestream://c896d37778f9e43549a788fc22206a655895b51b',
    },
    {
      title: 'La Liga BAR 1080',
      url: 'acestream://aa82e7d4f03061f2144a2f4be22f2e2210d42280',
    },
    {
      title: 'DAZN LaLiga 1080 MultiAudio',
      url: 'acestream://1960a9be8ae9e8c755330218eac4c5805466290a',
    },
    {
      title: 'DAZN LaLiga 1080 MultiAudio',
      url: 'acestream://75251ba975132ec9a202806ba5bf606e87280c96',
    },
    {
      title: 'DAZN LaLiga 720',
      url: 'acestream://a3bca895c58d3fc7d5e4259d3d5e3cf0291d1914',
    },
    {
      title: 'DAZN LaLiga 2 1080 MultiAudio',
      url: 'acestream://e33e666c393ef04ebe99a9b92135d2e0b48c4d10',
    },
    {
      title: 'DAZN LaLiga 2 720 MultiAudio',
      url: 'acestream://02b9307c5c97c86914cc5939d6bbeb5b4ec60b47',
    },
    {
      title: 'DAZN LaLiga 3 1080 MultiAudio',
      url: 'acestream://8c71f0e0a5476e10950fc827f9d2a507340aba74',
    },
    {
      title: 'DAZN LaLiga 4 1080 MultiAudio',
      url: 'acestream://2792a8a5f4a3f53cd72dec377a2639cd12a6973e',
    },
    {
      title: 'DAZN LaLiga 5 1080 MultiAudio',
      url: 'acestream://99e544cddbee13798e854c1009ee7d1a93fdedf7',
    },
    {
      title: 'LaLiga Smartbank 1080',
      url: 'acestream://4c46585214b23b1d802ef2168060c7649a3894cf',
    },
    {
      title: 'LaLiga Smartbank 720',
      url: 'acestream://06b367c22394a1358c9cefa0cb5d0b64b9b2b3f4',
    },
    {
      title: 'LaLiga Smartbank 2 1080',
      url: 'acestream://d81b4f2f3fde433539c097b2edc9b587ca47b087',
    },
    {
      title: 'LaLiga Smartbank 2 720',
      url: 'acestream://2709d0ab86cb6ce7ba4d3ad188d7fa80668f2924',
    },
    {
      title: 'LaLiga Smartbank 3',
      url: 'acestream://bd2f7970c17f427ae92867e2eb86696dd7900a3e',
    },
    {
      title: 'LaLiga Smartbank 4',
      url: 'acestream://ef3a9359800bba51018fe00ac84afb8e79a7bbf2',
    },
    {
      title: 'LaLiga Smartbank 5',
      url: 'acestream://7a6f7c3acc3689c40f2300432723c55d41222af0',
    },
    {
      title: 'LaLiga Smartbank 6',
      url: 'acestream://5bd78125bd1e98c3f49e98910ed15e39d0b9f631',
    },
    {
      title: 'LaLiga Smartbank 7',
      url: 'acestream://b7e43c2c3887864193578eb57079955c50070f69',
    },
    {
      title: 'LaLiga Smartbank 8',
      url: 'acestream://11c89343be863cf2a69b3973747c629d9e79d7b8',
    },
    {
      title: 'LaLiga Smartbank 9',
      url: 'acestream://0fd11e74d20919c25d2c5d96ba6f7fc7532394c1',
    },
    {
      title: 'LaLiga Smartbank 10',
      url: 'acestream://629222201d6e36cc0f4ab6244362de32bed783b2',
    },
    {
      title: 'LaLiga Smartbank 11',
      url: 'acestream://d6ecda8ad7be7a9a4de3767eb40569b73b738cb4',
    },
    {
      title: 'LaLiga Smartbank 12',
      url: 'acestream://7b975804279b0aa421496538ad21397cc06ddfb8',
    },
    {
      title: 'M.Plus 1080',
      url: 'acestream://5a236fbbe6e5bbfec03db548c244a7c858d675c0',
    },
    {
      title: 'Copa 1080',
      url: 'acestream://8ba764f6a3bce6eae87ec71208fad1aa3a20528d',
    },
    {
      title: 'Copa 1080 plus',
      url: 'acestream://d6cdd724a97fcf851e7ef641c28d6beb8663496e',
    },
    {
      title: 'Copa 1080 MultiAudio',
      url: 'acestream://3a4c8ac955d451bf3c29b45256e74aa0ea82d281',
    },
    {
      title: 'Copa 1080',
      url: 'acestream://7d70685696722c2b1b48a5ae1a7f92c445d9443d',
    },
    {
      title: 'Copa 720',
      url: 'acestream://dab7cab5d6d177df36c3b333ca363c2266d91a03',
    },
    {
      title: '#Vamos 1080',
      url: 'acestream://859bb6295b8d0f224224d3063d9db7cdeca03122',
    },
    {
      title: '#Vamos 720',
      url: 'acestream://3bba7c95857c2502c7e03ced1a6a9b00eb567fa0',
    },
    {
      title: '#Ellas 1080',
      url: 'acestream://67654e63b5065cdaa6c8e8d41bb5428b42b32830',
    },
    {
      title: 'M. Deportes 1080',
      url: 'acestream://d00223931b1854163e24c5c22475015d7d45c112',
    },
    {
      title: 'M. Deportes 720',
      url: 'acestream://77d83a79afcf6c865289cd8cdb42223cd4b6501c',
    },
    {
      title: 'M. Deportes 2 1080',
      url: 'acestream://e6f06d697f66a8fa606c4d61236c24b0d604d917',
    },
    {
      title: 'M. Deportes 3 1080',
      url: 'acestream://aee0a595220e0f1c2fee725fd1dbc602d7152a9a',
    },
    {
      title: 'M. Deportes 4 1080',
      url: 'acestream://42e83c337ece0af9ca7808859f84c7960e9cb6f5',
    },
    {
      title: 'M. Deportes 5 1080',
      url: 'acestream://b1e5abc48195b7ca9b2ee1b352e790eb9f7292e3',
    },
    {
      title: 'M. Deportes 6 1080',
      url: 'acestream://8587ed8ac36ac477e1d4176d3159a38bd154d4ce',
    },
    {
      title: 'M. Deportes 7 1080',
      url: 'acestream://2448f1d084f440eed2fbe847e24f1c02f5659a78',
    },
    {
      title: 'M.L. Campeones 1080 MultiAudio',
      url: 'acestream://931b1984badcb821df7b47a66ac0835ac871b51c',
    },
    {
      title: 'M.L. Campeones 1080 MultiAudio',
      url: 'acestream://f096a64dd756a6d549aa7b12ee9acf7eee27e833',
    },
    {
      title: 'M.L. Campeones 1080P',
      url: 'acestream://1d79a7543d691666135669f89f3541f54e2dd0a9',
    },
    {
      title: 'M.L. Campeones 720',
      url: 'acestream://e2e2aca792aae5da19995ac516b1d620531bd49c',
    },
    {
      title: 'M.L. Campeones 2 1080',
      url: 'acestream://fc2fe31b0bce25e2dc7ab4d262bf645e2be5a393',
    },
    {
      title: 'M.L. Campeones 2 720',
      url: 'acestream://6753492c1908274c268a1b28e2a054a0ff8f86f9',
    },
    {
      title: 'M.L. Campeones 3 1080',
      url: 'acestream://ad372cba73aa0ece207a79532b3e30b731136bb2',
    },
    {
      title: 'M.L. Campeones 3 720',
      url: 'acestream://d59fe9978eed49f256b312a60671b5bce43d3f24',
    },
    {
      title: 'M.L. Campeones 4 1080',
      url: 'acestream://f2df4f96b23388b45e75d848a48a510cf8af560f',
    },
    {
      title: 'M.L. Campeones 5 1080',
      url: 'acestream://67b353ab1c4c2f6396b3ca5c4b45023bd9927561',
    },
    {
      title: 'M.L. Campeones 6 1080',
      url: 'acestream://64a9353032efa2acb093d0bb86481f20f482d47e',
    },
    {
      title: 'M.L. Campeones 7 1080',
      url: 'acestream://5932623d2fd7ed16b01787251b418e4f59a01cda',
    },
    {
      title: 'M.L. Campeones 8 1080',
      url: 'acestream://6c445141445b06d7b4328d80e2dd936bd0ca52ca',
    },
    {
      title: 'M.L. Campeones 9 SD',
      url: 'acestream://7244379f8f6382d40afec871fb8e4219a803840b',
    },
    {
      title: 'M.L. Campeones 10 SD',
      url: 'acestream://d42e1b592b840ea34394fd3e1b1d3a4d0f399213',
    },
    {
      title: 'M.L. Campeones 11 SD',
      url: 'acestream://e737c681a92a4328703761c6ed9d8a951655f3e4',
    },
    {
      title: 'M.L. Campeones 12 SD',
      url: 'acestream://33369549c635dabdb78b95c478c21fcc9e4ee854',
    },
    {
      title: 'M.L. Campeones 13 SD',
      url: 'acestream://60296c246e3596f334903fefd48cfaa724a5053b',
    },
    {
      title: 'M.L. Campeones 17 SD',
      url: 'acestream://60296c246e3596f334903fefd48cfaa724a5053b',
    },
    {
      title: 'M. Golf 1080',
      url: 'acestream://688cc3af0f517c598e07d35f1ce79f8bcba17d81',
    },
    {
      title: 'M. Golf2 1080',
      url: 'acestream://0742f7fabb74715b11c5a5dae24e93a4644697a5',
    },
    {
      title: 'DAZN 1 1080',
      url: 'acestream://8ca07071b39185431f8e940ec98d1add9e561639',
    },
    {
      title: 'DAZN 1 720',
      url: 'acestream://eaff9293c76a324c750ef5094c2a4e2c96518d1f',
    },
    {
      title: 'DAZN 2 1080',
      url: 'acestream://60dbeeb299ec04bf02bc7426d827547599d3d9fc',
    },
    { title: 'DAZN 2 720', url: 'acestream://7aa402bab9fff43258f' },
    {
      title: 'DAZN 3 1080',
      url: 'acestream://a8ffddef56f082d4bb5c0be0d3d2fdd8c16dbd97',
    },
    {
      title: 'DAZN 4 1080',
      url: 'acestream://2fcdf7a19c0858f686efdfabd3c8c2b92bf6bcfd',
    },
    {
      title: 'DAZN F1 Multicamara (Fórmula 1)',
      url: 'acestream://968627d24eec1c16b51d88e4a4a6c02211e3346e',
    },
    {
      title: 'DAZN F1 1080 (Fórmula 1)',
      url: 'acestream://5789ca155323664edd293b848606688edf803f4d',
    },
    {
      title: 'DAZN F1 1080 (Fórmula 1)',
      url: 'acestream://9dad717d99b29a05672166258a77c25b57713dd5',
    },
    {
      title: 'DAZN F1 720 (Fórmula 1)',
      url: 'acestream://e1fcad9de0c782c157fde6377805c58297ab65c2',
    },
    {
      title: 'Eurosport4k',
      url: 'acestream://c525471499b936decc037ea86e0f8125ebf78c28',
    },
    {
      title: 'EuroSport 1 1080',
      url: 'acestream://5e4cd48c79f991fcbee2de8b9d30c4b16de3b952',
    },
    {
      title: 'EuroSport 2 1080',
      url: 'acestream://c373da9e901d414b7384e671112e64d5a2310c29',
    },
    {
      title: 'GOL TV 1080',
      url: 'acestream://d4627f7b6b237a8556819445b3283d866caceca2',
    },
    {
      title: 'tdp 1080',
      url: 'acestream://e2395d28ad19423212fd3aa0e81f387db3e8bb9f',
    },
    {
      title: 'Tennis Channel',
      url: 'acestream://9292d3b32432efb56db4014933cbdec0a7cf2e36',
    },
    {
      title: 'CUATRO 1080',
      url: 'acestream://e8eec35f4662be1af96963245bfa88fb7d0242c4',
    },
    {
      title: 'BeMad 1080',
      url: 'acestream://5c267a00f264736c1d47c1cc3e754447ca8f770c',
    },
    {
      title: 'Telecinco 1080',
      url: 'acestream://bb1982ae8d2d409d4ccd7a9f498042684e3532b5',
    },
    {
      title: 'Sport Tv 1 1080',
      url: 'acestream://ce235921dac95e1da2dd5e54673c2fecb9e806de',
    },
    {
      title: 'Sport Tv 2 1080',
      url: 'acestream://396d82ca6f5445abcd32e6b609d67e332ee12ace',
    },
    {
      title: 'Sport Tv 3 1080',
      url: 'acestream://f8cb9d9e3077eb3ae417b2d95a69c5f590760eb9',
    },
    {
      title: 'beIN SPORTS ñ',
      url: 'acestream://41af6926a6010b68ba2540975761436bb077748f',
    },
    {
      title: 'Barça 720',
      url: 'acestream://e3362507e7c732b9461bd7bdc74bd054c49b3ba7',
    },
    {
      title: 'PPVP 1',
      url: 'acestream://600222a4f98df80a2c0df2d60cb5ff3df9620710',
    },
    {
      title: 'PPVP 2',
      url: 'acestream://d6cdd724a97fcf851e7ef641c28d6beb8663496e',
    },
    {
      title: 'PPVP 3',
      url: 'acestream://162942adc047d0f78eac056effbe5bbec54a5e51',
    },
    {
      title: 'PPVP 4',
      url: 'acestream://e454681a152a86da504e63694f17f90d0586867d',
    },
  ];

  copyLink(url: string) {
    navigator.clipboard.writeText(url);
  }
}
