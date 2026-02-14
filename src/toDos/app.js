import htmlmyTodos from './views/myTodos.html?raw';
import htmladdTodos from './views/addTodo.html?raw';
import store from '../store/store';
import { renderToDos } from './renderTodos';
import { setupTaskListeners } from './handlers/taskHandlers';
import { setupFilterButtons } from './handlers/filterHandlers';
import { setupAddTodoListeners } from './handlers/addTodoHandlers';

export const App = (elementId) => {
    const myTodos = document.querySelector("#myHomeworks");
    const addTodo = document.querySelector("#addToDo");
    const fatherContainer = document.querySelector(elementId);

    // ========== VISTA: MIS TAREAS ==========
    myTodos.addEventListener("click", () => {
        fatherContainer.innerHTML = htmlmyTodos;
        
        const taskList = document.querySelector(".tasks-list");
        
        // Función para refrescar la lista
        const refreshTodoList = () => {
            const todosActualizados = store.getTodos(store.getCurrentFilter());
            renderToDos(todosActualizados, taskList);
        };
        
        // Renderiza inicialmente
        refreshTodoList();
        
        // Configura los event listeners
        setupTaskListeners(taskList, refreshTodoList);
        setupFilterButtons(refreshTodoList);
    });

    // ========== VISTA: AGREGAR TAREA ==========
    addTodo.addEventListener("click", () => {
        fatherContainer.innerHTML = htmladdTodos;
        setupAddTodoListeners();
    });
};