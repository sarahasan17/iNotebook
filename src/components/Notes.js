import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";
import NoteItem from "./NoteItem";

function Notes() {
      const noteval = useContext(noteContext);
      const { notes, setNotes } = noteval;
  return (
    <>
      <div className="row md-3">
        <h2>Your notes</h2>
        {notes.map((note) => (
          <NoteItem note={note}/>
        ))}
      </div>
    </>
  );
}

export default Notes
