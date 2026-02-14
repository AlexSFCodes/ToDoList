import { Todo } from '../model/todo.model';


export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Pieda del alma'),
        new Todo('Pieda del espacio'),
        new Todo('Pieda del tiempo'),
        new Todo('Pieda del poder'),
        new Todo('Pieda del realidad'),
    ],
    filter: Filters.All,
}


const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    const {todos = [], filter = filter.All } =JSON.parse(state);
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state));
}


const getTodos = ( filter = Filters.All ) => {
    switch (filter) {
        case Filters.all:
            return [...state.todos];
            break;
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
            break;
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
            break;
    
        default:
            throw new Error("No sirvio contactese con un administrador"); 
            break;
    }
}

/**
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if(!description) throw new Error("No hay nada");
    state.todo.push(new Todo(description));
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map(
        toDo => {
            if(toDo.id == todoId){
                toDo.done= !toDo.done;
            }
            return toDo;
        }
    )
    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(
        toDo => {return toDo != todoId} 
    )
    saveStateToLocalStorage();
}
/**
 * We can use this function but the HTML needs to be modified
    const deleteCompleted = () => {
    
    }
 * 
 */

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}