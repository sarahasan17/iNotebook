import React, { useContext } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

function Home(props) {
  const {showAlert}=props
  return (
    <div className="container">
      <Notes showAlert={showAlert}/>
    </div>
  );
}

export default Home;
