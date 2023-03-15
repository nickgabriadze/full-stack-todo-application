import axios from "axios";
import { EditTodo } from "./showTodos";

export const deleteTodo = async (id: number) => {
  try{
    return axios.delete('http://localhost:3001/api/delete/todo', {
      data: {
        ID: id
      }
    })
  }catch(err) {
    console.log(err);
  }
}


export const retrieveTodos = async (username: string) => {
  try {
     return axios.get("http://localhost:3001/api/get/todos", {
      params: {
        username: username,
      },
    });
  } catch (e) {
    console.log(e);
  }
};


export const changeTodo = async (ID: number, editedTodo:EditTodo) => {
    try{
      return axios.put("http://localhost:3001/api/put/todos/change", {
        ID: ID, 
        title: editedTodo.title, 
        category: editedTodo.category, 
        checked: editedTodo.checked
      });
    }
    catch (error) {
      console.log(error);
    }
}

export default retrieveTodos;
