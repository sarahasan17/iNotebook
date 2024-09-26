import React,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/notesContext'

function About() {
    const a=useContext(noteContext)
    useEffect(() => {
      a.update();
    }, []);
  return (
    <div>
      This is about {a.state.name} from {a.state.class}
    </div>
  )
}

export default About
