class Torre {
  Nome: string;
  Ataque: number;
  Alcance: number;
  Nivel: number;
  Valor: number;

  constructor(
    nome: string,
    ataque: number,
    alcance: number,
    nivel: number,
    valor: number
  ) {
    this.Nome = nome;
    this.Ataque = ataque;
    this.Alcance = alcance;
    this.Nivel = nivel;
    this.Valor = valor;
  }

  Atacar() {
    return this.Ataque;
  }
}

class Inimigo {
  Nome: string;
  Vida: number;

  constructor(nome: string, vida: number) {
    this.Nome = nome;
    this.Vida = vida;
  }

  ReceberDano(dano: number) {
    this.Vida -= dano;
  }
}

class Jogador {
  Vida: number = 10;
  Dinheiro: number = 1000;

  ReceberDano() {
    this.Vida -= 1;
  }

  ReceberDinheiro() {
    if (contadorTurno > 9) {
      this.Dinheiro += 80;
    } else if (contadorTurno > 4) {
      this.Dinheiro += 30;
    } else {
      this.Dinheiro += 5;
    }
  }

  VerificarStatus() {
    return console.log(`VIDA = ${this.Vida} | DINHEIRO = ${this.Dinheiro}`);
  }
}
let loop: boolean = true;
let turnos: number = 0;

let jogador: Jogador = new Jogador();

let torreN1: Torre = new Torre("Torre ATK10", 10, 1, 1, 10);
let torreN2: Torre = new Torre("Torre ATK50", 50, 2, 2, 50);
let torreN3: Torre = new Torre("Torre ATK100", 100, 3, 5, 100);

let inimigoN1: Inimigo = new Inimigo("Inimigo N1", 10);
let inimigoN5: Inimigo = new Inimigo("Inimigo N5", 110);
let inimigoN10: Inimigo = new Inimigo("Inimigo N10", 320);

let arrTabTorre: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrTabInimigos: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function AdicionaTorre(torre: Torre, posicao: number) {
  if (posicao - 1 == 0) {
    alert("Nao pode ser adicionada Torre nessa Posição");
  } else if (arrTabTorre[posicao - 1] != 0) {
    alert(`Ja existe uma ${arrTabTorre[posicao - 1].Nome} nessa posição.`);
    let opcao = prompt(`Caso queira subistituir essa torre digite S/s`);
    if (opcao == "s" || "S") {
      arrTabTorre[posicao - 1] = torre;
    }
  } else {
    arrTabTorre[posicao - 1] = torre;
  }
}

let contadorTurno: number = 0;

function Turno() {
  contadorTurno++;
  arrTabInimigos.forEach((posicao, index) => {
    if (posicao != 0) {
      arrTabInimigos[index - 1] = posicao;
      posicao = 0;
    }
  });
  if (contadorTurno >= 10) {
    arrTabInimigos[9] = inimigoN10 = new Inimigo("Inimigo N10", 320);
  } else if (contadorTurno >= 5) {
    arrTabInimigos[9] = inimigoN5 = new Inimigo("Inimigo N5", 110);
  } else {
    arrTabInimigos[9] = inimigoN1 = new Inimigo("Inimigo N1", 10);
  }

  arrTabTorre.forEach((torre, indexTorre) => {
    let ataqueTurno: number = 1;
    if (torre != 0) {
      let dano = torre.Atacar();
      arrTabInimigos.forEach((inimigo, indexInimigo) => {
        if (
          ataqueTurno == 1 &&
          inimigo != 0 &&
          ((indexInimigo - indexTorre < torre.Alcance &&
            indexInimigo - indexTorre >= 0) ||
            indexInimigo - indexTorre == 0)
        ) {
          inimigo.ReceberDano(dano);
          if (inimigo.Vida <= 0) {
            arrTabInimigos[indexInimigo] = 0;
          }
          ataqueTurno--;
        }
      });
    }
  });

  jogador.ReceberDinheiro();
}

function VerificaVidaEFim(): void {
  if (arrTabInimigos[0] != 0) {
    jogador.Vida -= 1;
  }
  if (turnos == 0) {
    contadorTurno = 0;
    return alert("Fim de Jogo");
  }
  if ((jogador.Vida = 0)) {
    contadorTurno = 0;
    return alert("Fim de Jogo");
  }
}

while (loop) {
  let opcao: number = parseInt(
    prompt(
      `1 - Proximo Turno | 2 - Adicionar Torre | 3 - Verificar Status | 4 - Definir Quantidade de Turnos | 5 - Parar jogo`
    )
  );
  switch (opcao) {
    case 1:
      console.clear();
      console.log(`Defence with <3 by Vine`);
      if (turnos > 0) {
        Turno();
        console.log(arrTabTorre);
        console.log(arrTabInimigos);
      } else {
        alert("Adicione quantidade de turnos");
      }
      break;
    case 2:
      console.clear();
      console.log(`Defence with <3 by Vine`);
      let posicao: number = parseInt(prompt("Digite a posição da torre:"));
      console.log(
        `Torres Disponiveis: N1 ${torreN1.Nome} $10 | N2 ${torreN2.Nome} $50 | N3 ${torreN3.Nome} $100`
      );
      let escolha = parseInt(prompt("1 = N1 | 2 = N2 | 3 = N3"));
      if (escolha == 1 && jogador.Dinheiro >= 10) {
        AdicionaTorre(torreN1, posicao);
        jogador.Dinheiro -= 10;
        console.log(arrTabTorre);
        console.log(arrTabInimigos);
      } else if (escolha == 2 && jogador.Dinheiro >= 50) {
        AdicionaTorre(torreN2, posicao);
        jogador.Dinheiro -= 50;
        console.log(arrTabTorre);
        console.log(arrTabInimigos);
      } else if (escolha == 3 && jogador.Dinheiro >= 100) {
        AdicionaTorre(torreN3, posicao);
        jogador.Dinheiro -= 100;
        console.log(arrTabTorre);
        console.log(arrTabInimigos);
      }
      break;
    case 3:
      console.clear();
      console.log(`Defence with <3 by Vine`);
      jogador.VerificarStatus();
      console.log(arrTabTorre);
      console.log(arrTabInimigos);
      break;
    case 4:
      if (turnos <= 0) {
        turnos = parseInt(prompt("Digite Quantos Turnos Deseja Guerreiro:"));
      } else {
        alert("Os turnos ainda nao acabaram Guerreiro");
      }
      break;
    case 5:
      loop = false;
    default:
      VerificaVidaEFim();
  }
}
