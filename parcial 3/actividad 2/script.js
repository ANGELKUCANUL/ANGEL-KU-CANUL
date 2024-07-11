function verificarEdad() {
    while (true) {
        let edad = prompt("Por favor, introduce tu edad:");
        if (edad === null) {
            break;
        }
        edad = parseInt(edad);
        if (isNaN(edad)) {
            alert("Por favor, introduce un número válido.");
        } else {
            if (edad >= 18) {
                alert("Ya puedes conducir.");
            } else {
                alert("Aún no puedes conducir.");
            }
            break;
        }
    }
}

function mostrarCalificacion() {
    while (true) {
        let nota = prompt("Por favor, introduce una nota:");
        if (nota === null) {
            break;
        }
        nota = parseFloat(nota);
        if (isNaN(nota) || nota < 0 || nota > 10) {
            alert("Por favor, introduce una nota válida entre 0 y 10.");
        } else {
            let calificacion;
            if (nota < 3) {
                calificacion = "Muy deficiente";
            } else if (nota < 5) {
                calificacion = "Insuficiente";
            } else if (nota < 6) {
                calificacion = "Suficiente";
            } else if (nota < 7) {
                calificacion = "Bien";
            } else if (nota < 9) {
                calificacion = "Notable";
            } else {
                calificacion = "Sobresaliente";
            }
            alert("Calificación: " + calificacion);
            break;
        }
    }
}

function concatenarCadenas() {
    let resultado = "";
    while (true) {
        let cadena = prompt("Introduce una cadena de texto (o pulsa cancelar para finalizar):");
        if (cadena === null) {
            break;
        }
        if (resultado === "") {
            resultado = cadena;
        } else {
            resultado += "-" + cadena;
        }
    }
    alert("Cadenas concatenadas: " + resultado);
}

function calcularLetraDNI() {
    const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    while (true) {
        let numero = prompt("Introduce un número de DNI (entre 0 y 99999999) o pulsa cancelar para finalizar:");
        if (numero === null) {
            break;
        }
        numero = parseInt(numero);
        if (isNaN(numero) || numero < 0 || numero > 99999999) {
            alert("Por favor, introduce un número válido entre 0 y 99999999.");
        } else {
            let letra = letras[numero % 23];
            alert("La letra de tu DNI es: " + letra);
        }
    }
}
