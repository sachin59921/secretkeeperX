import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
            <FontAwesomeIcon
                icon={faEdit} className="action-icon delete-icon mx-2" onClick={()=>{deleteNote(note.stringId); props.showAlert("Deleted sucessfully", "success")}}/>
            
            <FontAwesomeIcon
                icon={faTrash} className="action-icon edit-icon mx-2" onClick={()=>{updateNote(note)}}/>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div> 
  )
}

export default NoteItem