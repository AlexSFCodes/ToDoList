

import { App } from './toDos/app.js';
// main.js
import './style.css';
import store from './store/store';

store.initStore();  // ← Esto debe ejecutarse ANTES

App("#father"); 