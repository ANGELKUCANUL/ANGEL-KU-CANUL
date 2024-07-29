     // Ejercicio 1
     function filtrarMayoresDeEdad(personas) {
        return personas.filter(persona => persona.edad >= 18);
    }

    function ejecutarEjercicio1() {
        const input = document.getElementById('input-ejercicio-1').value;
        try {
            const personas = input.split('\n').map(linea => {
                const [nombre, edad] = linea.split(',');
                return { nombre: nombre.trim(), edad: parseInt(edad.trim()) };
            });
            const resultado = filtrarMayoresDeEdad(personas);
            const textoResultado = resultado.map(p => `${p.nombre} (${p.edad} años)`).join('\n');
            document.getElementById('resultado-ejercicio-1').textContent = textoResultado || 'No hay resultados.';
        } catch (error) {
            document.getElementById('resultado-ejercicio-1').textContent = `Error: ${error.message}`;
        }
    }

    // Ejercicio 2
    function transformarYFiltrar(numeros) {
        return numeros.map(num => num * num).filter(cuadrado => cuadrado > 20);
    }

    function ejecutarEjercicio2() {
        const input = document.getElementById('input-ejercicio-2').value;
        const numeros = input.split(',').map(num => parseInt(num.trim()));
        const resultado = transformarYFiltrar(numeros);
        const textoResultado = resultado.join(', ');
        document.getElementById('resultado-ejercicio-2').textContent = textoResultado || 'No hay resultados.';
    }

    // Ejercicio 3
    async function obtenerUsuarios() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            const usuarios = await response.json();
            let tablaHTML = '<table><thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Teléfono</th></tr></thead><tbody>';
            usuarios.forEach(usuario => {
                tablaHTML += `<tr><td>${usuario.id}</td><td>${usuario.name}</td><td>${usuario.email}</td><td>${usuario.phone}</td></tr>`;
            });
            tablaHTML += '</tbody></table>';
            document.getElementById('resultado-ejercicio-3').innerHTML = tablaHTML;
        } catch (error) {
            document.getElementById('resultado-ejercicio-3').textContent = `Error: ${error.message}`;
        }
    }

    // Ejercicio 4
    function agregarElemento() {
        const ul = document.getElementById('lista');
        const li = document.createElement('li');
        li.textContent = 'Nuevo ítem';
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => ul.removeChild(li);
        
        li.appendChild(btnEliminar);
        ul.appendChild(li);
    }

    // Ejercicio 5
    function ordenarPorPropiedad(arr, propiedad) {
        return arr.slice().sort((a, b) => (a[propiedad] > b[propiedad]) ? 1 : -1);
    }

    function ejecutarEjercicio5(propiedad) {
        const input = document.getElementById('input-ejercicio-5').value;
        try {
            const objetos = input.split('\n').map(linea => {
                const [nombre, edad] = linea.split(',');
                return { nombre: nombre.trim(), edad: parseInt(edad.trim()) };
            });
            const resultado = ordenarPorPropiedad(objetos, propiedad);
            const textoResultado = resultado.map(o => `${o.nombre} (${o.edad} años)`).join('\n');
            document.getElementById('resultado-ejercicio-5').textContent = textoResultado || 'No hay resultados.';
        } catch (error) {
            document.getElementById('resultado-ejercicio-5').textContent = `Error: ${error.message}`;
        }
    }