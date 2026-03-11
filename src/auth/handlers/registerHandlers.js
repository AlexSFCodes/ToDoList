import { register } from '../../services/auth.service.js';
import authStore from '../../store/auth.store.js';

/**
 * @param {Function} onSuccess  called after successful registration
 * @param {Function} onLogin    called when the user clicks "Inicia sesión"
 */
export const setupRegisterHandlers = (onSuccess, onLogin) => {
    const nameInput     = document.querySelector('#registerName');
    const emailInput    = document.querySelector('#registerEmail');
    const passwordInput = document.querySelector('#registerPassword');
    const submitBtn     = document.querySelector('#registerSubmit');
    const errorBox      = document.querySelector('#registerError');
    const toLoginBtn    = document.querySelector('#goToLogin');

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
        submitBtn.textContent = loading ? 'Creando cuenta…' : 'Crear cuenta';
    };

    const handleRegister = async () => {
        clearError();

        const name     = nameInput.value.trim();
        const email    = emailInput.value.trim();
        const password = passwordInput.value;

        if (!name || !email || !password) {
            showError('Por favor completa todos los campos.');
            return;
        }
        if (password.length < 8) {
            showError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        setLoading(true);
        try {
            const data = await register(name, email, password);
            authStore.setSession(data);   // { token, user }
            onSuccess();
        } catch (err) {
            showError(err.message ?? 'Error al crear la cuenta. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    submitBtn.addEventListener('click', handleRegister);

    [nameInput, emailInput, passwordInput].forEach(input =>
        input.addEventListener('keyup', (e) => { if (e.key === 'Enter') handleRegister(); })
    );

    toLoginBtn.addEventListener('click', onLogin);

    nameInput.focus();
};
