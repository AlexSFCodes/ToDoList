import htmlmyTodos from './myTodos.html?raw';
import htmladdTodos from './addTodo.html?raw';
import store from '../store/store';

export const App = (elementId) => {
    const myTodos = document.querySelector("#myHomeworks");
    const addTodo = document.querySelector("#addToDo");
    const fatherContainer = document.querySelector(elementId);
    
    myTodos.addEventListener("click", () => {
        fatherContainer.innerHTML = htmlmyTodos;
        
        // Después de insertar el HTML, selecciona el taskList
        const taskList = document.querySelector(".tasks-list");
        const listasToDo = store.getTodos(store.getCurrentFilter());
        renderToDos(listasToDo, taskList);
    });
    
    const renderToDos = (listasToDo, taskList) => {
        // Limpia la lista primero
        taskList.innerHTML = '';
        
        // forEach no necesita .array (a menos que listasToDo.array sea un array)
        listasToDo.forEach(element => {
            const html = `
                <li class="task-item">
                    <div class="task-view">
                        <input 
                            class="task-toggle" 
                            type="checkbox" 
                            id="task${element.id}" 
                            aria-label="Marcar tarea como completada" 
                        />
                        <label for="task${element.id}" class="task-label">
                            ${element.description}
                        </label>
                        <button 
                            class="task-delete" 
                            type="button" 
                            aria-label="Eliminar tarea"
                            data-id="${element.id}"
                        ></button>
                    </div>
                </li>
            `;
            
            taskList.innerHTML += html;
        });
    }

    addTodo.addEventListener("click", () => {
        fatherContainer.innerHTML = htmladdTodos;
    });
}