'use strict';

// ----- elementos
const mostrador_pomo = document.getElementById('mostrador_time');
const titulo_pomo = document.getElementById('titulo_mostrador');
const btn_acao = document.getElementById('btn_acao');
//
let timeInterval;
let _pomofoco = {
  seg: 0,
  min: 25
};

let _pomopausa = {
  seg: 0,
  min: 0
};

onload = function () {
  mostrador_pomo.textContent = 'teste';

  btn_acao.addEventListener('click', iniciarPom);
};

function iniciarPom() {
  timeInterval = setInterval(timerExibe(_pomofoco), 1000);
}

function timerExibe(_pomo_mostrador) {
  decrementaTimer(_pomo_mostrador);
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
