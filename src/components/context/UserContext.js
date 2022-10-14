import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext(null);

const UserProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userID, setUserID] = useState(0);
    const [userAdmin, setUserAdmin] = useState(0);
    const [username, setUsername] = useState("");
    let tokenDecode;

    useEffect(() => {
        console.log (token, "se activo"); 
        if (token) {
            tokenDecode = jwt_decode(token);
            setUserID(tokenDecode.id);
            setUserAdmin(tokenDecode.admin);
            setUsername(tokenDecode.username);
        }else {
            setUserID(0);
            setUserAdmin(0);
            setUsername("");
        }
    }, [token])

    return (
        <UserContext.Provider value={{userID, userAdmin, setToken, username}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider