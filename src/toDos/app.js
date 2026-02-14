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
        
        // Event listener para clicks en la lista
        taskList.addEventListener("click", (event) => {
            const element = event.target;
            
            console.log('Click detectado en:', element);
            console.log('Clases del elemento:', element.classList);
            
            // Si es el checkbox
            if (element.classList.contains('task-toggle')) {
                const todoItem = element.closest('[data-id]');
                console.log('Checkbox clickeado, todoItem:', todoItem);
                if (todoItem) {
                    const todoId = todoItem.getAttribute('data-id');
                    console.log('Toggle todo con id:', todoId);
                    store.toggleTodo(todoId);
                }
            }
            
            // Si es el botón de eliminar
            if (element.classList.contains('task-delete')) {
                console.log('Es el botón de eliminar');
                const todoItem = element.closest('[data-id]');
                console.log('TodoItem encontrado:', todoItem);
                
                if (todoItem) {
                    const todoId = todoItem.getAttribute('data-id');
                    console.log('Todo ID a eliminar:', todoId);
                    console.log('Llamando deleteTodo...');
                    store.deleteTodo(todoId);
                    console.log('Todos después de eliminar:', store.getTodos());
                }
            }
            
            // Re-renderiza
            const todosActualizados = store.getTodos(store.getCurrentFilter());
            console.log('Todos actualizados para renderizar:', todosActualizados);
            renderToDos(todosActualizados, taskList);
        });
    });
    
    const renderToDos = (listasToDo, taskList) => {
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

    addTodo.addEventListener("click", () => {
        fatherContainer.innerHTML = htmladdTodos;
        
        // Selecciona DESPUÉS de insertar el HTML
        const enterToDo = document.querySelector("#añadirTarea");
        
        enterToDo.addEventListener('keyup', (event) => {
            if (event.keyCode !== 13) return;
            if (event.target.value.trim().length === 0) return;
            
            store.addTodo(event.target.value);
            event.target.value = '';
            
            console.log('Todo agregado, todos actuales:', store.getTodos());
        });
    });
}