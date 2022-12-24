import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({children}) => {
    const user = useSelector((state)=>state.firebaseReducer.auth.email);
    const emailVerified = useSelector((state)=>state.firebaseReducer.auth.emailVerified);
    const userLoggedIn = useSelector((state)=>state.firebaseReducer.auth.uid);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!userLoggedIn)
        navigate("/signIn")
    }, [userLoggedIn])

    if(userLoggedIn){
        return children;
    }
}

export default ProtectRoute;


