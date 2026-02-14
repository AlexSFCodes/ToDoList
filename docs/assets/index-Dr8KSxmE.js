(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const m=`<section class="tasks-section" aria-label="Lista de tareas">\r
    <div class="search-container">\r
        <label for="buscadorTareas" class="visually-hidden">Buscar tareas</label>\r
        <input type="search" class="search-bar" placeholder="Buscar tareas..." id="buscadorTareas"\r
            aria-label="Buscar tareas" />\r
    </div>\r
\r
    <ul class="tasks-list" role="list">\r
\r
    </ul>\r
\r
    <footer class="tasks-footer">\r
        <button class="button filter-button" type="button">Completadas</button>\r
        <button class="button filter-button" type="button">Pendientes</button>\r
        <button class="button filter-button" type="button">Todas</button>\r
    </footer>\r
</section>`,g=`<section class="add-task-section" aria-label="Agregar nueva tarea">\r
    <div class="add-task-container">\r
        <label for="añadirTarea" class="visually-hidden">Nueva tarea</label>\r
        <input type="text" class="search-bar add-task-input" placeholder="Escribe tu nueva tarea..." id="añadirTarea"\r
            aria-label="Escribir nueva tarea" />\r
        <button class="button add-task-button" type="button">\r
            Añadir tarea\r
        </button>\r
    </div>\r
</section>`;let p;const y=new Uint8Array(16);function h(){if(!p&&(p=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!p))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return p(y)}const a=[];for(let t=0;t<256;++t)a.push((t+256).toString(16).slice(1));function v(t,e=0){return a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]}const T=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),f={randomUUID:T};function L(t,e,n){if(f.randomUUID&&!t)return f.randomUUID();t=t||{};const s=t.random||(t.rng||h)();return s[6]=s[6]&15|64,s[8]=s[8]&63|128,v(s)}class k{constructor(e){this.id=L(),this.description=e,this.done=!1}}const d={All:"all",Completed:"Completed",Pending:"Pending"},i={todos:[],filter:d.All},S=()=>{b()},b=()=>{if(!localStorage.getItem("state"))return;const{todos:t=[],filter:e=d.All}=JSON.parse(localStorage.getItem("state"));i.todos=t,i.filter=e},u=()=>{localStorage.setItem("state",JSON.stringify(i))},A=(t=d.All)=>{switch(t){case d.All:return[...i.todos];case d.Completed:return i.todos.filter(e=>e.done);case d.Pending:return i.todos.filter(e=>!e.done);default:throw new Error("Filtro no válido")}},E=t=>{if(!t)throw new Error("Descripción vacía");i.todos.push(new k(t)),u()},w=t=>{i.todos=i.todos.map(e=>(e.id===t&&(e.done=!e.done),e)),u()},I=t=>{i.todos=i.todos.filter(e=>e.id!==t),u()},C=()=>{i.todos=i.todos.filter(t=>!t.done),u()},U=(t=d.All)=>{i.filter=t,u()},F=()=>i.filter,c={addTodo:E,deleteCompleted:C,deleteTodo:I,getCurrentFilter:F,getTodos:A,initStore:S,loadStore:b,setFilter:U,toggleTodo:w},P=(t,e)=>{if(e.innerHTML="",t.length===0){e.innerHTML='<li class="empty-message">No hay tareas para mostrar</li>';return}t.forEach(n=>{const s=`
            <li class="task-item ${n.done?"completed":""}" data-id="${n.id}">
                <div class="task-view">
                    <input 
                        class="task-toggle" 
                        type="checkbox" 
                        id="task${n.id}"
                        ${n.done?"checked":""}
                        aria-label="Marcar tarea como completada" 
                    />
                    <label for="task${n.id}" class="task-label">
                        ${n.description}
                    </label>
                    <button 
                        class="task-delete" 
                        type="button" 
                        aria-label="Eliminar tarea"
                    ></button>
                </div>
            </li>
        `;e.innerHTML+=s})},q=(t,e)=>{t.addEventListener("click",n=>{const s=n.target;if(s.classList.contains("task-toggle")){const o=s.closest("[data-id]");if(o){const r=o.getAttribute("data-id");c.toggleTodo(r),e()}}if(s.classList.contains("task-delete")){const o=s.closest("[data-id]");if(o){const r=o.getAttribute("data-id");c.deleteTodo(r),e()}}})},x=t=>{const e=document.querySelectorAll(".filter-button");e.forEach((s,o)=>{s.addEventListener("click",()=>{let r;switch(o){case 0:r=d.Completed;break;case 1:r=d.Pending;break;default:r=d.All;break}c.setFilter(r),t(),e.forEach(l=>l.classList.remove("active")),s.classList.add("active")})});const n=c.getCurrentFilter();n===d.Completed?e[0].classList.add("active"):n===d.Pending?e[1].classList.add("active"):e[2].classList.add("active")},O=()=>{const t=document.querySelector("#añadirTarea"),e=document.querySelector(".add-task-button");if(!t||!e)return;const n=()=>{t.value.trim().length!==0&&(c.addTodo(t.value),t.value="",t.focus())};t.addEventListener("keyup",s=>{s.keyCode===13&&n()}),e.addEventListener("click",n),t.focus()},H=t=>{const e=document.querySelector("#myHomeworks"),n=document.querySelector("#addToDo"),s=document.querySelector(t);e.addEventListener("click",()=>{s.innerHTML=m;const o=document.querySelector(".tasks-list"),r=()=>{const l=c.getTodos(c.getCurrentFilter());P(l,o)};r(),q(o,r),x(r)}),n.addEventListener("click",()=>{s.innerHTML=g,O()})};c.initStore();H("#father");
