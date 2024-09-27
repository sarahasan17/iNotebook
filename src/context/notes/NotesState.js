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
    // setNotes(notes.concat(note));
    // console.log(notes);
  }

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmM2UzMWU4NDgxZDQ2MTJhOWRlNDJmIn0sImlhdCI6MTcyNzI1OTQyMn0.d9nohM0RWeHm2DfTJPjTqs_kAXqrc1cCUTKRM-EqV2U",
        },
        body: JSON.stringify({ title, description, tag }), // Pass note data
      });

      const json = await response.json(); // Await the response
      setNotes(notes.concat(json)); // Update state with the new note
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };


  const deleteNote=async(id)=>{
     const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         auth_token:
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmM2UzMWU4NDgxZDQ2MTJhOWRlNDJmIn0sImlhdCI6MTcyNzI1OTQyMn0.d9nohM0RWeHm2DfTJPjTqs_kAXqrc1cCUTKRM-EqV2U",
       },
     });
    const json = await response.json();
    console.log("deleting note"+id)
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }

  const editNote = async (id, title, description, tag)=>{
     const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
         auth_token:
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmM2UzMWU4NDgxZDQ2MTJhOWRlNDJmIn0sImlhdCI6MTcyNzI1OTQyMn0.d9nohM0RWeHm2DfTJPjTqs_kAXqrc1cCUTKRM-EqV2U",
       },
       body: JSON.stringify({ title, description, tag }),
     });
     const json = await response.json();
    //  let newNotes=JSON.parse(JSON.stringify(json))
    //  console.log(newNotes);
    // for(let i=0;i<notes.length;i++){
    //   if(newNotes[i]._id===id){
    //     newNotes[i].title=title;
    //     newNotes[i].description = description;
    //     newNotes[i].tag = tag;
    //     break;
    //   }
    // }
    // setNotes(newNotes)
    getNotes();
  };

  
  return (
    <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
