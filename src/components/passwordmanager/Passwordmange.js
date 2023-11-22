// PasswordManager.js

import React, { useState, useContext, useEffect } from 'react';
import './password.css';
import { useNavigate } from 'react-router-dom';
import PasswordContext from '../../context/passwords/PasswordContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEye as faEyeSolid } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/auth/AuthContext';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PasswordManager = (props) => {
  const {checkTokenExpiration, isAuthenticated} = useAuth();
  const [newWebsite, setNewWebsite] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const navigator = useNavigate();
  const passwordContext = useContext(PasswordContext);

  const { passwords, addPassword, deletePassword, getPasswords, editPassword } = passwordContext;

  // Check if the user is not logged in
  useEffect(() => {
    checkTokenExpiration();
    if (localStorage.getItem('token')) {
      getPasswords();
    } else {
      navigator('/login');
    }
  }, []);

  const togglePasswordEntryVisibility = (entryId) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [entryId]: !prevVisibility[entryId],
    }));
  };

  const addPass = () => {
    if (newWebsite.trim() !== '' && newUsername.trim() !== '' && newPassword.trim() !== '') {
      if (editIndex !== -1) {
        const updatedPasswords = [...passwords];
        updatedPasswords[editIndex] = {
          id: passwords[editIndex].id,
          website: newWebsite,
          username: newUsername,
          password: newPassword,
        };
        editPassword(passwords[editIndex].stringId, updatedPasswords[editIndex]);
        props.showAlert("Password Updated", "success");
        setEditIndex(-1);
      } else {
        const newPasswordEntry = { website: newWebsite, username: newUsername, password: newPassword };
        addPassword(newPasswordEntry);
        props.showAlert("New Password Created","success")
      }

      setNewWebsite('');
      setNewUsername('');
      setNewPassword('');
    }
  };

  const editPass = (index) => {
    const passwordToEdit = passwords[index];
    setNewWebsite(passwordToEdit.website);
    setNewUsername(passwordToEdit.username);
    setNewPassword(passwordToEdit.password);
    setEditIndex(index);
  };

  const deletePass = (index) => {
    deletePassword(passwords[index].stringId);
    props.showAlert("Password Deleted", "success");
  };

  return (
    <div className="password-manager my-5">
      <h2>Password Manager</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Website Name"
          value={newWebsite}
          onChange={(e) => setNewWebsite(e.target.value)}
          className="text-input"
        />
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="text-input"
        />
        <div className="password-input-container">
          <input
            type={passwordVisibility[editIndex] ? 'text' : 'password'}
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="text-input"
          />
          <button
            className="password-visibility-button"
            onClick={() => togglePasswordEntryVisibility(editIndex)}
          >
            {passwordVisibility[editIndex] ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </button>
        </div>
        <button onClick={(e) => addPass(e)} className="btn btn-primary">
          {editIndex !== -1 ? 'Update Password' : 'Add Password'}
        </button>
      </div>
      <div className="list-container">
        <h2>Password Lists</h2>
        <ul className="list-group n">
          {passwords.map((entry, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>
               <b> Website: </b>{entry.website}  <b> Username: </b>{entry.username}  <b> Password:</b>{' '}
                {passwordVisibility[index] ? entry.password : '••••••••'}
              </span>
              <div>
              <button
                className="password-visibility-button"
                onClick={() => togglePasswordEntryVisibility(index)}
              >
                {passwordVisibility[index] ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
              <FontAwesomeIcon
                icon={faEdit}
                className="action-icon edit-icon"
                onClick={() => editPass(index)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="action-icon delete-icon"
                onClick={() => deletePass(index)}
              />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordManager;
