import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/todos.service.js';

export const Filters = {
    All:       'all',
    Completed: 'Completed',
    Pending:   'Pending',
};

/** Local filter preference (no need to persist to server) */
const state = {
    filter: Filters.All,
};

// ─── Filter (local only) ────────────────────────────────────────────────────

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
};

const getCurrentFilter = () => state.filter;

// ─── Todos (remote) ─────────────────────────────────────────────────────────

/**
 * Fetches todos from the API and applies the given filter locally.
 * @param {string} filter
 * @returns {Promise<Array>}
 */
const getTodos = async (filter = Filters.All) => {
    const todos = await fetchTodos();

    switch (filter) {
        case Filters.Completed: return todos.filter(t => t.done);
        case Filters.Pending:   return todos.filter(t => !t.done);
        default:                return todos;
    }
};

/**
 * Creates a new todo via the API.
 * @param {string} description
 * @returns {Promise<object>} The created todo
 */
const addTodo = (description) => {
    if (!description?.trim()) throw new Error('La descripción no puede estar vacía');
    return createTodo(description.trim());
};

/**
 * Toggles the done state of a todo.
 * @param {string} id
 * @param {boolean} currentDone  current value so we can flip it
 * @returns {Promise<object>}
 */
const toggleTodo = (id, currentDone) => updateTodo(id, { done: !currentDone });

/**
 * Removes a todo.
 * @param {string} id
 * @returns {Promise<null>}
 */
const removeTodo = (id) => deleteTodo(id);

/**
 * Deletes all completed todos (client-side waterfall — adjust if your API supports bulk delete).
 * @returns {Promise<void>}
 */
const deleteCompleted = async () => {
    const todos = await fetchTodos();
    const completed = todos.filter(t => t.done);
    await Promise.all(completed.map(t => deleteTodo(t.id)));
};

export default {
    addTodo,
    deleteCompleted,
    getCurrentFilter,
    getTodos,
    removeTodo,
    setFilter,
    toggleTodo,
};
