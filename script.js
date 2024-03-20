function guardarPuntaje() {
    const nombre = document.getElementById('nombre').value;
    const puntos = parseFloat(document.getElementById('puntos').value); // Convertir a número con decimales

    // Verifica que ambos campos no estén vacíos
    if (nombre.trim() === '' || isNaN(puntos)) {
        alert('Por favor ingrese un nombre y una cantidad de puntos válidos.');
        return;
    }

    // Obtiene los puntajes almacenados en localStorage
    let puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];

    // Agrega el nuevo puntaje
    puntajes.push({ nombre, puntos });

    // Ordena los puntajes por puntos (de mayor a menor)
    puntajes.sort((a, b) => b.puntos - a.puntos);

    // Limita la cantidad de puntajes almacenados a 10
    puntajes = puntajes.slice(0, 10);

    // Guarda los puntajes actualizados en localStorage
    localStorage.setItem('puntajes', JSON.stringify(puntajes));

    // Limpia los campos de entrada
    document.getElementById('nombre').value = '';
    document.getElementById('puntos').value = '';

    // Actualiza el ranking
    mostrarRanking();
}

function mostrarRanking() {
    const rankingBody = document.getElementById('rankingBody');
    rankingBody.innerHTML = '';

    // Obtiene los puntajes almacenados en localStorage
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];

    // Muestra los puntajes en la tabla
    puntajes.forEach((puntaje, index) => {
        const fila = `<tr>
                        <td>${index + 1}</td>
                        <td>${puntaje.nombre}</td>
                        <td>${puntaje.puntos.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
                     </tr>`;
        rankingBody.innerHTML += fila;
    });
}

function resetearRanking() {
    // Borra los puntajes almacenados en localStorage
    localStorage.removeItem('puntajes');
    
    // Actualiza la tabla para que refleje el cambio
    mostrarRanking();
}

// Llama a la función mostrarRanking al cargar la página de ranking
mostrarRanking();

// Llamar a la función mostrarRanking cada 10 segundos
setInterval(mostrarRanking, 10000);
