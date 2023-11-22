import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

const Notes = (props) => {
    const {checkTokenExpiration}  = useAuth();
    const context = useContext(noteContext);
    const { notes, getNotes , editNote} = context;
    const navigator = useNavigate();

    
    useEffect(() => {
        checkTokenExpiration();
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigator("/login")
        }
    }, [])
    
    const ref = useRef(null);
    const refClose = useRef(null);
    const[note, setNote] = useState({id:'',etitle:'',edesciption:''})

    const updateNote = (currnote) => {
        // console.log(currnote);
        ref.current.click();
        setNote({id:currnote.stringId,etitle:currnote.title,edesciption:currnote.description})
    }

    const handleClick =(e)=>{
        // console.log("updating the note")
        editNote(note.id, note.etitle, note.edesciption, note.etag)
        refClose.current.click();
        props.showAlert("Updated sucessfully", "success")
    }

    const onChange= (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }  

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary  d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exam pleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body"> 
                            <form>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />                    </div>
                                <div className="form-group">
                                    <label htmlFor="edesciption">Description</label>
                                    <textarea type="text" className="form-control" value={note.edesciption} id="edesciption" name="edesciption" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button  ref ={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edesciption<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'><h1>Your a Note</h1>
            <div className ="container mx-2">
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note.stringId} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}</div>

        </>
    )
}

export default Notes