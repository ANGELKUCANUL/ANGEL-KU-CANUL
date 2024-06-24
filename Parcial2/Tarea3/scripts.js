function invertirCadena() {
    const cadena = document.getElementById('cadenaInput').value;
    const resultado = cadena.split('').reverse().join('');
    document.getElementById('cadenaResult').innerText = 'Resultado: ' + resultado;
}

function esNumeroPrimo() {
    const numero = parseInt(document.getElementById('numeroInput').value);
    let esPrimo = true;
    if (numero <= 1) esPrimo = false;
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) esPrimo = false;
    }
    document.getElementById('numeroResult').innerText = 'Resultado: ' + (esPrimo ? 'Es primo' : 'No es primo');
}

function eliminarDuplicados() {
    const arreglo = document.getElementById('arregloInput').value.split(',').map(Number);
    const resultado = [...new Set(arreglo)];
    document.getElementById('arregloResult').innerText = 'Resultado: ' + resultado.join(', ');
}

function factorial() {
    const numero = parseInt(document.getElementById('factorialInput').value);
    let resultado = 1;
    for (let i = 2; i <= numero; i++) {
        resultado *= i;
    }
    document.getElementById('factorialResult').innerText = 'Resultado: ' + resultado;
}

function contarVocales() {
    const cadena = document.getElementById('vocalesInput').value;
    const vocales = 'aeiouAEIOU';
    let contador = 0;
    for (let char of cadena) {
        if (vocales.includes(char)) {
            contador++;
        }
    }
    document.getElementById('vocalesResult').innerText = 'Resultado: ' + contador;
}

function sumarNumeros() {
    const arreglo = document.getElementById('sumaInput').value.split(',').map(Number);
    const suma = arreglo.reduce((acc, num) => acc + num, 0);
    document.getElementById('sumaResult').innerText = 'Resultado: ' + suma;
}

function encontrarMaximo() {
    const arreglo = document.getElementById('maximoInput').value.split(',').map(Number);
    const maximo = Math.max(...arreglo);
    document.getElementById('maximoResult').innerText = 'Resultado: ' + maximo;
}
