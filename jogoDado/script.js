'use strict';

const jogador1 = {
  ativo: document.querySelector('.jogador--0'),
  atual: document.querySelector('#atual--0'),
  ptsAtuais: 0,
  total: document.querySelector('#placar--0'),
  ptsTotais: 0,
};

const jogador2 = {
  ativo: document.querySelector('.jogador--1'),
  atual: document.querySelector('#atual--1'),
  ptsAtuais: 0,
  total: document.querySelector('#placar--1'),
  ptsTotais: 0,
};

const dados = document.querySelectorAll('.dado');

// tira os dados da tela
function removeDados() {
  for (let i = 0; i < dados.length; i++) {
    dados[i].classList.add('escondido');
  }
}

// mostra a face do dado de acordo com o numero recebido
function mostraDado(num) {
  if (num === 1) {
    removeDados();
    dados[num - 1].classList.remove('escondido');
  } else if (num === 2) {
    removeDados();
    dados[num - 1].classList.remove('escondido');
  } else if (num === 3) {
    removeDados();
    dados[num - 1].classList.remove('escondido');
  } else if (num === 4) {
    removeDados();
    dados[num - 1].classList.remove('escondido');
  } else if (num === 5) {
    removeDados();
    dados[num - 1].classList.remove('escondido');
  } else {
    removeDados();
    dados[num - 1].classList.remove('escondido');
  }
}
// passa a vez para o outro jogador
function trocaJogador() {
  if (jogador1.ativo.classList.contains('jogador--ativo')) {
    document.querySelector('.jogador--1').classList.add('jogador--ativo');
    document.querySelector('.jogador--0').classList.remove('jogador--ativo');
  } else {
    document.querySelector('.jogador--0').classList.add('jogador--ativo');
    document.querySelector('.jogador--1').classList.remove('jogador--ativo');
  }
}

function removeBotoes() {
  document.querySelector('.btn--rolar').classList.add('escondido');
  document.querySelector('.btn--segurar').classList.add('escondido');
}

function ativaBotoes() {
  document.querySelector('.btn--rolar').classList.remove('escondido');
  document.querySelector('.btn--segurar').classList.remove('escondido');
}

// zera os pontos totais do jogador selecionado
function zeraPontosTotais(jogador) {
  jogador.ptsAtuais = 0;
  jogador.ptsTotais = 0;
  jogador.atual.textContent = jogador.ptsAtuais;
  jogador.total.textContent = jogador.ptsTotais;
}
// salva os pontos da rodada do jogador nos seus pontos totais
function salvaPontos(jogador) {
  jogador.ptsTotais += jogador.ptsAtuais;
  jogador.total.textContent = jogador.ptsTotais;
  jogador.ptsAtuais = 0;
  jogador.atual.textContent = jogador.ptsAtuais;
}

// zera tudo e recomeça o jogo
function resetaJogo() {
  zeraPontosTotais(jogador1);
  zeraPontosTotais(jogador2);
  document.querySelector('.jogador--0').classList.add('jogador--ativo');
  document.querySelector('.jogador--1').classList.remove('jogador--ativo');
  ativaBotoes();
  removeDados();
  document.querySelector('.vit-1').classList.add('escondido');
  document.querySelector('.vit-2').classList.add('escondido');
}

// adiciona pontos do giro ao jogador selecionado
function adicionaPontosAtuais(jogador, numPontos) {
  jogador.ptsAtuais += numPontos;
  jogador.atual.textContent = jogador.ptsAtuais;
}

// zera os pontos da rodada do jogador selecionado
function zeraPontosAtuais(jogador) {
  jogador.ptsAtuais = 0;
  jogador.atual.textContent = jogador.ptsAtuais;
}

// rola o dado e se o resultado for diferente de zero adiciona aos pontos da rodada do jogador selecionado, caso contrario zera os pontos da rodada e passa a vez para o outro jogador
document.querySelector('.btn--rolar').addEventListener('click', function () {
  const num = Math.trunc(Math.random() * 6) + 1;
  if (num === 1) {
    mostraDado(num);
    if (jogador1.ativo.classList.contains('jogador--ativo')) {
      trocaJogador();
      zeraPontosAtuais(jogador1);
    } else {
      trocaJogador();
      zeraPontosAtuais(jogador2);
    }
  } else {
    mostraDado(num);
    if (jogador1.ativo.classList.contains('jogador--ativo')) {
      adicionaPontosAtuais(jogador1, num);
    } else {
      adicionaPontosAtuais(jogador2, num);
    }
  }
});

// guarda os pontos da rodada nos pontos totais e checa se esses passam de 100, se sim o jogador vence, caso contrario a vez vaz para o outro jogador
document.querySelector('.btn--segurar').addEventListener('click', function () {
  if (jogador1.ativo.classList.contains('jogador--ativo')) {
    salvaPontos(jogador1);
    if (jogador1.ptsTotais >= 100) {
      removeDados();
      document.querySelector('.vit-1').classList.remove('escondido');
      removeBotoes();
    } else {
      trocaJogador();
    }
  } else {
    salvaPontos(jogador2);
    if (jogador2.ptsTotais >= 100) {
      removeDados();
      document.querySelector('.vit-2').classList.remove('escondido');
      removeBotoes();
    } else {
      trocaJogador();
    }
  }
});

// inicia um novo jogo
document
  .querySelector('.btn--novo-jogo')
  .addEventListener('click', function () {
    resetaJogo();
  });
