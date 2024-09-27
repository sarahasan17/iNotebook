import React from 'react'
import { useContext } from 'react';
import noteContext from "../context/notes/notesContext";

function NoteItem(props) {
    const {note,updateNote} =props
     const noteval = useContext(noteContext);
     const {deleteNote,editNote } = noteval;
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => deleteNote(note._id)}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => updateNote(note)} // Correct this line
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem
