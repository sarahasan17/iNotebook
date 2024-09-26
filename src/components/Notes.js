import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes() {
      const noteval = useContext(noteContext);
      const { notes, addNote } = noteval;
  return (
    <>
      <AddNote />
      <div className="row md-3">
        <h2>Your notes</h2>
        {notes.map((note) => (
          <NoteItem note={note} />
        ))}
      </div>
    </>
  );
}

export default Notes
