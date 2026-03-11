import store from '../../store/store.js';

/**
 * Maneja clicks en la lista (toggle y delete) con llamadas async a la API.
 * @param {HTMLElement} taskList
 * @param {Function}    refreshCallback  async function that re-renders the list
 */
export const setupTaskListeners = (taskList, refreshCallback) => {
    taskList.addEventListener('click', async (event) => {
        const element  = event.target;
        const todoItem = element.closest('[data-id]');
        if (!todoItem) return;

        const todoId   = todoItem.getAttribute('data-id');
        const todoDone = todoItem.getAttribute('data-done') === 'true';

        try {
            if (element.classList.contains('task-toggle')) {
                await store.toggleTodo(todoId, todoDone);
                await refreshCallback();
            }

            if (element.classList.contains('task-delete')) {
                await store.removeTodo(todoId);
                await refreshCallback();
            }
        } catch (err) {
            console.error('Error al actualizar la tarea:', err.message);
            // Optionally show a toast/notification here
        }
    });
};
