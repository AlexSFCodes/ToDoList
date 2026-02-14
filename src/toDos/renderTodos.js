export const renderToDos = (listasToDo, taskList) => {
    taskList.innerHTML = '';

    if (listasToDo.length === 0) {
        taskList.innerHTML = '<li class="empty-message">No hay tareas para mostrar</li>';
        return;
    }

    listasToDo.forEach(element => {
        const html = `
            <li class="task-item ${element.done ? 'completed' : ''}" data-id="${element.id}">
                <div class="task-view">
                    <input 
                        class="task-toggle" 
                        type="checkbox" 
                        id="task${element.id}"
                        ${element.done ? 'checked' : ''}
                        aria-label="Marcar tarea como completada" 
                    />
                    <label for="task${element.id}" class="task-label">
                        ${element.description}
                    </label>
                    <button 
                        class="task-delete" 
                        type="button" 
                        aria-label="Eliminar tarea"
                    ></button>
                </div>
            </li>
        `;

        taskList.innerHTML += html;
    });
}