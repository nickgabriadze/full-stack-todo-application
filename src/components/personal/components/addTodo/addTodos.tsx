import Head from "../../../head";
import addTodoStyle from "./addTodo.module.css";
import { useEffect, useState } from "react";
import createTodo from "./api";

export const AddTodos = ({ forUser }: any) => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [receivedData, setReceivedData] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<string>("");
  const sendTodo = async () => {
    
    setIsLoading(true);
    try {
      const response = await createTodo(forUser, title, category);
      

      setReceivedData(response);
      setUpdateInfo("Task added successfully");
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    
      setTitle("");
      setCategory("");


  }, [receivedData]);
  return (
    <>

      <div className={addTodoStyle["addtodo-wrapper"]}>
        <div className={addTodoStyle["title"]}>
          <h3>Title</h3>
          <input
            type="text"
            onFocus={() => setUpdateInfo("")}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder={"e.g Make coffee"}
            maxLength={255}
            required
          />
        </div>
        <div className={addTodoStyle["category"]}>
          <h3>Category</h3>
          <input
            type="text"
            onFocus={() => setUpdateInfo("")}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            placeholder={"e.g Drinks"}
            maxLength={255}
            required
          />
        </div>

        <div className={addTodoStyle["create-todo"]}>
          <h4>{updateInfo}</h4>
          <button onClick={sendTodo}>
            {isLoading ? "Loading..." : "Create"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTodos;
