'use strict'

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

//atualizar display/tela
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto;
    }
}

//inserir numero 
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

//conferir se possui operacoes pendentes
const operacaoPendente = () => operador !== undefined;

//calculos: soma, subtracao, multiplicacao e divisao
const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'))
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}

//igual
const ativarIgual = () => {
    calcular();
    operador = undefined;
}

//limapr display
const limparDisplay = () => display.textContent = ''

//limpar todo calculo
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

//remove ultimo numero do display
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1)

//inverte sinal de + ou - ao ser clicado
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1)
}

//confere se possui alguma virgula no display
const existeDecimal = () => display.textContent.indexOf(',') !== -1; 

//confere se existe algo digitado no display
const existeValor = () => display.textContent.length > 0;

//insere a virgula
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(",");
        } else {
            atualizarDisplay("0,");
        }
    }
}

//pegando ids e ouvindo click
document.getElementById("igual").addEventListener('click', ativarIgual);
document.getElementById("limparDisplay").addEventListener('click', limparDisplay);
document.getElementById("limparCalculo").addEventListener('click', limparCalculo);
document.getElementById("backspace").addEventListener('click', removerUltimoNumero);
document.getElementById("inverter").addEventListener('click', inverterSinal);
document.getElementById("decimal").addEventListener('click', inserirDecimal);

//seleciona operador
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

//pegando click no teclado para aparecer no display
const mapaTeclado = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'decimal',
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};

document.addEventListener('keydown', mapearTeclado);