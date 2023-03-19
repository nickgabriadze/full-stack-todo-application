import homeStyles from "./home.module.css";
import { Link } from "react-router-dom";


export const handleLogout = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.location.href = "/";
};

export const Home = () => {
  const whoIsLoggedIn = window.localStorage.getItem("username");
  const conditionOfLoggedIn =
    whoIsLoggedIn?.trim().length !== 0 && whoIsLoggedIn !== null;

  sessionStorage.clear();

  return (
    <>
      <div className={homeStyles["home-wrapper"]}>
        <nav className={homeStyles["navigation"]}>
          <div className={homeStyles["log-in"]}>
            <Link
              to={
                conditionOfLoggedIn
                  ? `/account/${whoIsLoggedIn}`
                  : "/account/login"
              }
            >
              <h3>
                {conditionOfLoggedIn
                  ? `Logged In As ${whoIsLoggedIn}`
                  : `LOG IN`}
              </h3>
            </Link>
          </div>

          <div className={homeStyles["website-title"]}>
            <h1>TODOER</h1>
          </div>

          <div className={homeStyles["sign-up"]}>
            <Link to={"/account/signup"}>
              {conditionOfLoggedIn ? (
                <h3 onClick={handleLogout}>LOG OUT</h3>
              ) : (
                <h3>SIGN UP</h3>
              )}
            </Link>
          </div>
        </nav>

        <div className={homeStyles["middle-section"]}>
          <div className={homeStyles["welcome-section"]}>
            <h1> WELCOME! </h1>
            <h3>Productivity Starts With US</h3>
          </div>

          <div className={homeStyles["what-to-do"]}>
            <div>
              <img src="/add-task-icon.svg" height={48} width={48} />
              <p>Add</p>
            </div>

            <div>
              <img src="/check-icon.svg" height={48} width={48} />
              <p>Complete</p>
            </div>

            <div>
              <img src="/repeat.svg" height={48} width={48} />
              <p>Repeat</p>
            </div>
          </div>
        </div>

        <footer>
          <div className={homeStyles["message"]}>
            <h4>
              Please SIGN UP or LOG IN in order to be able to use the service to
              its fullest capacity
            </h4>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
