import noteContext from "./notesContext";
import { useState } from "react";
const NoteState = (props) => {
  const host='http://localhost:5000'
  const notesInitial = [
  ];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/getAllNotes`, {
      method: "GET",
      headers: {
        auth_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmM2UzMWU4NDgxZDQ2MTJhOWRlNDJmIn0sImlhdCI6MTcyNzI1OTQyMn0.d9nohM0RWeHm2DfTJPjTqs_kAXqrc1cCUTKRM-EqV2U",
      },
    });
    const json = await response.json();
    setNotes(json);
    console.log(json)
    // setNotes(notes.concat(note));
    // console.log(notes);
  }

  const addNote=async (title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addNotes`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "auth-token":
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmM2UzMWU4NDgxZDQ2MTJhOWRlNDJmIn0sImlhdCI6MTcyNzI1OTQyMn0.d9nohM0RWeHm2DfTJPjTqs_kAXqrc1cCUTKRM-EqV2U",
       },
       body: JSON.stringify(),
     });
     const json = response.json({ title, description, tag });
    // setNotes(notes.concat(note))
    // console.log(notes)
  }

  const deleteNote=(id)=>{
    console.log("deleting note"+id)
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }

  const editNote = async (id, title, description, tag)=>{
     const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "auth-token":
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmM2UzMWU4NDgxZDQ2MTJhOWRlNDJmIn0sImlhdCI6MTcyNzI1OTQyMn0.d9nohM0RWeHm2DfTJPjTqs_kAXqrc1cCUTKRM-EqV2U",
       },
       body: JSON.stringify(),
     });
     const json = response.json({ title, description, tag });
    for(let i=0;i<notes.length;i++){
      let ele=notes[i]
      if(ele._id===id){
        ele.title=title;
        ele.description=description;
        ele.tag=tag;
      }
    }
  };

  
  return (
    <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
