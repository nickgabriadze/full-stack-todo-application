import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import personalStyle from "./persona.module.css";
import AddTodos from "./components/addTodo/addTodos";
import ShowTodos from "./components/showTodos/showTodos";
import Head from "../head";
import FilterTodos from "./components/filterTodos/filter";
import Settings from "./components/settings/settings";

interface Advice {
  slip: {
    id: number;
    advice: string;
  };
}

const Personal = () => {
  const username = useParams().username;

  const [advice, setAdvice] = useState<Advice>();
  const [wantToLogOut, setWantToLogOut] = useState<number>(0);
  const [active, setActive] = useState<{
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
  }>({
    1: true,
    2: false,
    3: false,
    4: false,
  });

  const handleAdvices = async () => {
    try {
      const response = await fetch(`https://api.adviceslip.com/advice`);
      const data: Advice = await response.json();
      setAdvice(data);
    } catch (err) {}
  };

  useEffect(() => {
    handleAdvices();
  }, []);

  if (
    localStorage.getItem("username") !== username &&
    sessionStorage.getItem("username") !== username
  ) {
    return (
      <>
        <Head title={`${username} not found`} />
        <h1 className={personalStyle["not-logged-in"]}>
          Please log in to see your personal todos
        </h1>
      </>
    );
  }

  const handleLogout = () => {
    if (wantToLogOut === 1) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <>
      <title>{`${username}'s TODOs`}</title>
      <div className={personalStyle["personal-wrapper"]}>
        <nav>
          <div className={personalStyle["welcome-user"]}>
            <h1>{`Hey ${username}`}</h1>
            <p>{advice?.slip.advice}</p>
          </div>

          <div className={personalStyle["all-about-todos"]}>
            <div
              onClick={() => {
                setActive({ ...active, 1: true, 2: false, 3: false });
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
                setActive({ ...active, 1: false, 2: false, 3: false, 4: true });
              }}
              style={
                active[4]
                  ? { backgroundColor: "#e1dcea" }
                  : { backgroundColor: "inherit" }
              }
            >
              <h1>Settings</h1>
            </div>
            <div
              onClick={() => {
                setWantToLogOut((state) => state + 1);
                handleLogout();
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

        <div>
          {(active[1] && <ShowTodos forUser={username} />) ||
            (active[2] && <AddTodos forUser={username} />) ||
            (active[3] && <FilterTodos forUser={username} />) ||
            (active[4] && <Settings user={username}/>)}
        </div>
      </div>
    </>
  );
};

export default Personal;
