import { useEffect, useState } from "react";
import retrieveTodos, { changeTodo, deleteTodo } from "./api";
import showTodosStyle from "./showTodos.module.css";
import { getTimeDifference } from "./timeDiff";

export interface Todo {
  ID: number;
  title: string;
  checked: number; //0 false, 1 true
  category: string;
  date: Date;
}

export interface EditTodo {
  title: string;
  checked: number;
  category: string;
}




export const ShowTodos = ({ forUser }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>("");
  const [actionUndone, setActionUndon] = useState<number>(0);

  const [edit, setEdit] = useState<{ editID: number; edit: boolean }>({
    editID: -1,
    edit: false,
  });
  const [editTodo, setEditTodo] = useState<EditTodo>({
    title: "",
    checked: 0,
    category: "",
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    try{
      const response = await changeTodo(edit.editID, editTodo);
    
    }catch(e){
      
    }finally{
      setIsLoading(false);
    }
  }
 


  useEffect(() => {
    setIsLoading(true);

    try {
      retrieveTodos(forUser)
        .then((res: any) => {
          setTodos(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [forUser, todos]);

  if (todos.length === 0) {
    return (
      <h1 className={showTodosStyle["empty-todos"]}>
        You don't have any todo tasks, feel free to add them!
      </h1>
    );
  }

  return (
    <>
      <div className={showTodosStyle["todos-wrapper"]}>
        {todos.map((todo) => {
          return (
            <div key={todo.ID} className={showTodosStyle["todo"]}>
              <div className={showTodosStyle["pin"]}>
                <img src="/push-pin-icon.svg" width={30} height={30} />
              </div>
              <div className={showTodosStyle["title"]}>
                <p>Title</p>
                {edit.editID !== todo.ID ? (
                  <h2>{todo.title}</h2>
                ) : (
                  <input
                    type="text"
                    value={editTodo.title}
                    onChange={(e) =>
                      setEditTodo({ ...editTodo, title: e.target.value })
                    }
                  />
                )}
              </div>

              <div className={showTodosStyle["category"]}>
                <p>Category</p>
                {edit.editID !== todo.ID ? (
                  <h4>{todo.category}</h4>
                ) : (
                  <input
                    type="text"
                    value={editTodo.category}
                    onChange={(e) =>
                      setEditTodo({ ...editTodo, category: e.target.value })
                    }
                  />
                )}
              </div>

              <div className={showTodosStyle["checked"]}>
                <label>Complete</label>
                {edit.editID !== todo.ID ? (
                  <div>
                    {todo.checked === 0 ? (
                      <h4>Not yet</h4>
                    ) : (
                      <div className={showTodosStyle["complete-icon"]}>
                        <img src="/checked-icon.svg" width={48} height={48} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={showTodosStyle["mark-as-complete"]}
                    onClick={() =>
                      setEditTodo({
                        ...editTodo,
                        checked: editTodo.checked ? 0 : 1,
                      })
                    }
                  >
                    <h3>{!editTodo.checked  ? `Mark as complete` : `Undo check`}</h3>
                  </div>
                )}
              </div>

              <div className={showTodosStyle["added"]}>
                <h2>Added</h2>
                <p>{getTimeDifference(new Date(todo.date))}</p>
              </div>

              <div className={showTodosStyle["edit"]}>
                {edit.editID !== todo.ID ? (
                  <h2 className={showTodosStyle["edit-pencil"]}
                    onClick={() =>
                      {
                      setEdit({
                        ...edit,
                        editID: todo.ID,
                        edit: true,
                      });

                      setEditTodo({
                        ...editTodo,
                        title: todo.title,
                        category: todo.category,
                        checked: todo.checked === 0 ? 0: 1
                      })
                    }
                    }
                  >
                    Edit
                    <img src="/edit-icon.svg" width={30} height={30} /> 
                  </h2>
                ) : (
                  <>
              
                  <h2
                   onClick={() => {
                   
                    handleUpdate();    
                    setEdit({
                      ...edit, 
                      editID: -1,
                      edit: false
                    })

                   
                   }}
                  >
                    {isLoading ? "Loading...": 'Update'}
                  </h2>
                  <h2
                  onClick={() => {
                   deleteTodo(edit.editID);
                  }}
                  
                  >
                    DELETE

                  </h2>
                  <h2 
                   onClick={() =>{
                    setEdit({
                      ...edit,
                      editID: -1,
                      edit: false,
                    })

                    setActionUndon(0)
                  }
                  }>Cancel</h2>
                  </>
                )}
                
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowTodos;
