// =============================================
// CLASE 1: BASE DEL DASHBOARD + MÓDULO DE TAREAS
// =============================================

// 1. ARRAYS Y OBJETOS EN JAVASCRIPT
// Array para almacenar nuestras tareas
let tareas = [];

// 2. LOCALSTORAGE BÁSICO
// Función para guardar tareas en localStorage
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    console.log('Tareas guardadas:', tareas);
}

// Función para cargar tareas desde localStorage
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        console.log('Tareas cargadas:', tareas);
    }
}

// 3. FUNCIONES BÁSICAS - AGREGAR TAREA
function agregarTarea(titulo) {
    // Crear un objeto para la nueva tarea
    const nuevaTarea = {
        id: Date.now(), // ID único basado en timestamp
        titulo: titulo,
        completada: false,
        fechaCreacion: new Date().toISOString()
    };
    
    // Agregar la tarea al array
    tareas.push(nuevaTarea);
    
    // Guardar en localStorage
    guardarTareas();
    
    // Actualizar la interfaz
    renderizarTareas();
    
    console.log('Tarea agregada:', nuevaTarea);
}

// 4. RENDERIZAR TAREAS EN EL HTML
function renderizarTareas() {
    const container = document.getElementById('tareas-container');
    
    if (tareas.length === 0) {
        container.innerHTML = `
            <div class="tarea-vacia">
                <p>No hay tareas aún. ¡Agrega tu primera tarea!</p>
            </div>
        `;
        return;
    }
    
    // Crear HTML para cada tarea
    const tareasHTML = tareas.map(tarea => `
        <div class="tarea-item" data-id="${tarea.id}">
            <input type="checkbox" class="tarea-checkbox">
            <span class="tarea-texto">${tarea.titulo}</span>
        </div>
    `).join('');
    
    container.innerHTML = tareasHTML;
}

// 5. MANEJO DEL MODAL
function abrirModalTarea() {
    const modal = document.getElementById('modalTarea');
    modal.style.display = 'block';
    
    // Limpiar el input
    document.getElementById('tituloTarea').value = '';
    
    // Enfocar el input
    document.getElementById('tituloTarea').focus();
}

function cerrarModalTarea() {
    const modal = document.getElementById('modalTarea');
    modal.style.display = 'none';
}

// 6. MANEJO DEL FORMULARIO
function manejarSubmitTarea(event) {
    event.preventDefault(); // Prevenir envío del formulario
    
    const inputTitulo = document.getElementById('tituloTarea');
    const titulo = inputTitulo.value.trim();
    
    if (titulo === '') {
        alert('Por favor, ingresa un título para la tarea');
        return;
    }
    
    // Agregar la tarea
    agregarTarea(titulo);
    
    // Cerrar el modal
    cerrarModalTarea();
    
    // Mostrar mensaje de éxito
    alert('¡Tarea agregada correctamente!');
}

// 7. INICIALIZACIÓN DE LA APLICACIÓN
function inicializarApp() {
    console.log('Inicializando dashboard...');
    
    // Cargar tareas guardadas
    cargarTareas();
    
    // Renderizar tareas existentes
    renderizarTareas();
    
    // 8. EVENT LISTENERS - INTERACTIVIDAD BÁSICA
    
    // Botón para abrir modal
    document.getElementById('abrirModalTarea').addEventListener('click', abrirModalTarea);
    
    // Botón para cerrar modal
    document.getElementById('cerrarModalTarea').addEventListener('click', cerrarModalTarea);
    
    // Botón cancelar
    document.getElementById('cancelarTarea').addEventListener('click', cerrarModalTarea);
    
    // Formulario de tarea
    document.getElementById('formTarea').addEventListener('submit', manejarSubmitTarea);
    
    // Cerrar modal haciendo click fuera
    document.getElementById('modalTarea').addEventListener('click', function(event) {
        if (event.target === this) {
            cerrarModalTarea();
        }
    });
    
    console.log('Aplicación inicializada correctamente');
}

// 9. EJECUCIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', inicializarApp);