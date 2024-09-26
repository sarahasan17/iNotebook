import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/notesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes() {
      const noteval = useContext(noteContext);
      const { notes, getNotes } = noteval;
      useEffect(()=>{
        getNotes()
      },[])
  return (
    <>
      <AddNote />
      <div className="row md-3">
        <h2>Your notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
}

export default Notes
