# Mi Lista de Tareas

Aplicación de gestión de tareas con autenticación JWT.

## Estructura

```
src/
  model/          → Todo model
  store/          → store.js (tareas) + auth.store.js (sesión)
  services/       → api.js · auth.service.js · todos.service.js
  auth/           → vistas y handlers de login/registro
  toDos/          → vistas, handlers y renderizado de tareas
  utils/          → helpers
```

## Configuración

1. Copia `.env.example` → `.env`
2. Ajusta `VITE_API_URL` con la URL de tu backend
3. `npm install && npm run dev`

## Endpoints esperados del backend

| Método | Ruta                  | Descripción          |
|--------|-----------------------|----------------------|
| POST   | /api/auth/register    | Registro de usuario  |
| POST   | /api/auth/login       | Login → devuelve JWT |
| GET    | /api/tasks            | Listar tareas        |
| POST   | /api/tasks            | Crear tarea          |
| PUT    | /api/tasks/:id        | Actualizar tarea     |
| DELETE | /api/tasks/:id        | Eliminar tarea       |

El token JWT debe enviarse en el header: `Authorization: Bearer <token>`
