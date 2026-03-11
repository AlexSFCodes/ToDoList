import { api } from './api.js';

/**
 * POST /auth/register
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: object }}
 */
export const register = (name, email, password) =>
    api.post('/auth/register', { name, email, password });

/**
 * POST /auth/login
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: object }}
 */
export const login = (email, password) =>
    api.post('/auth/login', { email, password });
