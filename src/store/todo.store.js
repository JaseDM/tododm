import { Todo } from '../todos/models/todo.model';

let couterPending;

export const Filter = {
    All: 'All',
    Complited: 'Complited',
    Pending: 'Pending',
}   

const state = {
    todos: [
        new Todo('Primera tarea'),
        new Todo('Segunda tarea'),
        new Todo('Tercera tarea'),
        new Todo('Cuarta tarea'),
    ],
    filter: Filter.All
}

const getTodos = ( filter = Filter.All ) => {

    switch( filter ){
        case Filter.All:
            return [...state.todos];
        case Filter.Complited:
            return state.todos.filter( todo => todo.done);
        case Filter.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error('opción no permitida')
    }
    

}

const addTodo = ( description ) => {
    if ( !description ) throw new Error('La descripción es requerida')
    state.todos.push(new Todo(description))
    saveToLocslStorage();
}


const toggleTodo = ( todoId ) => {
    state.todos.map( todo => {
        if( todo.id === todoId ){
            todo.done = !todo.done;
        }

        return todo;
    })
    saveToLocslStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId )
    saveToLocslStorage();
}

const deleteComplited = () =>{
    console.log('todo.state');
    state.todos = state.todos.filter( todo => !todo.done )
    saveToLocslStorage();
}

const setFilter = ( newFilter = Filter.All ) => {
    console.log(newFilter);
    switch (newFilter) {
        case '#/':
            state.filter = Filter.All
            break;
        case '#/active':
            state.filter = Filter.Pending
            break;
        case '#/completed':
            state.filter = Filter.Complited
            break;
        default:
            throw new Error('opción no permitida')
            
    }
    
    saveToLocslStorage();
    
}

const getCurrentFilter = () => {
    return state.filter
}




const initStore = () => {
    loadStore();
    console.log('InitStore');
}

const loadStore = () => {
    if ( !localStorage.getItem('state')) return;
    const { todos = [], filter = Filter.All } = JSON.parse( localStorage.getItem('state'));
    couterPending = todos.filter(element => !element.done).length
    state.todos = todos;
    state.filter = filter;
    
}

const saveToLocslStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
    loadStore();
}

const viewCount = ( elementId ) => {
    
    console.log(elementId);

}

export default {
    initStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteComplited,
    deleteTodo, 
    setFilter,
    getCurrentFilter,
    viewCount
};