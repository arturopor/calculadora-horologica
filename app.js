document.addEventListener('DOMContentLoaded', function () {
    function actualizarFechaYHora() {
        const fechaElemento = document.getElementById('fechaActualHumano');
        const horaElemento = document.getElementById('horaActualHumano');
        const fechaHorologElemento = document.getElementById('fechaActualHorolog');
        const horaHorologElemento = document.getElementById('horaActualHorolog');

        const ahora = new Date();

        // Configurar opciones de formato para la fecha
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', week: 'numeric' };
        const fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha);

        // Configurar opciones de formato para la hora
        const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const horaFormateada = ahora.toLocaleTimeString('es-ES', opcionesHora);
        
        // Obtener la fecha y hora en formato horolog de InterSystems
        const fechaHorolog = Math.floor((ahora.getTime() - new Date('1840-12-31').getTime()) / (24 * 60 * 60 * 1000)); // Ajuste horolog de InterSystems
        // const horaHorolog = Math.floor(ahora.getTime() / 1000) % (24 * 60 * 60);
        const horaHorolog = Math.floor((ahora.getTime() - new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()).getTime()) / 1000);

        fechaHorologElemento.textContent = `${fechaHorolog}`;
        horaHorologElemento.textContent = `${horaHorolog}`;

        // Actualizar los elementos en la página
        fechaElemento.textContent = `${fechaFormateada}`;
        horaElemento.textContent = `${horaFormateada}`;
    }

    // Actualizar cada segundo
    setInterval(actualizarFechaYHora, 1000);

    // Llamar a la función por primera vez para mostrar la fecha y la hora inicial
    actualizarFechaYHora();
});
