import { useEffect, useState } from "react";
import retrieveTodos from "./api";
import showTodosStyle from "./showTodos.module.css";
import { getTimeDifference } from "./timeDiff";

interface Todo {
  ID: number;
  title: string;
  checked: number; //0 false, 1 true
  category: string;
  date: Date;
}

interface EditTodo {
  title: string;
  checked: number;
  category: string;
}

export const ShowTodos = ({ forUser }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>("");
  const [edit, setEdit] = useState<{editID: number, edit: boolean}>({editID: -1, edit: false});
  const [editTodo, setEditTodo] = useState<EditTodo>({
    title: '',
    checked: 0,
    category: ''
  });

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
  }, [forUser]);

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
                <label>Title</label>
                {edit.editID !== todo.ID ? <h1>{todo.title}</h1> : <input type="text" value={todo.title} onChange={(e) => setEditTodo({...editTodo, title: e.target.value })} />}
              </div>

              <div className={showTodosStyle["category"]}>
                <label>Category</label>
                {edit.editID !== todo.ID ? <h4>{todo.category}</h4> : <input type="text" value={todo.category} onChange={(e) => setEditTodo({...editTodo, category: e.target.value })} />}
              </div>

              <div className={showTodosStyle["checked"]}>
                <label>Complete</label>
                <div>
                  {todo.checked === 0 ? (
                    <h4>Not yet</h4>
                  ) : (
                    <div className={showTodosStyle["complete-icon"]}>
                      <img src="/checked-icon.svg" width={48} height={48} />
                    </div>
                  )}
                </div>
              </div>

              <div className={showTodosStyle["added"]}>
                <h2>Added</h2>
                <p>{getTimeDifference(new Date(todo.date))}</p>
              </div>

              <div
                className={showTodosStyle["edit"]}
               
              >
                {edit.editID !== todo.ID ? <h2  onClick={(e) => setEdit({
                  ...edit,
                  editID: todo.ID,
                  edit: true
                })}>Edit</h2>: <h2 onClick={(e) => setEdit({
                  ...edit,
                  editID : -1,
                  edit: false
                })}>Update</h2>}
                <img src="/edit-icon.svg" width={30} height={30} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowTodos;
