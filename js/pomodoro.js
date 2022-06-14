'use strict';

// ----- elementos
const mostrador_pomo = document.getElementById('mostrador_time');
const titulo_pomo = document.getElementById('titulo_mostrador');
const sessoes_pomo = document.getElementById('sessoes_pomo');
const btn_acao = document.getElementById('btn_acao');
//
// let _pomodoro_app = JSON.parse(localStorage.getItem('configPomo'));

let timeInterval;
let _pomodoro = {
  _pomofoco: {
    seg: 0,
    min: localStorage.getItem('configPomo')
      ? parseInt(JSON.parse(localStorage.getItem('configPomo')).temp_foco)
      : 25,
    active: false
  },
  _pomopausa: {
    seg: 0,
    min: localStorage.getItem('configPomo')
      ? parseInt(JSON.parse(localStorage.getItem('configPomo')).temp_pausa)
      : 5,
    active: false
  },
  _pomosessoes: {
    qnt_sessoes: localStorage.getItem('configPomo')
      ? parseInt(JSON.parse(localStorage.getItem('configPomo')).temp_sessoes)
      : 3,
    _sessoes_ativas: localStorage.getItem('configPomo')
      ? parseInt(JSON.parse(localStorage.getItem('configPomo')).temp_sessoes)
      : 3,
    _sessoes: gerarSessoes
  }
};

// ----------------
onload = function () {
  // timer inicial ao carregar a pagina
  setFocoModo();
};

function setFocoModo() {
  setColors('foco');
  renderizaTimerTela(_pomodoro._pomofoco);
  btn_acao.removeEventListener('click', iniciarPausaPomodoro);
  btn_acao.addEventListener('click', iniciarFocoPomodoro);
}

function setPausaModo() {
  setColors('pausa');
  renderizaTimerTela(_pomodoro._pomopausa);
  btn_acao.removeEventListener('click', iniciarFocoPomodoro);
  btn_acao.addEventListener('click', iniciarPausaPomodoro);
}

// ------------

function iniciarFocoPomodoro() {
  if (_pomodoro._pomosessoes._sessoes_ativas > 0) {
    if (!_pomodoro._pomofoco.active) {
      _pomodoro._pomofoco.active = true;
      // _pomodoro._pomopausa.active = false;
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
    // _pomodoro._pomofoco.active = false;
    timeInterval = setInterval(
      timerExibe(JSON.parse(JSON.stringify(_pomodoro._pomopausa)), 'pausa'),
      100
    );
  }
}

function timerExibe(_pomo_mostrador, tipo) {
  return function () {
    renderizaTimerTela(_pomo_mostrador);
    if (_pomo_mostrador.seg === 0 && _pomo_mostrador.min === 0) {
      clearInterval(timeInterval);
      if (tipo === 'foco') {
        _pomodoro._pomofoco.active = false;
        setPausaModo();
      } else if (tipo === 'pausa') {
        _pomodoro._pomopausa.active = false;
        _pomodoro._pomosessoes._sessoes_ativas -= 1;
        setFocoModo();
      }
    }
    decrementaTimer(_pomo_mostrador);
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
  const titulo_mostrador = document.getElementById('titulo_mostrador');
  const mostrador_content = document.querySelector('.mostrador-content');
  if (tipo === 'foco') {
    titulo_mostrador.classList.remove('pausaactive');
    titulo_mostrador.classList.add('focoactive');
    titulo_mostrador.textContent = 'Foco';
    mostrador_content.classList.remove('mostrador-color-yellow');
    mostrador_content.classList.add('mostrador-color-green');
    contadorSessoes(tipo);
  } else {
    titulo_mostrador.classList.remove('focoactive');
    titulo_mostrador.classList.add('pausaactive');
    titulo_mostrador.textContent = 'Pausa';
    mostrador_content.classList.remove('mostrador-color-green');
    mostrador_content.classList.add('mostrador-color-yellow');
    contadorSessoes(tipo);
  }
}

function contadorSessoes(tipo) {
  sessoes_pomo.innerHTML = '';
  const _sessoes_pomo = _pomodoro._pomosessoes._sessoes();
  for (let index = 0; index < _sessoes_pomo.length; index++) {
    if (_sessoes_pomo[index].sessao_ativa) {
      if (tipo === 'foco') {
        _sessoes_pomo[index].sessao_item.classList.remove('activepausa');
        _sessoes_pomo[index].sessao_item.classList.add('activefoco');
      } else {
        _sessoes_pomo[index].sessao_item.classList.remove('activefoco');
        _sessoes_pomo[index].sessao_item.classList.add('activepausa');
      }
    }
    sessoes_pomo.appendChild(_sessoes_pomo[index].sessao_item);
  }
}

function gerarSessoes() {
  let _sessoes_pomo = [];
  for (let index = 0; index < _pomodoro._pomosessoes.qnt_sessoes; index++) {
    const spn_sessao = document.createElement('span');
    _sessoes_pomo.push({
      sessao_item: spn_sessao,
      sessao_ativa: false
    });
  }
  for (let index = 0; index < _pomodoro._pomosessoes._sessoes_ativas; index++) {
    _sessoes_pomo[index].sessao_ativa = true;
  }
  return _sessoes_pomo;
}
