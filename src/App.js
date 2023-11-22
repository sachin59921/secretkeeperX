import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoteState from './context/notes/NotesState';
import { useState } from 'react';
import Notes from './components/Notes';
import PasswordState from './context/passwords/PasswordState';
import PasswordManager from './components/passwordmanager/Passwordmange';
import AuthState from './context/auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  return (
    <>
      <AuthState>
        <NoteState>
          <PasswordState>
            <BrowserRouter>
              <Navbar />
              {/* <Alert alert={alert} /> */}
              <ToastContainer />
              <div className="container my-5">
                <Routes>
                  <Route exact path="/" element={<Home showAlert={showAlert} />} />
                  <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
                  <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                  <Route exact path="/notes" element={<Notes showAlert={showAlert} />} />
                  <Route exact path="/passwordmanager" element={<PasswordManager showAlert={showAlert} />} />
                </Routes>
              </div>
            </BrowserRouter>
          </PasswordState>
        </NoteState>
      </AuthState>
    </>
  );
}

export default App;
