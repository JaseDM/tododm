(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function i(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(o){if(o.ep)return;o.ep=!0;const l=i(o);fetch(o.href,l)}})();var n=[];for(var w=0;w<256;++w)n.push((w+256).toString(16).slice(1));function S(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}var b,E=new Uint8Array(16);function A(){if(!b&&(b=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!b))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return b(E)}var P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const v={randomUUID:P};function I(e,t,i){if(v.randomUUID&&!t&&!e)return v.randomUUID();e=e||{};var a=e.random||(e.rng||A)();return a[6]=a[6]&15|64,a[8]=a[8]&63|128,S(a)}class g{constructor(t){this.id=I(),this.description=t,this.done=!1,this.createdAt=new Date}}const d={All:"All",Complited:"Complited",Pending:"Pending"},r={todos:[new g("Primera tarea"),new g("Segunda tarea"),new g("Tercera tarea"),new g("Cuarta tarea")],filter:d.All},U=(e=d.All)=>{switch(e){case d.All:return[...r.todos];case d.Complited:return r.todos.filter(t=>t.done);case d.Pending:return r.todos.filter(t=>!t.done);default:throw new Error("opción no permitida")}},k=e=>{if(!e)throw new Error("La descripción es requerida");r.todos.push(new g(e)),f()},q=e=>{r.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},x=e=>{r.todos=r.todos.filter(t=>t.id!==e),f()},O=()=>{console.log("todo.state"),r.todos=r.todos.filter(e=>!e.done),f()},M=(e=d.All)=>{switch(console.log(e),e){case"#/":r.filter=d.All;break;case"#/active":r.filter=d.Pending;break;case"#/completed":r.filter=d.Complited;break;default:throw new Error("opción no permitida")}f()},D=()=>r.filter,F=()=>{T(),console.log("InitStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=d.All}=JSON.parse(localStorage.getItem("state"));e.filter(i=>!i.done).length,r.todos=e,r.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(r)),T()},N=e=>{console.log(e)},c={initStore:F,getTodos:U,addTodo:k,toggleTodo:q,deleteComplited:O,deleteTodo:x,setFilter:M,getCurrentFilter:D,viewCount:N},V=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <!-- selected -->
                <a class="filtro selected" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`,H=e=>{e.innerHTML=c.getTodos(d.Pending).length},R=e=>{if(!e)throw new Error("A TODO is required");const t=`
        <div class="view">
            <input class="toggle" type="checkbox" ${e.done?"checked":""}>
            <label>${e.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,i=document.createElement("li");return i.innerHTML=t,i.setAttribute("data-id",e.id),e.done&&i.classList.add("completed"),i};let h;const J=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error("Element not found");h.innerHTML="",t.forEach(i=>{h.append(R(i))})},u={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompleted:".clear-completed",FilterLI:".filtro",CountPending:"#pending-count"},j=e=>{const t=()=>{const s=c.getTodos(c.getCurrentFilter());J(u.TodoList,s)};(()=>{const s=document.createElement("div");s.innerHTML=V,document.querySelector(e).append(s),t()})();const i=document.querySelector(u.NewTodoInput),a=document.querySelector(u.TodoList),o=document.querySelector(u.ClearCompleted),l=document.querySelectorAll(u.FilterLI),p=document.querySelector(u.CountPending),y=()=>{H(p)};a.addEventListener("click",s=>{const m=s.target.closest("[data-id]");s.target.className==="destroy"?c.deleteTodo(m.getAttribute("data-id")):c.toggleTodo(m.getAttribute("data-id")),t(),y()}),i.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(c.addTodo(s.target.value),t(),y(),s.target.value="")}),o.addEventListener("click",s=>{c.deleteComplited(),t(),y()}),l.forEach(s=>{s.addEventListener("click",m=>{l.forEach(L=>L.classList.remove("selected"));const C=m.target.getAttribute("href");m.target.classList.add("selected"),c.setFilter(C),t(),y()})})};c.initStore();j("#app");
