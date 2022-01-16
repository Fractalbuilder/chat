import React from 'react';
import {useState, useEffect, createContext} from 'react';

export const AuthContext = createContext();

export const ContextProvider = (props) => {
    const getCookie = (name) => {
        var cookieArr = document.cookie.split(";");
        
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");

            if(name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        
        return null;
    }

    const userId = getCookie('userId');
    var initialAuth;
    
    if(userId){
        initialAuth = {
            authenticated: true,
            userId: userId,
            username: getCookie('username')
        };
    } else {
        initialAuth = {
            authenticated: getCookie('userId') ? true : false,
            userId: -1,
            username: ''
        };
    }

    const [auth, setAuth] = useState(initialAuth);

    useEffect(() => {
        if(userId){
            setAuth({
                authenticated: true,
                userId: userId,
                username: getCookie('username')
            });
        }
        
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth, getCookie]}>
            {props.children}
        </AuthContext.Provider>
    )
}
