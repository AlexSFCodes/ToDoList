import htmlmyTodos from './myTodos.html?raw';
import htmladdTodos from './addTodo.html?raw';

export const App = (elementId) => {
    const myTodos = document.querySelector("#myHomeworks");
    const addTodo = document.querySelector("#addToDo");
    const fatherContainer = document.querySelector(elementId);

    myTodos.addEventListener("click", () => {
        fatherContainer.innerHTML = htmlmyTodos;
    });
    
    addTodo.addEventListener("click", () => {
        fatherContainer.innerHTML = htmladdTodos;
    });
}