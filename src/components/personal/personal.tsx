import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import personalStyle from "./persona.module.css";

const Personal = () => {
    const username = useParams().username;
    const stuff = useAppSelector(state => state.userReducer.username);

    

  return (
    <>
    <title>{`${username}'s TODOs`}</title>
      <div className={personalStyle['personal-wrapper']}>
      {stuff}
      </div>
    </>
  );
};

export default Personal;
