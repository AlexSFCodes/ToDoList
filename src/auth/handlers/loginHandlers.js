import { login } from '../../services/auth.service.js';
import authStore from '../../store/auth.store.js';

/**
 * @param {Function} onSuccess  called after a successful login
 * @param {Function} onRegister called when the user clicks "Regístrate"
 */
export const setupLoginHandlers = (onSuccess, onRegister) => {
    const emailInput    = document.querySelector('#loginEmail');
    const passwordInput = document.querySelector('#loginPassword');
    const submitBtn     = document.querySelector('#loginSubmit');
    const errorBox      = document.querySelector('#loginError');
    const toRegisterBtn = document.querySelector('#goToRegister');

    const showError = (msg) => {
        errorBox.textContent = msg;
        errorBox.hidden = false;
    };

    const clearError = () => {
        errorBox.textContent = '';
        errorBox.hidden = true;
    };

    const setLoading = (loading) => {
        submitBtn.disabled = loading;
        submitBtn.textContent = loading ? 'Entrando…' : 'Entrar';
    };

    const handleLogin = async () => {
        clearError();

        const email    = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            showError('Por favor completa todos los campos.');
            return;
        }

        setLoading(true);
        try {
            const data = await login(email, password);
            authStore.setSession(data);   // { token, user }
            onSuccess();
        } catch (err) {
            showError(err.message ?? 'Error al iniciar sesión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    submitBtn.addEventListener('click', handleLogin);

    // Allow Enter key in both fields
    [emailInput, passwordInput].forEach(input =>
        input.addEventListener('keyup', (e) => { if (e.key === 'Enter') handleLogin(); })
    );

    toRegisterBtn.addEventListener('click', onRegister);

    emailInput.focus();
};
