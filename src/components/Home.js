import React, { useContext } from "react";
import Notes from "./Notes";

function Home() {
  return (
    <div className="container">
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Your note
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Notes/>
    </div>
  );
}

export default Home;
