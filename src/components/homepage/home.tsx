import homeStyles from "./home.module.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className={homeStyles["home-wrapper"]}>
        <nav className={homeStyles["navigation"]}>
          <div className={homeStyles["personal-space"]}>
            <h3>Personal Space</h3>
          </div>

          <div className={homeStyles["log-in"]}>
            <Link to={"/account/login"}>
              <h3>LOG IN</h3>
            </Link>
          </div>

          <div className={homeStyles["website-title"]}>
            <h1>TODOER</h1>
          </div>

          <div className={homeStyles["sign-up"]}>
            <Link to={"/account/signup"}>
              <h3>SIGN UP</h3>
            </Link>
          </div>

          <div className={homeStyles["about"]}>
            <h3>ABOUT</h3>
          </div>
        </nav>

        <div className={homeStyles["middle-section"]}>
          <div className={homeStyles["welcome-section"]}>
            <h1> WELCOME! </h1>
            <h3>Productivity Starts With US</h3>
          </div>

          <div className={homeStyles["what-to-do"]}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                fill="#947ac4"
                width="48"
              >
                <path d="M24 44q-4.25 0-7.9-1.525-3.65-1.525-6.35-4.225-2.7-2.7-4.225-6.35Q4 28.25 4 24q0-4.2 1.525-7.85Q7.05 12.5 9.75 9.8q2.7-2.7 6.35-4.25Q19.75 4 24 4q3.75 0 7 1.2t5.85 3.3l-2.15 2.15q-2.2-1.75-4.9-2.7Q27.1 7 24 7q-7.25 0-12.125 4.875T7 24q0 7.25 4.875 12.125T24 41q1.85 0 3.575-.35T30.9 39.6l2.25 2.3q-2.05 1-4.35 1.55T24 44Zm14.5-4.5v-6h-6v-3h6v-6h3v6h6v3h-6v6Zm-17.45-6.4-8.25-8.3 2.25-2.25 6 6 20.7-20.7 2.3 2.25Z" />
              </svg>
              <p>Add</p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#947ac4"
                height="48"
                width="48"
              >
                <path d="M21.05 33.1 35.2 18.95l-2.3-2.25-11.85 11.85-6-6-2.25 2.25ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
              </svg>
              <p>Complete</p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#947ac4"
                height="48"
                width="48"
              >
                <path d="M24 33.5q-3.8 0-6.525-2.6-2.725-2.6-2.975-6.4h2q.2 3 2.35 5t5.15 2q3.15 0 5.325-2.175Q31.5 27.15 31.5 24q0-3.15-2.175-5.325Q27.15 16.5 24 16.5h-.3l2.95 3-1.4 1.45-5.3-5.3 5.3-5.3 1.45 1.45-2.7 2.7q3.95.1 6.725 2.85Q33.5 20.1 33.5 24q0 3.95-2.775 6.725Q27.95 33.5 24 33.5ZM24 44q4.15 0 7.775-1.575t6.35-4.3q2.725-2.725 4.3-6.375Q44 28.1 44 24q0-4.15-1.575-7.8-1.575-3.65-4.3-6.35-2.725-2.7-6.35-4.275Q28.15 4 24 4t-7.8 1.575Q12.55 7.15 9.85 9.85q-2.7 2.7-4.275 6.35Q4 19.85 4 24q0 4.1 1.575 7.75Q7.15 35.4 9.85 38.125t6.35 4.3Q19.85 44 24 44Zm0-3q-7.1 0-12.05-4.975Q7 31.05 7 24q0-7.1 4.95-12.05Q16.9 7 24 7q7.05 0 12.025 4.95Q41 16.9 41 24q0 7.05-4.975 12.025Q31.05 41 24 41Zm0-17Z" />
              </svg>
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
