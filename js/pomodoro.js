'use strict';

// ----- elementos
const mostrador_pomo = document.getElementById('mostrador_time');
const titulo_pomo = document.getElementById('titulo_mostrador');
const btn_acao = document.getElementById('btn_acao');
//
// let _pomodoro_app = JSON.parse(localStorage.getItem('configPomo'));

let timeInterval;
let _pomodoro = {
  _pomofoco: {
    seg: 0,
    min: localStorage.getItem('configPomo')
      ? JSON.parse(localStorage.getItem('configPomo')).temp_foco
      : 25,
    active: false
  },
  _pomopausa: {
    seg: 0,
    min: localStorage.getItem('configPomo')
      ? JSON.parse(localStorage.getItem('configPomo')).temp_pausa
      : 5,
    active: false
  },
  _pomosessoes: localStorage.getItem('configPomo')
    ? JSON.parse(localStorage.getItem('configPomo')).temp_sessoes
    : 25
};

// ----------------
onload = function () {
  // timer inicial ao carregar a pagina
  setFocoModo();
};

function setFocoModo() {
  setColors('foco');
  renderizaTimerTela(_pomodoro._pomofoco);
  btn_acao.addEventListener('click', iniciarFocoPomodoro);
}

function setPausaModo() {
  setColors('pausa');
  renderizaTimerTela(_pomodoro._pomopausa);
  btn_acao.addEventListener('click', iniciarPausaPomodoro);
}

// ------------

function iniciarFocoPomodoro() {
  if (!_pomodoro._pomofoco.active) {
    _pomofoco.active = true;
    timeInterval = setInterval(timerExibe(_pomofoco), 1000);
  }
}

function iniciarPausaPomodoro() {
  if (!_pomodoro._pomopausa.active) {
    _pomopausa.active = true;
    timeInterval = setInterval(timerExibe(_pomopausa), 1000);
  }
}

function timerExibe(_pomo_mostrador) {
  return function () {
    decrementaTimer(_pomo_mostrador);
    renderizaTimerTela(_pomo_mostrador);
    if (_pomo_mostrador.seg === 0 && _pomo_mostrador.min === 0) {
      clearInterval(timeInterval);
    }
  };
}

function renderizaTimerTela(_pomo_mostrador) {
  mostrador_pomo.textContent =
    (_pomo_mostrador.min >= 10
      ? _pomo_mostrador.min
      : '0' + _pomo_mostrador.min) +
    ':' +
    (_pomo_mostrador.seg >= 10
      ? _pomo_mostrador.seg
      : '0' + _pomo_mostrador.seg);
}

function decrementaTimer(_pomo_mostrador) {
  if (_pomo_mostrador.seg == 0) {
    _pomo_mostrador.seg = 59;
    _pomo_mostrador.min--;
  } else _pomo_mostrador.seg--;
}

//------- funcoes de apoio

function setColors(tipo) {
  if (tipo === 'foco') {
    document
      .querySelector('.mostrador-content')
      .classList.remove('mostrador-color-yellow');
    document
      .querySelector('.mostrador-content')
      .classList.add('mostrador-color-green');
  } else {
    document
      .querySelector('.mostrador-content')
      .classList.remove('mostrador-color-green');
    document
      .querySelector('.mostrador-content')
      .classList.add('mostrador-color-yellow');
  }
}
