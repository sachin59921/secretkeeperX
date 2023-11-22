import { createContext, useContext, useState,useEffect } from "react";
import host from "../../Utility";
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthState = (props) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const response = await fetch(`${host}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        });

        const status = await response.status;
        const json = await response.json();
        if (status==200) {
            setUser(username);
            console.log("User authenticated")
            localStorage.setItem('token', json.jwtToken);            
            return true;
        }
        else {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const signup = async (credential) => {
        const { username, email, password, cpassword } = credential;
        const response = await fetch(`${host}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        console.log(response);
        if (response.ok) {
            return true;
        }
        else {
            return false;
        }
    }

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token'); // Retrieve the JWT from storage
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();

            if (currentTime > expirationTime) {
                logout();
            }
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout,signup ,checkTokenExpiration}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
