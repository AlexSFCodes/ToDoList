import { Todo } from '../model/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;
    
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error("Filtro no válido");
    }
}

const addTodo = (description) => {
    if (!description) throw new Error("Descripción vacía");
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(toDo => {
        if (toDo.id === todoId) {
            toDo.done = !toDo.done;
        }
        return toDo;
    });
    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(toDo => toDo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

const setFilter = (newFilter = Filters.All) => {
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