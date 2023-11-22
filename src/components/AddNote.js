import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const[note, setNote] = useState({title:'',desciption:''})
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.desciption, note.tag);
        setNote({title:'',desciption:'',tag:''})
        props.showAlert("Added sucessfully", "success")
    }

    const onChange= (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    return (
        <div className="shadow p-5 rounded container my-3">
            <div>
                <h1>Add a Note</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title"  name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>                 
                        </div>
                    <div className="form-group">
                        <label htmlFor="desciption">Note</label>
                        <textarea type="text" className="form-control" id="exampleFormControlTextarea1" name="desciption" value={note.desciption} onChange={onChange} minLength={5} required/>
                    </div>
                   
                    
                    <button disabled={note.title.length<5 || note.desciption<5} type="submit" className="my-2 btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote