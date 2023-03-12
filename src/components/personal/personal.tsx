import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import { useState } from "react";
import personalStyle from "./persona.module.css";
import AddTodos from "./components/addTodo/addTodos";

const Personal = () => {
  const username = useParams().username;
  const [wantToLogOut, setWantToLogOut] = useState<number>(0);
  const [active, setActive] = useState<{ 1: boolean; 2: boolean; 3: boolean }>({
    1: false,
    2: false,
    3: false,
  });


  return (
    <>
      <title>{`${username}'s TODOs`}</title>
      <div className={personalStyle["personal-wrapper"]}>
        <nav>
          <div className={personalStyle["welcome-user"]}>
            <h1>{`Hey ${username}`}</h1>
            <p>Staying neat is a key!</p>
          </div>

          <div className={personalStyle["all-about-todos"]}>
            <div
              onClick={() => {
                setActive({ ...active, 1: !active[1], 2: false, 3: false });
              }}
              style={
                active[1]
                  ? { backgroundColor: "#e1dcea" }
                  : { backgroundColor: "inherit" }
              }
              className={personalStyle["show-todo"]}
              tabIndex={1}
            >
              <h1>Show Todos</h1>
            </div>

            <div
              onClick={() => {
                setActive({ ...active, 1: false, 2: true, 3: false });
              }}
              style={
                active[2]
                  ? { backgroundColor: "#e1dcea" }
                  : { backgroundColor: "inherit" }
              }
              className={personalStyle["add-todo"]}
              tabIndex={1}
            >
              <h1>Add Todos</h1>
            </div>

            <div
              onClick={() => {
                setActive({ ...active, 1: false, 2: false, 3: true });
              }}
              style={
                active[3]
                  ? { backgroundColor: "#e1dcea" }
                  : { backgroundColor: "inherit" }
              }
              className={personalStyle["filter-todo"]}
              tabIndex={1}
            >
              <h1>Filter Todos</h1>
            </div>
            <div
              onClick={() => {
                setWantToLogOut((state) => state + 1);
                setTimeout(() => {
                  setWantToLogOut(0);
                }, 2000);
              }}
              className={personalStyle["log-out"]}
              tabIndex={1}
            >
              <h1>{wantToLogOut ? "Confirm" : "Log Out"}</h1>
            </div>
          </div>
        </nav>


        {active[2] ? <AddTodos forUser={username}/> : ''}

      </div>
    </>
  );
};

export default Personal;
