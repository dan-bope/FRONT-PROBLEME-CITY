import React, { useContext } from "react";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Home = () => {
  // On va verifie si notre utilisateur est connecté
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">{uid ? <NewPostForm /> : null}</div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
              {uid && <FriendsHint/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
