# 📝 TodoList App

Una aplicación moderna de gestión de tareas construida con JavaScript vanilla, HTML5 y CSS3.

![TodoList Preview](https://via.placeholder.com/800x400?text=TodoList+App+Preview)

## ✨ Características

- ✅ Agregar, editar y eliminar tareas
- 🔄 Marcar tareas como completadas
- 🔍 Filtrar tareas (Todas, Completadas, Pendientes)
- 💾 Persistencia de datos con LocalStorage
- 📱 Diseño responsive
- ⚡ Sin dependencias de frameworks
- 🎨 Interfaz limpia y moderna

## 🚀 Tecnologías

- **JavaScript ES6+** - Lógica de la aplicación
- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **Vite** - Build tool y dev server
- **UUID** - Generación de IDs únicos

## 📁 Estructura del Proyecto
```
TODOLIST/
├── src/
│   ├── todos/
│   │   ├── app.js                 # Punto de entrada principal
│   │   ├── renderTodos.js         # Renderizado de tareas
│   │   ├── handlers/              # Event handlers
│   │   │   ├── taskHandlers.js
│   │   │   ├── filterHandlers.js
│   │   │   └── addTodoHandlers.js
│   │   └── views/                 # Templates HTML
│   │       ├── myTodos.html
│   │       └── addTodo.html
│   ├── store/
│   │   └── store.js               # Estado global y lógica
│   ├── model/
│   │   └── todo.model.js          # Modelo de datos
│   ├── utils/
│   │   └── helpers.js             # Funciones auxiliares
│   └── main.js                    # Inicialización
├── index.html
├── style.css
├── package.json
└── README.md
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

### Pasos

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/todolist-app.git
cd todolist-app
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador en** `http://localhost:5173`

## 📦 Scripts Disponibles
```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Crea el build de producción
npm run preview      # Preview del build de producción
```

## 🎯 Uso

### Agregar una Tarea
1. Haz click en el botón **"Añadir Tarea"**
2. Escribe la descripción de tu tarea
3. Presiona **Enter** o click en **"Añadir tarea"**

### Completar una Tarea
- Haz click en el **checkbox** al lado de la tarea

### Eliminar una Tarea
- Haz click en el **botón de eliminar** (🗑️)

### Filtrar Tareas
- **Todas**: Muestra todas las tareas
- **Completadas**: Solo tareas completadas
- **Pendientes**: Solo tareas pendientes

## 🏗️ Arquitectura

### Patrón de Diseño
El proyecto sigue una arquitectura **modular** con separación de responsabilidades:

- **Model**: Define la estructura de datos (`Todo`)
- **Store**: Maneja el estado global y la lógica de negocio
- **View**: Templates HTML y renderizado
- **Handlers**: Gestión de eventos del usuario
- **Utils**: Funciones auxiliares reutilizables

### Flujo de Datos
```
User Action → Event Handler → Store (Update State) → Render → DOM Update
```

## 🔧 Configuración

### LocalStorage
Los datos se guardan automáticamente en `localStorage` con la clave `state`:
```javascript
{
  "todos": [
    {
      "id": "uuid-1234",
      "description": "Mi tarea",
      "done": false,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "filter": "all"
}
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Búsqueda de tareas por texto
- [ ] Editar descripción de tareas existentes
- [ ] Fechas de vencimiento
- [ ] Categorías/etiquetas
- [ ] Temas oscuro/claro
- [ ] Exportar/Importar tareas (JSON/CSV)
- [ ] Sincronización con backend
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**AlexCodes**
- GitHub: [@AlexCodes](https://github.com/tu-usuario)


## 🙏 Agradecimientos

- Inspirado en [TodoMVC](http://todomvc.com/)
- Iconos por [Heroicons](https://heroicons.com/)
- Fuentes por [Google Fonts](https://fonts.google.com/)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
```

---

## **📝 Archivos Adicionales Recomendados:**

### **`.gitignore`:**
```
node_modules/
dist/
.DS_Store
*.log
.vscode/
.idea/
```

### **`LICENSE` (MIT):**
```
MIT License

Copyright (c) 2024 [AlexCodes]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.