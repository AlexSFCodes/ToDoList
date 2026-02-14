import store from '../../store/store';

/**
 * Configura los event listeners para agregar tareas
 */
export const setupAddTodoListeners = () => {
    const enterToDo = document.querySelector("#añadirTarea");
    const botonEnter = document.querySelector(".add-task-button");
    
    if (!enterToDo || !botonEnter) return;
    
    const agregarTodo = () => {
        if (enterToDo.value.trim().length === 0) return;
        
        store.addTodo(enterToDo.value);
        enterToDo.value = '';
        enterToDo.focus(); // Mantiene el foco para seguir agregando
    };
    
    // Enter key
    enterToDo.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        agregarTodo();
    });
    
    // Botón click
    botonEnter.addEventListener('click', agregarTodo);
    
    // Autofocus
    enterToDo.focus();
};