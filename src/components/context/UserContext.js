import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext(null);

const UserProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userID, setUserID] = useState(0);
    const [userAdmin, setUserAdmin] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    let tokenDecode;

    useEffect(() => {
        console.log (token, "se activo"); 
        if (token) {
            tokenDecode = jwt_decode(token);
            setUserID(tokenDecode.id);
            setUserAdmin(tokenDecode.admin);
            setUsername(tokenDecode.username);
            setEmail(tokenDecode.email)
            console.log ("token decode", tokenDecode)
        }else {
            setUserID(0);
            setUserAdmin(0);
            setUsername("");
            setEmail("");
        }
    }, [token])


    return (
        <UserContext.Provider value={{userID, userAdmin, setToken, username, token}}>
            {props.children}
        </UserContext.Provider>
    )
}




export default UserProvider