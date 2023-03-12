import { useEffect, useState } from "react";
import retrieveTodos from "./api";
import showTodosStyle from "./showTodos.module.css";
import checkedIcon from "../../../../../public/checked-icon.svg";
interface Todo {
  ID: number;
  title: string;
  checked: number; //0 false, 1 true
  category: string;
  date: Date;
}

export const ShowTodos = ({ forUser }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>("");

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

  if (isLoading) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  return (
    <>
      <div className={showTodosStyle["todos-wrapper"]}>
        {todos.map((todo) => {
          return (
            <div key={todo.ID} className={showTodosStyle["todo"]}>
              <div className={showTodosStyle["title"]}>
                <label>Title</label>
                <h1>{todo.title}</h1>
              </div>

              <div className={showTodosStyle["category"]}>
                <label>Category</label>
                <h4>{todo.category}</h4>
              </div>

              <div className={showTodosStyle["checked"]}>
                <label>Complete</label>
                <h4>
                  {todo.checked !== 0 ? (
                    "Not yet"
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="green"
                      width="48"
                      height="48"
                    >
                      <path d="M21.05 33.1L35.2 18.95L32.9 16.7L21.0500001 28.550001L15.050001 22.550001L12.800001 24.800001L21.05 33.1zM24 44C 21.266666 44 18.683334 43.475 16.25 42.425C 13.816668 41.375 11.691668 39.941666 9.875 38.125C 8.058333 36.308334 6.625 34.183334 5.575 31.75C 4.525 29.316668 4 26.733334 4 24C 4 21.233334 4.525 18.633335 5.575 16.2C 6.625 13.766668 8.058333 11.650002 9.875 9.85C 11.691668 8.050001 13.816668 6.625001 16.25 5.5750003C 18.683334 4.525 21.266666 4 24 4C 26.766666 4 29.366667 4.525 31.8 5.575C 34.233337 6.625 36.350002 8.05 38.149998 9.85C 39.95 11.650001 41.375 13.766667 42.425 16.2C 43.475 18.633335 44 21.233334 44 24C 44 26.733334 43.475 29.316668 42.425 31.75C 41.375 34.183334 39.95 36.308334 38.149998 38.125C 36.949997 39.336113 34.83333 40.769444 31.799997 42.425C 29.366665 43.475 26.766666 44 24 44zM24 41C 28.733334 41 32.75 39.341667 36.05 36.025C 39.35 32.708336 41 28.7 41 24C 41 19.266666 39.35 15.25 36.05 11.95C 32.75 8.650001 28.733334 7.0000005 24 7C 19.300001 7.0000005 15.291668 8.650001 11.975 11.95C 8.658334 15.25 7.0000005 19.266666 7 24C 7.0000005 28.7 8.658334 32.708336 11.975 36.025C 15.291668 39.341667 19.300001 41 24 41z" />
                    </svg>
                  )}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowTodos;
