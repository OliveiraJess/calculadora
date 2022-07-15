'use strict'

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');



let novoNumero = true;
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto;
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'))
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

const limparDisplay = () => display.textContent = ''

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1)

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1)
}

const existeDecimal = () => display.textContent.indexOf(',') !== -1; 

const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(",");
        } else {
            atualizarDisplay("0,");
        }
    }
}

document.getElementById("igual").addEventListener('click', ativarIgual);
document.getElementById("limparDisplay").addEventListener('click', limparDisplay);
document.getElementById("limparCalculo").addEventListener('click', limparCalculo);
document.getElementById("backspace").addEventListener('click', removerUltimoNumero);
document.getElementById("inverter").addEventListener('click', inverterSinal);
document.getElementById("decimal").addEventListener('click', inserirDecimal);

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}


operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));