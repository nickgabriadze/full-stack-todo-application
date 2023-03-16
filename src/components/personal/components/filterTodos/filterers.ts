import { Todo } from "../showTodos/showTodos";


export const mapCategories = (todos:Todo[]) =>{ 
  
    return [...new Set(todos.map(todo => todo.category))];
}

export const filterChecked = (todos:Todo[]) => {
    
}