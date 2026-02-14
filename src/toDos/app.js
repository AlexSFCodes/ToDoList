import htmlmyTodos from './myTodos.html?raw';
import htmladdTodos from './addTodo.html?raw';
import store from '../store/store';
import { renderToDos } from './rederTodos';
import {Filters} from '../store/store';
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

        //PARA FILTRAR CON EL FOTTER 
        const botonesFiltradores = document.querySelectorAll(".filter-button");
        botonesFiltradores[0].addEventListener('click',()=>{
            console.log("usted aplasto el boton completadas")
        
            renderToDos(store.getTodos(Filters.Completed), taskList);
        })
        botonesFiltradores[1].addEventListener('click',()=>{
            console.log("usted aplasto el boton pendings")
        
            renderToDos(store.getTodos(Filters.Pending), taskList);
        })
        botonesFiltradores[2].addEventListener('click',()=>{
            console.log("usted aplasto el boton pendings")
        
            renderToDos(store.getTodos(Filters.All), taskList);
        })
    });
    
    addTodo.addEventListener("click", () => {
    fatherContainer.innerHTML = htmladdTodos;
    
    // Selecciona DESPUÉS de insertar el HTML
    const enterToDo = document.querySelector("#añadirTarea");
    const botonEnter = document.querySelector(".add-task-button");
    
    // Evento para Enter (keyup)
    enterToDo.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;
        
        store.addTodo(event.target.value);
        event.target.value = '';
        
        console.log('Todo agregado con Enter, todos actuales:', store.getTodos());
    });
    
    // Evento para el botón (click)
    botonEnter.addEventListener('click', () => {
        if (enterToDo.value.trim().length === 0) return;  
        
        store.addTodo(enterToDo.value); 
        enterToDo.value = ''; 
        
        console.log('Todo agregado con botón, todos actuales:', store.getTodos());
    });
});


}