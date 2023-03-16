import { useState, useEffect } from "react";
import retrieveTodos from "../showTodos/api";
import filterStyles from "./filter.module.css";
import { Todo } from "../showTodos/showTodos";
import { mapCategories } from "./filterers";
import { each, is } from "immer/dist/internal";

const FilterTodos = ({ forUser }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [FilterButton, setFilterButton] = useState({

  });
  const [activeFilter, setActiveFilter] = useState({
    button1: false,
    button2: false,
  });


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
      <div className={filterStyles["filter-wrapper"]}>
        <div className={filterStyles["filter-based-on"]}>
          <div>
          <h1>Filter By</h1>
          </div>
          <div className={filterStyles['filter-buttons']}>
            <button 
            style={activeFilter.button1 ? {backgroundColor: "rgb(225, 220, 234)"} : {backgroundColor: "inherit"}}
            onClick={() => {
              setCategories(mapCategories(todos))
              setActiveFilter({
                ...activeFilter,
                button1: !activeFilter.button1,
                button2: false
              })
            }}>Category</button>
            <button
            style={activeFilter.button2 ? {backgroundColor: "rgb(225, 220, 234)"} : {backgroundColor: "inherit"}}
              onClick={() => {
               
                setActiveFilter({
                ...activeFilter,
                button1: false,
                button2: !activeFilter.button2,
              })


            }}
            >Completeness</button>
          </div>
          <div className={filterStyles['filter-options']}>
            {activeFilter.button1 && categories.map((eachCategory) => {
             
              return (<>
              <button>{eachCategory}</button>
              </>)
            })}


            {activeFilter.button2 && <>HI</>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterTodos;
