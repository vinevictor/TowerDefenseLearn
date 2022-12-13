var Torre = /** @class */ (function () {
    function Torre(nome, ataque, alcance, nivel, valor) {
        this.Nome = nome;
        this.Ataque = ataque;
        this.Alcance = alcance;
        this.Nivel = nivel;
        this.Valor = valor;
    }
    Torre.prototype.Atacar = function () {
        return this.Ataque;
    };
    return Torre;
}());
var Inimigo = /** @class */ (function () {
    function Inimigo(nome, vida) {
        this.Nome = nome;
        this.Vida = vida;
    }
    Inimigo.prototype.ReceberDano = function (dano) {
        this.Vida -= dano;
    };
    return Inimigo;
}());
var Jogador = /** @class */ (function () {
    function Jogador() {
        this.Vida = 10;
        this.Dinheiro = 1000;
    }
    Jogador.prototype.ReceberDano = function () {
        this.Vida -= 1;
    };
    Jogador.prototype.ReceberDinheiro = function () {
        if (contadorTurno > 9) {
            this.Dinheiro += 80;
        }
        else if (contadorTurno > 4) {
            this.Dinheiro += 30;
        }
        else {
            this.Dinheiro += 5;
        }
    };
    Jogador.prototype.VerificarStatus = function () {
        return console.log("VIDA = ".concat(this.Vida, " | DINHEIRO = ").concat(this.Dinheiro));
    };
    return Jogador;
}());
var loop = true;
var turnos = 0;
var jogador = new Jogador();
var torreN1 = new Torre("Torre ATK10", 10, 1, 1, 10);
var torreN2 = new Torre("Torre ATK50", 50, 2, 2, 50);
var torreN3 = new Torre("Torre ATK100", 100, 3, 5, 100);
var inimigoN1 = new Inimigo("Inimigo N1", 10);
var inimigoN5 = new Inimigo("Inimigo N5", 110);
var inimigoN10 = new Inimigo("Inimigo N10", 320);
var arrTabTorre = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var arrTabInimigos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function AdicionaTorre(torre, posicao) {
    if (posicao - 1 == 0) {
        alert("Nao pode ser adicionada Torre nessa Posição");
    }
    else if (arrTabTorre[posicao - 1] != 0) {
        alert("Ja existe uma ".concat(arrTabTorre[posicao - 1].Nome, " nessa posi\u00E7\u00E3o."));
        var opcao = prompt("Caso queira subistituir essa torre digite S/s");
        if (opcao == "s" || "S") {
            arrTabTorre[posicao - 1] = torre;
        }
    }
    else {
        arrTabTorre[posicao - 1] = torre;
    }
}
var contadorTurno = 0;
function Turno() {
    contadorTurno++;
    arrTabInimigos.forEach(function (posicao, index) {
        if (posicao != 0) {
            arrTabInimigos[index - 1] = posicao;
            posicao = 0;
        }
    });
    if (contadorTurno >= 10) {
        arrTabInimigos[9] = inimigoN10 = new Inimigo("Inimigo N10", 320);
    }
    else if (contadorTurno >= 5) {
        arrTabInimigos[9] = inimigoN5 = new Inimigo("Inimigo N5", 110);
    }
    else {
        arrTabInimigos[9] = inimigoN1 = new Inimigo("Inimigo N1", 10);
    }
    arrTabTorre.forEach(function (torre, indexTorre) {
        var ataqueTurno = 1;
        if (torre != 0) {
            var dano_1 = torre.Atacar();
            arrTabInimigos.forEach(function (inimigo, indexInimigo) {
                if (ataqueTurno == 1 &&
                    inimigo != 0 &&
                    ((indexInimigo - indexTorre < torre.Alcance &&
                        indexInimigo - indexTorre >= 0) ||
                        indexInimigo - indexTorre == 0)) {
                    inimigo.ReceberDano(dano_1);
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
function VerificaVidaEFim() {
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
    var opcao = parseInt(prompt("1 - Proximo Turno | 2 - Adicionar Torre | 3 - Verificar Status | 4 - Definir Quantidade de Turnos | 5 - Parar jogo"));
    switch (opcao) {
        case 1:
            console.clear();
            console.log("Defence with <3 by Vine");
            if (turnos > 0) {
                Turno();
                console.log(arrTabTorre);
                console.log(arrTabInimigos);
            }
            else {
                alert("Adicione quantidade de turnos");
            }
            break;
        case 2:
            console.clear();
            console.log("Defence with <3 by Vine");
            var posicao = parseInt(prompt("Digite a posição da torre:"));
            console.log("Torres Disponiveis: N1 ".concat(torreN1.Nome, " $10 | N2 ").concat(torreN2.Nome, " $50 | N3 ").concat(torreN3.Nome, " $100"));
            var escolha = parseInt(prompt("1 = N1 | 2 = N2 | 3 = N3"));
            if (escolha == 1 && jogador.Dinheiro >= 10) {
                AdicionaTorre(torreN1, posicao);
                jogador.Dinheiro -= 10;
                console.log(arrTabTorre);
                console.log(arrTabInimigos);
            }
            else if (escolha == 2 && jogador.Dinheiro >= 50) {
                AdicionaTorre(torreN2, posicao);
                jogador.Dinheiro -= 50;
                console.log(arrTabTorre);
                console.log(arrTabInimigos);
            }
            else if (escolha == 3 && jogador.Dinheiro >= 100) {
                AdicionaTorre(torreN3, posicao);
                jogador.Dinheiro -= 100;
                console.log(arrTabTorre);
                console.log(arrTabInimigos);
            }
            break;
        case 3:
            console.clear();
            console.log("Defence with <3 by Vine");
            jogador.VerificarStatus();
            console.log(arrTabTorre);
            console.log(arrTabInimigos);
            break;
        case 4:
            if (turnos <= 0) {
                turnos = parseInt(prompt("Digite Quantos Turnos Deseja Guerreiro:"));
            }
            else {
                alert("Os turnos ainda nao acabaram Guerreiro");
            }
            break;
        case 5:
            loop = false;
        default:
            VerificaVidaEFim();
    }
}
