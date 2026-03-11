import store from '../../store/store.js';

/**
 * Configura los event listeners para agregar tareas (async).
 * @param {Function} onAdded  optional callback after a todo is successfully added
 */
export const setupAddTodoListeners = (onAdded) => {
    const input     = document.querySelector('#añadirTarea');
    const submitBtn = document.querySelector('.add-task-button');
    const errorBox  = document.querySelector('#addTodoError');

    if (!input || !submitBtn) return;

    const showError = (msg) => {
        if (!errorBox) return;
        errorBox.textContent = msg;
        errorBox.hidden = false;
    };

    const clearError = () => {
        if (!errorBox) return;
        errorBox.textContent = '';
        errorBox.hidden = true;
    };

    const setLoading = (loading) => {
        submitBtn.disabled = loading;
        submitBtn.textContent = loading ? 'Añadiendo…' : 'Añadir tarea';
    };

    const agregarTodo = async () => {
        clearError();
        const value = input.value.trim();

        if (!value) {
            showError('Escribe una descripción para la tarea.');
            input.focus();
            return;
        }

        setLoading(true);
        try {
            await store.addTodo(value);
            input.value = '';
            input.focus();
            if (onAdded) onAdded();
        } catch (err) {
            showError(err.message ?? 'Error al agregar la tarea.');
        } finally {
            setLoading(false);
        }
    };

    input.addEventListener('keyup', (e) => { if (e.key === 'Enter') agregarTodo(); });
    submitBtn.addEventListener('click', agregarTodo);
    input.focus();
};
