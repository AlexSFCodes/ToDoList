export const renderToDos = (listasToDo, taskList) => {
    console.log('Renderizando todos:', listasToDo);
    // Limpia antes de agregar
    taskList.innerHTML = '';

    listasToDo.forEach(element => {
        const html = `
                <li class="task-item" data-id="${element.id}">
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