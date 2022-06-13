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
  if (_pomodoro._pomosessoes > 0) {
    if (!_pomodoro._pomofoco.active) {
      _pomodoro._pomofoco.active = true;
      _pomodoro._pomopausa.active = false;
      // serializando e deserializando o _pomodoro._pomofoco para passar apenas o valor, e nao alterar o objeto em si
      timeInterval = setInterval(
        timerExibe(JSON.parse(JSON.stringify(_pomodoro._pomofoco)), 'foco'),
        100
      );
    }
  } else {
    alert('sessoes encerradas!');
  }
}

function iniciarPausaPomodoro() {
  if (!_pomodoro._pomopausa.active) {
    _pomodoro._pomopausa.active = true;
    _pomodoro._pomofoco.active = false;
    _pomodoro._pomosessoes -= 1;
    timeInterval = setInterval(
      timerExibe(JSON.parse(JSON.stringify(_pomodoro._pomopausa)), 'pausa'),
      100
    );
  }
}

function timerExibe(_pomo_mostrador, tipo) {
  return function () {
    decrementaTimer(_pomo_mostrador);
    renderizaTimerTela(_pomo_mostrador);
    if (_pomo_mostrador.seg === 0 && _pomo_mostrador.min === 0) {
      clearInterval(timeInterval);
      if (tipo === 'foco') {
        setPausaModo();
      } else {
        setFocoModo();
      }
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
  console.log(_pomo_mostrador);
}

//------- funcoes de apoio

function setColors(tipo) {
  const titulo_mostrador = document.getElementById('titulo_mostrador');
  const mostrador_content = document.querySelector('.mostrador-content');
  if (tipo === 'foco') {
    titulo_mostrador.classList.remove('pausaactive');
    titulo_mostrador.classList.add('focoactive');
    titulo_mostrador.textContent = 'Foco';
    mostrador_content.classList.remove('mostrador-color-yellow');
    mostrador_content.classList.add('mostrador-color-green');
  } else {
    titulo_mostrador.classList.remove('focoactive');
    titulo_mostrador.classList.add('pausaactive');
    titulo_mostrador.textContent = 'Pausa';
    mostrador_content.classList.remove('mostrador-color-green');
    mostrador_content.classList.add('mostrador-color-yellow');
  }
}
