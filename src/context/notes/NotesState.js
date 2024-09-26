import noteContext from "./notesContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "66f3e5178481d4612a9de433",
      user: "66f3e31e8481d4612a9de42f",
      title: "you are good",
      description: "you are a good person and I respect you",
      tag: "personal",
      date: "2024-09-25T10:25:27.132Z",
      __v: 0,
    },
    {
      _id: "66f51748d4d56dd114b77891",
      user: "66f3e31e8481d4612a9de42f",
      title: "Yuo got it girl",
      description: "I am so so so so proud of you",
      tag: "personal",
      date: "2024-09-26T08:11:52.292Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  const addNote=(title,description,tag)=>{
    console.log("adding a new note")
    const note={
      _id: "66f3e5178481d4612a9de123",
      user: "66f3e31e8481d4612a9de72f",
      title: title,
      description: description,
      tag: tag,
      date: "2024-09-25T10:25:27.132Z",
      __v: 0,
    };
    setNotes(notes.concat(note))
    console.log(notes)
  }

  const deleteNote=(id)=>{
    console.log("deleting note"+id)
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{notes,setNotes,addNote,deleteNote}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
