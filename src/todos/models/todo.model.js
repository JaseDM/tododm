import { v4 as UUID} from 'uuid'

export class Todo {

    /**
     * 
     * @param {String} description 
     */
    constructor( description ){
        this.id = UUID();
        this.description = description;
        this.done= false;
        this.createdAt= new Date();
    }
}