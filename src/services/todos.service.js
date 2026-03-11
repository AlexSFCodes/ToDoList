import { api } from './api.js';

/**
 * GET /tasks  →  array of todos for the logged-in user
 */
export const fetchTodos = () => api.get('/tasks');

/**
 * POST /tasks  →  newly created todo
 * @param {string} description
 */
export const createTodo = (description) => api.post('/tasks', { description });

/**
 * PUT /tasks/:id  →  updated todo
 * @param {string} id
 * @param {object} changes  e.g. { done: true } or { description: '...' }
 */
export const updateTodo = (id, changes) => api.put(`/tasks/${id}`, changes);

/**
 * DELETE /tasks/:id  →  null (204)
 * @param {string} id
 */
export const deleteTodo = (id) => api.delete(`/tasks/${id}`);
