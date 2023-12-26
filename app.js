document.addEventListener('DOMContentLoaded', function () {
    const btnConvertirAFechaHorolog = document.getElementById('btnConvertirAFechaHorolog')
    const btnConvertirAFechaHumano = document.getElementById('btnConvertirAFechaHumano')
    const inputFechaConvertirHumano = document.getElementById('fechaConvertirHumano');
    const inputFechaConvertirHorolog = document.getElementById('fechaConvertirHorolog');
    const btnConvertirAHoraHorolog = document.getElementById('btnConvertirAHoraHorolog')
    const btnConvertirAHoraHumano = document.getElementById('btnConvertirAHoraHumano')
    const inputHoraConvertirHumano = document.getElementById('horaConvertirHumano');
    const inputHoraConvertirHorolog = document.getElementById('horaConvertirHorolog');
    

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

    btnConvertirAFechaHorolog.addEventListener('click', function fechaHumanoAHorolog() {
        
        // console.log("En fecha humano a horolog")
        
        const fechaHumano = inputFechaConvertirHumano.value;

        // Verificar que se haya ingresado una fecha
        if (fechaHumano) {
            // Crear un objeto de fecha a partir de la cadena ingresada
            const fechaObj = new Date(fechaHumano);

            const fechaConvertidaHorolog = Math.floor((fechaObj - new Date('1840-12-31').getTime()) / (24 * 60 * 60 * 1000)); 

            // Mostrar la fecha convertida en el campo correspondiente
            inputFechaConvertirHorolog.value = fechaConvertidaHorolog;
        } else {
            inputFechaConvertirHorolog.value = "";
            // Si no se ingresó una fecha, mostrar un mensaje de error o realizar alguna acción apropiada
            alert('Por favor, ingrese una fecha válida.');
        }
    })

    btnConvertirAFechaHumano.addEventListener('click', function fechaHorologAHumano() {
        
        // console.log("En fecha humano a horolog")
        
        const horologValue = inputFechaConvertirHorolog.value;

        // Verificar que se haya ingresado una fecha
        if (horologValue !== '' && !isNaN(horologValue)) {
            // Crear un objeto de fecha a partir de la cadena ingresada

            const horologNumber = parseInt(horologValue, 10);
            // console.log(horologNumber);

            const fechaObj = new Date((horologNumber - 47117) * 24 * 60 * 60 * 1000); // Ajuste horolog de InterSystems

            // Mostrar la fecha convertida en el campo correspondiente
            inputFechaConvertirHumano.value = fechaObj.toISOString().slice(0, 10);
        } else {
            inputFechaConvertirHumano.value = ""
            // Si no se ingresó una fecha, mostrar un mensaje de error o realizar alguna acción apropiada
            alert('Por favor, ingrese una fecha horolog válida.');
        }
    })

    btnConvertirAHoraHorolog.addEventListener('click', function horaHumanoAHorolog() {
        
        // console.log("En fecha humano a horolog")
        
        const horaHumano = inputHoraConvertirHumano.value;

        // Verificar que se haya ingresado una fecha
        if (horaHumano !== '') {

            console.log(horaHumano);
            
            // Crear un objeto de fecha a partir de la cadena ingresada
            const [horas, minutos, segundos] = horaHumano.split(':');

            const fechaBase = new Date('1841-01-01');
            fechaBase.setHours(parseInt(horas,10), parseInt(minutos,10), parseInt(segundos,10));
            console.log(fechaBase);
            const horaHorolog = (parseInt(horas, 10) * 60 * 60) + (parseInt(minutos, 10) * 60) + parseInt(segundos, 10);

            // Mostrar la fecha convertida en el campo correspondiente
            inputHoraConvertirHorolog.value = horaHorolog;
        } else {
            inputHoraConvertirHorolog.value = "";
            // Si no se ingresó una fecha, mostrar un mensaje de error o realizar alguna acción apropiada
            alert('Por favor, ingrese un valor válido en formato time.');
        }
    })


    btnConvertirAHoraHumano.addEventListener('click', function horaHorologAHumano() {
        
        const horologValue = inputHoraConvertirHorolog.value;

        // Verificar que se haya ingresado una fecha
        if (horologValue !== '' && !isNaN(horologValue)) {

            const horologNumber = parseInt(horologValue, 10);

            const horas = Math.floor(horologNumber / 3600);
            const minutos = Math.floor((horologNumber % 3600) / 60);
            const segundos = horologNumber % 60;

            const horaFormateada = `${agregarCeroDelante(horas)}:${agregarCeroDelante(minutos)}:${agregarCeroDelante(segundos)}`;

            // const horaFormateada = formatearHora12h(horas, minutos, segundos);

            // Mostrar la hora convertida en el campo correspondiente
            inputHoraConvertirHumano.value = horaFormateada;

        } else {
            inputHoraConvertirHumano.value = "";
            // Si no se ingresó una fecha, mostrar un mensaje de error o realizar alguna acción apropiada
            alert('Por favor, ingrese un valor válido en formato horolog.');
        }
    });

    // Función para agregar cero delante de números menores a 10
    function agregarCeroDelante(numero) {
        return numero < 10 ? `0${numero}` : numero;
    }

    function formatearHora12h(horas, minutos, segundos) {
        const ampm = horas >= 12 ? 'PM' : 'AM';
        const horas12h = horas % 12 || 12; // Convertir 0 a 12 en formato 12 horas
        return `${agregarCeroDelante(horas12h)}:${agregarCeroDelante(minutos)}:${agregarCeroDelante(segundos)} ${ampm}`;
    }

});
