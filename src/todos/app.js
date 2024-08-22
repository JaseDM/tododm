import todoStore from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos, renderPending } from './use-cases';

export const ElementId = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    FilterLI: '.filtro',
    CountPending: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    

    const displayTodos = () =>{
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() )
        renderTodos( ElementId.TodoList, todos);
        
    }

    


    (()=> {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
        
    })();

    

    // Referencias html 
    const newTodoDescription = document.querySelector(ElementId.NewTodoInput);
    const todoListUL = document.querySelector(ElementId.TodoList);
    const clearCompleted = document.querySelector(ElementId.ClearCompleted);
    const selectFilter = document.querySelectorAll(ElementId.FilterLI);
    const contenCounter = document.querySelector(ElementId.CountPending);
    
    const updatePendingCount = (  ) => {
        renderPending( contenCounter )
    }
  
    
    // Eventos

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        if (event.target.className === 'destroy') {
            
            todoStore.deleteTodo(element.getAttribute('data-id'));
            
        } else {
            
            todoStore.toggleTodo(element.getAttribute('data-id'));
        }
        displayTodos();
        updatePendingCount();
    })

    

    newTodoDescription.addEventListener('keyup', (event) =>{
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        updatePendingCount();
        event.target.value = '';
    })

    clearCompleted.addEventListener('click', (event) => {
        todoStore.deleteComplited();
        displayTodos();
        updatePendingCount();
    })

    selectFilter.forEach(element => {
        element.addEventListener('click', (event) => {
            selectFilter.forEach(element => element.classList.remove('selected'))
            const filter = event.target.getAttribute('href');
            event.target.classList.add('selected')
            todoStore.setFilter(filter)
            displayTodos();
            updatePendingCount();
        })
    })
}