import htmlMyTodos   from './views/myTodos.html?raw';
import htmlAddTodo   from './views/addTodo.html?raw';
import htmlLogin     from '../auth/views/login.html?raw';
import htmlRegister  from '../auth/views/register.html?raw';

import store         from '../store/store.js';
import authStore     from '../store/auth.store.js';

import { renderToDos }           from './renderTodos.js';
import { setupTaskListeners }    from './handlers/taskHandlers.js';
import { setupFilterButtons }    from './handlers/filterHandlers.js';
import { setupAddTodoListeners } from './handlers/addTodoHandlers.js';
import { setupLoginHandlers }    from '../auth/handlers/loginHandlers.js';
import { setupRegisterHandlers } from '../auth/handlers/registerHandlers.js';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const showLoading = (container) => {
    container.innerHTML = '<p class="loading-msg" aria-live="polite">Cargando…</p>';
};

const showApiError = (container, message) => {
    container.innerHTML = `<p class="api-error" role="alert">${message}</p>`;
};

// ─────────────────────────────────────────────────────────────────────────────
// App entry point
// ─────────────────────────────────────────────────────────────────────────────

export const App = (elementId) => {
    const nav             = document.querySelector('nav.container');
    const myTodosBtn      = document.querySelector('#myHomeworks');
    const addTodoBtn      = document.querySelector('#addToDo');
    const fatherContainer = document.querySelector(elementId);
    const logoutBtn       = document.querySelector('#logoutBtn');

    // ── Helpers to toggle chrome ───────────────────────────────────────────

    const setAuthUI = (loggedIn) => {
        nav.hidden       = !loggedIn;
        logoutBtn.hidden = !loggedIn;
    };

    // ── Auth views ─────────────────────────────────────────────────────────

    const showLogin = () => {
        setAuthUI(false);
        fatherContainer.innerHTML = htmlLogin;
        setupLoginHandlers(
            () => { setAuthUI(true); showMyTodos(); },
            showRegister
        );
    };

    const showRegister = () => {
        setAuthUI(false);
        fatherContainer.innerHTML = htmlRegister;
        setupRegisterHandlers(
            () => { setAuthUI(true); showMyTodos(); },
            showLogin
        );
    };

    // ── Todos views ────────────────────────────────────────────────────────

    const showMyTodos = async () => {
        fatherContainer.innerHTML = htmlMyTodos;

        const taskList = document.querySelector('.tasks-list');
        showLoading(taskList);

        const refreshTodoList = async () => {
            showLoading(taskList);
            try {
                const todos = await store.getTodos(store.getCurrentFilter());
                renderToDos(todos, taskList);
            } catch (err) {
                showApiError(taskList, `Error al cargar tareas: ${err.message}`);
            }
        };

        await refreshTodoList();
        setupTaskListeners(taskList, refreshTodoList);
        setupFilterButtons(refreshTodoList);

        // Search / filter locally
        const searchInput = document.querySelector('#buscadorTareas');
        if (searchInput) {
            searchInput.addEventListener('input', async () => {
                const q = searchInput.value.toLowerCase();
                const todos = await store.getTodos(store.getCurrentFilter());
                const filtered = todos.filter(t => t.description.toLowerCase().includes(q));
                renderToDos(filtered, taskList);
            });
        }
    };

    const showAddTodo = () => {
        fatherContainer.innerHTML = htmlAddTodo;
        setupAddTodoListeners();
    };

    // ── Event listeners ────────────────────────────────────────────────────

    myTodosBtn.addEventListener('click', showMyTodos);
    addTodoBtn.addEventListener('click', showAddTodo);

    logoutBtn?.addEventListener('click', () => {
        authStore.clearSession();
        showLogin();
    });

    // ── Bootstrap ──────────────────────────────────────────────────────────

    if (authStore.isAuthenticated()) {
        setAuthUI(true);
        showMyTodos();
    } else {
        showLogin();
    }
};
