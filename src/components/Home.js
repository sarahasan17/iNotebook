import React, { useContext } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

function Home() {
  return (
    <div className="container">
      <Notes/>
    </div>
  );
}

export default Home;
