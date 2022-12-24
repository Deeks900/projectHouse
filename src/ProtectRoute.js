import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function ProtectRoute({children}) {
    const navigate = useNavigate();
    const emailVerified = useSelector((state)=>state.firebaseReducer.auth.emailVerified);
    
    useEffect(()=>{
        console.log("The value of email verified is", emailVerified)
        if(emailVerified != true){
            return navigate("/signin")
        }
    }, [])

    return children
    
}

export default ProtectRoute