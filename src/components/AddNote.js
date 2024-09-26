import React, { useContext,useState } from 'react'
import noteContext from "../context/notes/notesContext";

function AddNote() {
    const noteval = useContext(noteContext);
    const {addNote} = noteval;
    const [note, setNotes] = useState({
      title: "",
      description: "",
      tag: "default",
    });
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    };
    const onChange = (e) => {
        setNotes({...note,[e.target.name]:e.target.value})
    };
  return (
    <div>
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
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
          />
        </div>
        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        <button type="submit" onClick={handleClick} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNote
