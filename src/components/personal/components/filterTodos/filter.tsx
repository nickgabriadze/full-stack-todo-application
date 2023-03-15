import { useState, useEffect } from "react";
import retrieveTodos from "../showTodos/api";
import filterStyles from "./filter.module.css";
import { Todo } from "../showTodos/showTodos";

const FilterTodos = ({ forUser }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  
  return (
    <>
      <div className={filterStyles["filter-wrapper"]}></div>
    </>
  );
};

export default FilterTodos;
