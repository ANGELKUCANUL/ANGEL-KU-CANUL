document.getElementById('generar').addEventListener('click', function() {
    const primerosNombres = ['Juan', 'Ana', 'Pedro', 'María', 'Luis', 'Lucía'];
    const segundosNombres = ['García', 'Rodríguez', 'López', 'Martínez', 'Hernández', 'González'];

    const nombreAleatorio = primerosNombres[Math.floor(Math.random() * primerosNombres.length)];
    const apellidoAleatorio = segundosNombres[Math.floor(Math.random() * segundosNombres.length)];

    const nombreCompleto = `${nombreAleatorio} ${apellidoAleatorio}`;
    document.getElementById('nombre').innerText = nombreCompleto;
});
