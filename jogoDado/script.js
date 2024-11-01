'use strict';

const DICE_IMAGE_PATH = './images/dice-';
const VICTORY_IMAGE_PATH = './images/winner-';

const imagemDado = document.getElementById('dado');
const imagemVitoria = document.getElementById('vitoria');

const jogador1 = document.getElementById('jogador--1');
const jogador2 = document.getElementById('jogador--2');

const botaoNovoJogo = document.getElementById('btn--novo-jogo');
const botaoRolarDado = document.getElementById('btn--rolar');
const botaoSegurarPontos = document.getElementById('btn--segurar');

const display = {
  pontosTotais: {
    jogador1: document.getElementById('placar--1'),
    jogador2: document.getElementById('placar--2'),
  },
  pontosDaRodada: {
    jogador1: document.getElementById('atual--1'),
    jogador2: document.getElementById('atual--2'),
  },
};

botaoRolarDado.addEventListener('click', rolarDado);

botaoSegurarPontos.addEventListener('click', segurarPontos);

botaoNovoJogo.addEventListener('click', resetaJogo);

function mostraImagemVitoria(num) {
  desativaBotoes();
  imagemVitoria.classList.add('visivel');
  imagemVitoria.classList.remove('escondido');
  imagemVitoria.setAttribute('src', `${VICTORY_IMAGE_PATH}${num}.png`);
}

function removeImagemVitoria() {
  imagemVitoria.classList.add('escondido');
  imagemVitoria.classList.remove('visivel');
}

function removeDadoDatela() {
  imagemDado.classList.add('escondido');
  imagemDado.classList.remove('visivel');
}

function mostraDado(num) {
  imagemDado.classList.add('visivel');
  imagemDado.classList.remove('escondido');
  imagemDado.setAttribute('src', `${DICE_IMAGE_PATH}${num}.png`);
}

function trocaJogador() {
  if (jogador1.classList.contains('jogador--ativo')) {
    display.pontosDaRodada.jogador1.textContent = 0;
    ativaJogadorDois();
  } else {
    display.pontosDaRodada.jogador2.textContent = 0;
    ativaJogadorUm();
  }
}

function ativaJogadorUm() {
  jogador1.classList.add('jogador--ativo');
  jogador2.classList.remove('jogador--ativo');
}

function ativaJogadorDois() {
  jogador2.classList.add('jogador--ativo');
  jogador1.classList.remove('jogador--ativo');
}

function desativaBotoes() {
  botaoSegurarPontos.classList.add('escondido');
  botaoRolarDado.classList.add('escondido');
}

function ativaBotoes() {
  botaoSegurarPontos.classList.remove('escondido');
  botaoRolarDado.classList.remove('escondido');
}

function resetaPontos() {
  display.pontosDaRodada.jogador1.textContent = 0;
  display.pontosDaRodada.jogador2.textContent = 0;
  display.pontosTotais.jogador1.textContent = 0;
  display.pontosTotais.jogador2.textContent = 0;
}

function resetaJogo() {
  ativaJogadorUm();
  ativaBotoes();
  removeImagemVitoria();
  removeDadoDatela();
  resetaPontos();
}
function gerarNumeroAleatorio(numMax) {
  return Math.trunc(Math.random() * numMax) + 1;
}

function rolarDado() {
  const numDado = gerarNumeroAleatorio(6);
  mostraDado(numDado);
  if (numDado === 1) {
    trocaJogador();
  } else {
    if (jogador1.classList.contains('jogador--ativo')) {
      const pontosAtuais = Number(display.pontosDaRodada.jogador1.textContent);
      display.pontosDaRodada.jogador1.textContent = pontosAtuais + numDado;
    } else {
      const pontosAtuais = Number(display.pontosDaRodada.jogador2.textContent);
      display.pontosDaRodada.jogador2.textContent = pontosAtuais + numDado;
    }
  }
}

function segurarPontos() {
  removeDadoDatela();
  if (jogador1.classList.contains('jogador--ativo')) {
    const pontosTotaisAtuais = Number(
      display.pontosTotais.jogador1.textContent
    );
    const pontosDaRodadaAtual = Number(
      display.pontosDaRodada.jogador1.textContent
    );
    display.pontosTotais.jogador1.textContent =
      pontosDaRodadaAtual + pontosTotaisAtuais;

    display.pontosDaRodada.jogador1.textContent = 0;

    if (pontosDaRodadaAtual + pontosTotaisAtuais >= 100) {
      mostraImagemVitoria(1);
    } else {
      trocaJogador();
    }
  } else {
    const pontosTotaisAtuais = Number(
      display.pontosTotais.jogador2.textContent
    );
    const pontosDaRodadaAtual = Number(
      display.pontosDaRodada.jogador2.textContent
    );
    display.pontosTotais.jogador2.textContent =
      pontosDaRodadaAtual + pontosTotaisAtuais;

    display.pontosDaRodada.jogador2.textContent = 0;

    if (pontosDaRodadaAtual + pontosTotaisAtuais >= 100) {
      mostraImagemVitoria(2);
    } else {
      trocaJogador();
    }
  }
}
