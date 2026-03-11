/**
 * auth.store.js
 * Manages the JWT token and the currently authenticated user.
 * Token is persisted in localStorage so it survives page refreshes.
 */

const TOKEN_KEY = 'jwt_token';
const USER_KEY  = 'current_user';

const authState = {
    token: localStorage.getItem(TOKEN_KEY) ?? null,
    user:  JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'),
};

const setSession = ({ token, user }) => {
    authState.token = token;
    authState.user  = user;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearSession = () => {
    authState.token = null;
    authState.user  = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

const isAuthenticated = () => Boolean(authState.token);

const getUser = () => authState.user;

export default { setSession, clearSession, isAuthenticated, getUser };
