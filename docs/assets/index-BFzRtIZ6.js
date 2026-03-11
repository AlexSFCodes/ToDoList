(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const x=`<section class="tasks-section" aria-label="Lista de tareas">\r
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
</section>`,N=`<section class="add-task-section" aria-label="Agregar nueva tarea">
    <div class="add-task-container">
        <div id="addTodoError" class="auth-error" role="alert" aria-live="polite" hidden></div>

        <label for="añadirTarea" class="visually-hidden">Nueva tarea</label>
        <input
            type="text"
            class="search-bar add-task-input"
            placeholder="Escribe tu nueva tarea..."
            id="añadirTarea"
            aria-label="Escribir nueva tarea"
        />
        <button class="button add-task-button" type="button">
            Añadir tarea
        </button>
    </div>
</section>
`,H=`<section class="auth-section" aria-label="Iniciar sesión">
    <div class="auth-card">
        <h2 class="auth-title">Iniciar sesión</h2>

        <div id="loginError" class="auth-error" role="alert" aria-live="polite" hidden></div>

        <div class="auth-form">
            <div class="field-group">
                <label for="loginEmail" class="field-label">Correo electrónico</label>
                <input
                    type="email"
                    id="loginEmail"
                    class="field-input"
                    placeholder="tu@correo.com"
                    autocomplete="email"
                    required
                />
            </div>

            <div class="field-group">
                <label for="loginPassword" class="field-label">Contraseña</label>
                <input
                    type="password"
                    id="loginPassword"
                    class="field-input"
                    placeholder="••••••••"
                    autocomplete="current-password"
                    required
                />
            </div>

            <button id="loginSubmit" class="button auth-submit" type="button">
                Entrar
            </button>
        </div>

        <p class="auth-switch">
            ¿No tienes cuenta?
            <button id="goToRegister" class="link-button" type="button">Regístrate</button>
        </p>
    </div>
</section>
`,M=`<section class="auth-section" aria-label="Crear cuenta">
    <div class="auth-card">
        <h2 class="auth-title">Crear cuenta</h2>

        <div id="registerError" class="auth-error" role="alert" aria-live="polite" hidden></div>

        <div class="auth-form">
            <div class="field-group">
                <label for="registerName" class="field-label">Nombre</label>
                <input
                    type="text"
                    id="registerName"
                    class="field-input"
                    placeholder="Tu nombre"
                    autocomplete="name"
                    required
                />
            </div>

            <div class="field-group">
                <label for="registerEmail" class="field-label">Correo electrónico</label>
                <input
                    type="email"
                    id="registerEmail"
                    class="field-input"
                    placeholder="tu@correo.com"
                    autocomplete="email"
                    required
                />
            </div>

            <div class="field-group">
                <label for="registerPassword" class="field-label">Contraseña</label>
                <input
                    type="password"
                    id="registerPassword"
                    class="field-input"
                    placeholder="Mínimo 8 caracteres"
                    autocomplete="new-password"
                    minlength="8"
                    required
                />
            </div>

            <button id="registerSubmit" class="button auth-submit" type="button">
                Crear cuenta
            </button>
        </div>

        <p class="auth-switch">
            ¿Ya tienes cuenta?
            <button id="goToLogin" class="link-button" type="button">Inicia sesión</button>
        </p>
    </div>
</section>
`,v="http://localhost:3000/api",E=()=>{const e=localStorage.getItem("jwt_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},w=async e=>{if(!e.ok){const t=await e.json().catch(()=>({}));throw new Error(t.message??`Error ${e.status}`)}return e.status===204?null:e.json()},y={get:e=>fetch(`${v}${e}`,{headers:E()}).then(w),post:(e,t)=>fetch(`${v}${e}`,{method:"POST",headers:E(),body:JSON.stringify(t)}).then(w),put:(e,t)=>fetch(`${v}${e}`,{method:"PUT",headers:E(),body:JSON.stringify(t)}).then(w),patch:(e,t)=>fetch(`${v}${e}`,{method:"PATCH",headers:E(),body:JSON.stringify(t)}).then(w),delete:e=>fetch(`${v}${e}`,{method:"DELETE",headers:E()}).then(w)},A=()=>y.get("/tasks"),O=e=>y.post("/tasks",{description:e}),R=(e,t)=>y.put(`/tasks/${e}`,t),$=e=>y.delete(`/tasks/${e}`),m={All:"all",Completed:"Completed",Pending:"Pending"},I={filter:m.All},F=(e=m.All)=>{I.filter=e},_=()=>I.filter,j=async(e=m.All)=>{const t=await A();switch(e){case m.Completed:return t.filter(n=>n.done);case m.Pending:return t.filter(n=>!n.done);default:return t}},J=e=>{if(!e?.trim())throw new Error("La descripción no puede estar vacía");return O(e.trim())},U=(e,t)=>R(e,{done:!t}),K=e=>$(e),D=async()=>{const t=(await A()).filter(n=>n.done);await Promise.all(t.map(n=>$(n.id)))},h={addTodo:J,deleteCompleted:D,getCurrentFilter:_,getTodos:j,removeTodo:K,setFilter:F,toggleTodo:U},S="jwt_token",k="current_user",b={token:localStorage.getItem(S)??null,user:JSON.parse(localStorage.getItem(k)??"null")},Y=({token:e,user:t})=>{b.token=e,b.user=t,localStorage.setItem(S,e),localStorage.setItem(k,JSON.stringify(t))},z=()=>{b.token=null,b.user=null,localStorage.removeItem(S),localStorage.removeItem(k)},G=()=>!!b.token,Q=()=>b.user,T={setSession:Y,clearSession:z,isAuthenticated:G,getUser:Q},C=(e,t)=>{if(t.innerHTML="",e.length===0){t.innerHTML='<li class="empty-message">No hay tareas para mostrar</li>';return}e.forEach(n=>{const s=`
            <li class="task-item ${n.done?"completed":""}"
                data-id="${n.id}"
                data-done="${n.done}">
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
                        aria-label="Eliminar tarea">
                    </button>
                </div>
            </li>
        `;t.innerHTML+=s})},V=(e,t)=>{e.addEventListener("click",async n=>{const s=n.target,o=s.closest("[data-id]");if(!o)return;const r=o.getAttribute("data-id"),a=o.getAttribute("data-done")==="true";try{s.classList.contains("task-toggle")&&(await h.toggleTodo(r,a),await t()),s.classList.contains("task-delete")&&(await h.removeTodo(r),await t())}catch(d){console.error("Error al actualizar la tarea:",d.message)}})},W=e=>{const t=document.querySelectorAll(".filter-button");t.forEach((o,r)=>{o.addEventListener("click",async()=>{const a=[m.Completed,m.Pending,m.All][r]??m.All;h.setFilter(a),await e(),t.forEach(d=>d.classList.remove("active")),o.classList.add("active")})});const n=h.getCurrentFilter(),s=n===m.Completed?0:n===m.Pending?1:2;t[s]?.classList.add("active")},X=e=>{const t=document.querySelector("#añadirTarea"),n=document.querySelector(".add-task-button"),s=document.querySelector("#addTodoError");if(!t||!n)return;const o=l=>{s&&(s.textContent=l,s.hidden=!1)},r=()=>{s&&(s.textContent="",s.hidden=!0)},a=l=>{n.disabled=l,n.textContent=l?"Añadiendo…":"Añadir tarea"},d=async()=>{r();const l=t.value.trim();if(!l){o("Escribe una descripción para la tarea."),t.focus();return}a(!0);try{await h.addTodo(l),t.value="",t.focus()}catch(p){o(p.message??"Error al agregar la tarea.")}finally{a(!1)}};t.addEventListener("keyup",l=>{l.key==="Enter"&&d()}),n.addEventListener("click",d),t.focus()},Z=(e,t,n)=>y.post("/auth/register",{name:e,email:t,password:n}),ee=(e,t)=>y.post("/auth/login",{email:e,password:t}),te=(e,t)=>{const n=document.querySelector("#loginEmail"),s=document.querySelector("#loginPassword"),o=document.querySelector("#loginSubmit"),r=document.querySelector("#loginError"),a=document.querySelector("#goToRegister"),d=i=>{r.textContent=i,r.hidden=!1},l=()=>{r.textContent="",r.hidden=!0},p=i=>{o.disabled=i,o.textContent=i?"Entrando…":"Entrar"},g=async()=>{l();const i=n.value.trim(),c=s.value;if(!i||!c){d("Por favor completa todos los campos.");return}p(!0);try{const u=await ee(i,c);T.setSession(u),e()}catch(u){d(u.message??"Error al iniciar sesión. Intenta de nuevo.")}finally{p(!1)}};o.addEventListener("click",g),[n,s].forEach(i=>i.addEventListener("keyup",c=>{c.key==="Enter"&&g()})),a.addEventListener("click",t),n.focus()},ne=(e,t)=>{const n=document.querySelector("#registerName"),s=document.querySelector("#registerEmail"),o=document.querySelector("#registerPassword"),r=document.querySelector("#registerSubmit"),a=document.querySelector("#registerError"),d=document.querySelector("#goToLogin"),l=c=>{a.textContent=c,a.hidden=!1},p=()=>{a.textContent="",a.hidden=!0},g=c=>{r.disabled=c,r.textContent=c?"Creando cuenta…":"Crear cuenta"},i=async()=>{p();const c=n.value.trim(),u=s.value.trim(),f=o.value;if(!c||!u||!f){l("Por favor completa todos los campos.");return}if(f.length<8){l("La contraseña debe tener al menos 8 caracteres.");return}g(!0);try{const L=await Z(c,u,f);T.setSession(L),e()}catch(L){l(L.message??"Error al crear la cuenta. Intenta de nuevo.")}finally{g(!1)}};r.addEventListener("click",i),[n,s,o].forEach(c=>c.addEventListener("keyup",u=>{u.key==="Enter"&&i()})),d.addEventListener("click",t),n.focus()},q=e=>{e.innerHTML='<p class="loading-msg" aria-live="polite">Cargando…</p>'},oe=(e,t)=>{e.innerHTML=`<p class="api-error" role="alert">${t}</p>`},re=e=>{const t=document.querySelector("nav.container"),n=document.querySelector("#myHomeworks"),s=document.querySelector("#addToDo"),o=document.querySelector(e),r=document.querySelector("#logoutBtn"),a=i=>{t.hidden=!i,r.hidden=!i},d=()=>{a(!1),o.innerHTML=H,te(()=>{a(!0),p()},l)},l=()=>{a(!1),o.innerHTML=M,ne(()=>{a(!0),p()},d)},p=async()=>{o.innerHTML=x;const i=document.querySelector(".tasks-list");q(i);const c=async()=>{q(i);try{const f=await h.getTodos(h.getCurrentFilter());C(f,i)}catch(f){oe(i,`Error al cargar tareas: ${f.message}`)}};await c(),V(i,c),W(c);const u=document.querySelector("#buscadorTareas");u&&u.addEventListener("input",async()=>{const f=u.value.toLowerCase(),P=(await h.getTodos(h.getCurrentFilter())).filter(B=>B.description.toLowerCase().includes(f));C(P,i)})},g=()=>{o.innerHTML=N,X()};n.addEventListener("click",p),s.addEventListener("click",g),r?.addEventListener("click",()=>{T.clearSession(),d()}),T.isAuthenticated()?(a(!0),p()):d()};re("#father");
