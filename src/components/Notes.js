import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/notesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes() {
      const noteval = useContext(noteContext);
      const { notes, getNotes,editNote } = noteval;
      const [note, setNotes] = useState({
        id:"",
        title: "",
        description: "",
        tag: "",
      });
      useEffect(()=>{
        getNotes()
      },[])
      const updateNote = (currentNote) => {
         ref.current.click();
         setNotes({
           id: currentNote._id, // Set the correct id here
           title: currentNote.title,
           description: currentNote.description,
           tag: currentNote.tag,
         });
      };
      const ref=useRef(null)
      const refclose = useRef(null);

       const handleClick = (e) => {
         e.preventDefault();
         editNote(note.id, note.title, note.description, note.tag); // Ensure id is passed here
         refclose.current.click(); // Close modal after editing
       };

       const onChange = (e) => {
         setNotes({ ...note, [e.target.name]: e.target.value });
       };
  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Update Notes</h5>
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={onChange}
                    value={note.title}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                    value={note.description}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                  />
                </div>
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                <div className="col-mx-3">
                  <button
                    ref={refclose}
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary mx-2"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    onClick={handleClick}
                    className="btn btn-primary mx-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row md-3">
        <h2>Your notes</h2>
          {notes.length === 0 && "No notes available"}
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
}

export default Notes
