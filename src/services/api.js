/**
 * Base HTTP client.
 * Reads the JWT from localStorage and attaches it automatically.
 * Throws an Error with the server's message on non-2xx responses.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

const getHeaders = () => {
    const token = localStorage.getItem('jwt_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const handleResponse = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? `Error ${res.status}`);
    }
    // 204 No Content → return null
    if (res.status === 204) return null;
    return res.json();
};

export const api = {
    get:    (url)        => fetch(`${BASE_URL}${url}`, { headers: getHeaders() }).then(handleResponse),
    post:   (url, body)  => fetch(`${BASE_URL}${url}`, { method: 'POST',   headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
    put:    (url, body)  => fetch(`${BASE_URL}${url}`, { method: 'PUT',    headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
    patch:  (url, body)  => fetch(`${BASE_URL}${url}`, { method: 'PATCH',  headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
    delete: (url)        => fetch(`${BASE_URL}${url}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),
};
