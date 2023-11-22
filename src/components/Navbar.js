import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';


const Navbar = () => {
    const { logout } = useAuth();
    const navigator = useNavigate();
    const handelLogout = () => {
        logout();
        navigator('/login');
    }
    let location = useLocation();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="container-fluid">
                    <Link to="/">
                        <img src="/logo.png" alt="SecretKeeperX Logo" />
                    </Link>


                    <button
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : " "}`} aria-current="page" to="/">Notes</Link>
                            </li>
                            <li class="nav-item">
                                <Link class={`nav-link ${location.pathname === "/passwordmanager" ? "active" : " "}`} to="/passwordmanager">Password</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
                        </form> : <button onClick={handelLogout} className='btn btn-primary'>Logout</button>}

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar