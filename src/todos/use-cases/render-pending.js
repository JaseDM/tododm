import todoStore, { Filter } from "../../store/todo.store";



/**
 * 
 * @param {ElementHTML} elementId 
 */
export const renderPending = ( element ) => {

    element.innerHTML = todoStore.getTodos ( Filter.Pending ).length
    

}