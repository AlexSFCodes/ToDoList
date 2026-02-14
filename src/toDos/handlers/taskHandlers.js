import store from '../../store/store';

/**
 * Maneja los clicks en la lista de tareas (toggle y delete)
 */
export const setupTaskListeners = (taskList, refreshCallback) => {
    taskList.addEventListener("click", (event) => {
        const element = event.target;
        
        // Toggle checkbox
        if (element.classList.contains('task-toggle')) {
            const todoItem = element.closest('[data-id]');
            if (todoItem) {
                const todoId = todoItem.getAttribute('data-id');
                store.toggleTodo(todoId);
                refreshCallback();
            }
        }
        
        // Eliminar tarea
        if (element.classList.contains('task-delete')) {
            const todoItem = element.closest('[data-id]');
            if (todoItem) {
                const todoId = todoItem.getAttribute('data-id');
                store.deleteTodo(todoId);
                refreshCallback();
            }
        }
    });
};