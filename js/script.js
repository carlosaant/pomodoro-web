'use strict';

//  CONFIGURAÇÕES
// ------
let temp_trabalho = 25;
let temp_pausa = 5;
let temp_sessoes = 3;
//
const incremento_trabalho = 5;
const limite_minutos_trabalho = 60;
const incremento_pausa = 1;
const limite_minutos_pausa = 60;
const incremento_sessoes = 1;
const limite_sessoes = 10;
// --------

let campo_mostrador_trabalho = document.getElementById('tempo_trabalho');
let campo_mostrador_pausa = document.getElementById('tempo_pausa');
let campo_mostrador_sessoes = document.getElementById('tempo_sessao');

onload = function () {
  campo_mostrador_trabalho.value = temp_trabalho;
  campo_mostrador_pausa.value = temp_pausa;
  campo_mostrador_sessoes.value = temp_sessoes;
};

function incrementPom(elem) {
  const elementoPai = elem.parentNode.parentNode;
  const elementoTemporizador = elementoPai.children[1].children[0];
  if (elementoTemporizador.id === campo_mostrador_trabalho.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento < limite_minutos_trabalho) {
      elementoTemporizador.value = valueDoElemento + incremento_trabalho;
    }
  } else if (elementoTemporizador.id === campo_mostrador_pausa.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento < limite_minutos_pausa) {
      elementoTemporizador.value = valueDoElemento + incremento_pausa;
    }
  } else if (elementoTemporizador.id === campo_mostrador_sessoes.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento < limite_sessoes) {
      elementoTemporizador.value = valueDoElemento + incremento_sessoes;
    }
  }
}

function decrementPom(elem) {
  const elementoPai = elem.parentNode.parentNode;
  const elementoTemporizador = elementoPai.children[1].children[0];
  if (elementoTemporizador.id === campo_mostrador_trabalho.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento > 5) {
      elementoTemporizador.value = valueDoElemento - incremento_trabalho;
    }
  } else if (elementoTemporizador.id === campo_mostrador_pausa.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento > 0) {
      elementoTemporizador.value = valueDoElemento - incremento_pausa;
    }
  } else if (elementoTemporizador.id === campo_mostrador_sessoes.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento > 0) {
      elementoTemporizador.value = valueDoElemento - incremento_sessoes;
    }
  }
}

campo_mostrador_trabalho.onchange = function () {
  if (parseInt(campo_mostrador_trabalho.value) > limite_minutos_trabalho) {
    campo_mostrador_trabalho.value = limite_minutos_trabalho;
  }
  if (parseInt(campo_mostrador_trabalho.value) < 0) {
    campo_mostrador_trabalho.value = temp_trabalho;
  }
};

campo_mostrador_pausa.onchange = function () {
  if (parseInt(campo_mostrador_pausa.value) > limite_minutos_pausa) {
    campo_mostrador_pausa.value = limite_minutos_pausa;
  }
  if (parseInt(campo_mostrador_pausa.value) < 0) {
    campo_mostrador_pausa.value = temp_pausa;
  }
};

campo_mostrador_sessoes.onchange = function () {
  if (parseInt(campo_mostrador_sessoes.value) > limite_sessoes) {
    campo_mostrador_sessoes.value = limite_sessoes;
  }
  if (parseInt(campo_mostrador_sessoes.value) < 0) {
    campo_mostrador_sessoes.value = temp_sessoes;
  }
};
