'use strict';

//  CONFIGURAÇÕES
// ------
let _pomodoro_app = {
  temp_foco: 25,
  temp_pausa: 5,
  temp_sessoes: 3
};

//
const incremento_foco = 5;
const limite_minutos_foco = 60;
const incremento_pausa = 1;
const limite_minutos_pausa = 60;
const incremento_sessoes = 1;
const limite_sessoes = 10;
// --------

let campo_mostrador_foco = document.getElementById('tempo_foco');
let campo_mostrador_pausa = document.getElementById('tempo_pausa');
let campo_mostrador_sessoes = document.getElementById('tempo_sessao');
let btn_continuar = document.getElementById('btnContinuar');

onload = function () {
  campo_mostrador_foco.value = _pomodoro_app.temp_foco;
  campo_mostrador_pausa.value = _pomodoro_app.temp_pausa;
  campo_mostrador_sessoes.value = _pomodoro_app.temp_sessoes;

  btn_continuar.addEventListener('click', salvarDados);
};

function incrementPom(elem) {
  const elementoPai = elem.parentNode.parentNode;
  const elementoTemporizador = elementoPai.children[1].children[0];
  if (elementoTemporizador.id === campo_mostrador_foco.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento < limite_minutos_foco) {
      elementoTemporizador.value = valueDoElemento + incremento_foco;
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
  if (elementoTemporizador.id === campo_mostrador_foco.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento > 5) {
      elementoTemporizador.value = valueDoElemento - incremento_foco;
    }
  } else if (elementoTemporizador.id === campo_mostrador_pausa.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento > 0) {
      elementoTemporizador.value = valueDoElemento - incremento_pausa;
    }
  } else if (elementoTemporizador.id === campo_mostrador_sessoes.id) {
    const valueDoElemento = parseInt(elementoTemporizador.value);
    if (valueDoElemento > 1) {
      elementoTemporizador.value = valueDoElemento - incremento_sessoes;
    }
  }
}

campo_mostrador_foco.onchange = function () {
  if (parseInt(campo_mostrador_foco.value) > limite_minutos_foco) {
    campo_mostrador_foco.value = limite_minutos_foco;
  }
  if (parseInt(campo_mostrador_foco.value) < 0) {
    campo_mostrador_foco.value = _pomodoro_app.temp_foco;
  }
};

campo_mostrador_pausa.onchange = function () {
  if (parseInt(campo_mostrador_pausa.value) > limite_minutos_pausa) {
    campo_mostrador_pausa.value = limite_minutos_pausa;
  }
  if (parseInt(campo_mostrador_pausa.value) < 0) {
    campo_mostrador_pausa.value = _pomodoro_app.temp_pausa;
  }
};

campo_mostrador_sessoes.onchange = function () {
  if (parseInt(campo_mostrador_sessoes.value) > limite_sessoes) {
    campo_mostrador_sessoes.value = limite_sessoes;
  }
  if (parseInt(campo_mostrador_sessoes.value) < 1) {
    campo_mostrador_sessoes.value = _pomodoro_app.temp_sessoes;
  }
};

function salvarDados() {
  _pomodoro_app.temp_foco = campo_mostrador_foco.value;
  _pomodoro_app.temp_pausa = campo_mostrador_pausa.value;
  _pomodoro_app.temp_sessoes = campo_mostrador_sessoes.value;
  localStorage.setItem('configPomo', JSON.stringify(_pomodoro_app));
}
