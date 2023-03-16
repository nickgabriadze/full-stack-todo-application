import { useState, useEffect } from "react";
import retrieveTodos from "../showTodos/api";
import filterStyles from "./filter.module.css";
import { Todo } from "../showTodos/showTodos";
import { filterByCategory, filterByCompleteness, mapCategories } from "./filterers";
import { each, is } from "immer/dist/internal";
import { getTimeDifference } from "../showTodos/timeDiff";

const FilterTodos = ({ forUser }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [completedFilter, setCompletedFilter] = useState<boolean>(false);
  const [categoryFilterButton, setCategoryFilterButton] = useState({
    filterID: -1,
    categoryToFilter: "",
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
          <div className={filterStyles["filter-buttons"]}>
            <button
              style={
                activeFilter.button1
                  ? { backgroundColor: "rgb(225, 220, 234)" }
                  : { backgroundColor: "inherit" }
              }
              onClick={() => {
                setCategories(mapCategories(todos));
                setActiveFilter({
                  ...activeFilter,
                  button1: !activeFilter.button1,
                  button2: false,
                });
              }}
            >
              Category
            </button>
            <button
              style={
                activeFilter.button2
                  ? { backgroundColor: "rgb(225, 220, 234)" }
                  : { backgroundColor: "inherit" }
              }
              onClick={() => {
                setActiveFilter({
                  ...activeFilter,
                  button1: false,
                  button2: !activeFilter.button2,
                });

                setCategoryFilterButton({
                  ...categoryFilterButton,
                  filterID: -1,
                  categoryToFilter: "",
                });
              }}
            >
              Completeness
            </button>
          </div>

          <div className={filterStyles["filter-options"]}>
            <div className={filterStyles["categories"]}>
              {activeFilter.button1 &&
                categories.map((eachCategory, index) => {
                  return (
                    <div key={index}>
                      <button
                        onClick={() => {
                          setCategoryFilterButton({
                            ...categoryFilterButton,
                            filterID: index,
                            categoryToFilter: eachCategory,
                          });
                        }}
                        style={
                          index === categoryFilterButton.filterID
                            ? { backgroundColor: "rgb(225, 220, 234)" }
                            : { backgroundColor: "inherit" }
                        }
                      >
                        {eachCategory}
                      </button>
                    </div>
                  );
                })}
            </div>

            <div className={filterStyles["completed-filter"]}>
              {activeFilter.button2 && (
                <>
                  <button 
                  style={completedFilter ? { backgroundColor: "rgb(225, 220, 234)" }
                  : { backgroundColor: "inherit" }}
                  onClick={() => {setCompletedFilter(true)}}>Complete</button>
                  <button 
                  style={!completedFilter ? { backgroundColor: "rgb(225, 220, 234)" }
                  : { backgroundColor: "inherit" }}
                  onClick={() => {setCompletedFilter(false)}}>Incomplete</button>
                </>
              )}
            </div>

            <div className={filterStyles["filtered"]}>
              {activeFilter.button1 && categoryFilterButton.filterID !== -1 && (
                <div className={filterStyles["filtered-by-categories"]}>
                  {filterByCategory(
                    todos,
                    categoryFilterButton.categoryToFilter
                  ).map((eachTodo) => {
                    return (
                      <div
                        key={eachTodo.ID}
                        className={filterStyles["each-filtered-by-category"]}
                      >
                        <div>
                          <p>Title</p>
                          <h1>{eachTodo.title}</h1>
                        </div>
                        <div>
                          <p>Completed</p>
                          {eachTodo.checked === 0 ? (
                            <h3>Not yet</h3>
                          ) : (
                            <img src="/checked-icon.svg"></img>
                          )}
                        </div>
                        <div>
                          <p>Added</p>
                          <h4>{getTimeDifference(new Date(eachTodo.date))}</h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeFilter.button2 && (completedFilter === true || completedFilter === false) && (
               <div className={filterStyles['filtered-by-completeness']}>
                  {
                    filterByCompleteness(todos, completedFilter).map((eachTodo, index) => {
                      return(<div key={index} 
                      style={completedFilter ? {border:'1px solid green'} : {border: '1px solid red'}}
                      className={filterStyles['each-filtered-by-completeness']}>
                        <div>
                          <p>Title</p>
                          <h1>{eachTodo.title}</h1>
                        </div>
                        <div>
                          <p>Category</p>
                         <h2>{eachTodo.category}</h2>
                        </div>
                        <div>
                          <p>Added</p>
                          <h4>{getTimeDifference(new Date(eachTodo.date))}</h4>
                        </div>
                      </div>)
                  })
                }
               </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterTodos;
