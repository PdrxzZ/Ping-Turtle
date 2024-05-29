//sons do jogo
let raquetada;
let ponto;
let trilha;

//variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 2;
let velocidadeYBolinha = 2;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let imagem;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

function preload(){
  trilha = loadSound("trilha.wav");
  ponto = loadSound("ponto.wav");
  raquetada = loadSound("raquetada.wav");
  imagem = loadImage ("bola.png")
  
}

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
}

function draw() {
  background("#55FF5B");
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete2(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  // verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  line(300, 400, 300, 1)
}

function mostraBolinha() {
  image(imagem, xBolinha, yBolinha, diametro,diametro)
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - diametro < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete2(x,y) {
  fill("red")
  rect(x, y, raqueteComprimento, raqueteAltura);
}
function mostraRaquete(x,y) {
  fill("#00E2FF")
  rect(x,y,raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete() {
  if(keyIsDown(87)) {
    yRaquete -= 10;
  }
  if(keyIsDown(83)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(xRaquete, yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro*4);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}
function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function movimentaRaqueteOponente() {
if(keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  textSize(20);
  textAlign(CENTER);
  stroke("white")
  fill(color("#00E2FF"));
  circle(75,35,40);
  fill(255);
  text(meusPontos, 75, 40);
  fill(color("#FF1100"));
  circle(550, 370, 40);
  fill(255);
  text(pontosDoOponente, 550, 375);
}

function marcaPonto() {
  if (xBolinha > 587) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 25) {
    pontosDoOponente += 1;
    ponto.play();  
  }
}

