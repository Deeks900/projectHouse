import { async } from '@firebase/util';
import * as actions from './actionTypes';
import _ from "lodash";
import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from 'firebase/auth';



//Sign Up Function
export const signUp = (userData)=>{
    return async(dispatch, firebase)=>{
        try{
            dispatch({type:actions.SIGN_UP_START});
            const {email, password} = userData;
            let username = "hello"
            //Here after comma you have to pass the values you want to store in firestore.
            let user = await firebase.createUser({email, password}, {email});
            await firebase.logout();
            dispatch({ type: actions.SIGN_UP_SUCCESS });
        }
        catch(e){
            dispatch({ type: actions.SIGN_UP_FAIL, payload: e });
        }
    }
}

//signIn with Google Function
export const signInWithGoogle = ()=>{
    return async(dispatch,firebase)=>{
        try{
            dispatch({type:actions.SIGN_IN_START});
            let user = await firebase.login({ provider: 'google', type: 'popup' });
            console.log("The user is", user);
            dispatch({ type: actions.SIGN_IN_SUCCESS });

        }
        catch(e){
            dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
        }
    }
}

//sign In with Github
export const signInWithGithub = ()=>{
    return async(dispatch, firebase)=>{
        try{
            dispatch({ type: actions.SIGN_IN_START });
            let user = await firebase.login({provider:'github', type:'popup'});
            dispatch({ type: actions.SIGN_IN_SUCCESS });
        }
        catch(e){
            dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
        }
        
    }
}

//Sign in with email and password
export const signIn = (credentials)=>{
    return async(dispatch, firebase)=>{
        try{
            dispatch({type: actions.SIGN_IN_START});
            const userData = await firebase.login(credentials);
            console.log("The user is", userData);
            if(_.get(userData, "user.user.emailVerified", false)){
                dispatch({ type: actions.SIGN_IN_SUCCESS });
            }
            else{
                dispatch({
                    type: actions.SIGN_IN_FAIL,
                    payload: "email-unverified",
                  });
            }
        }
        catch(e){
            console.log("The error in sign in function", e.message)
            dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
        }
    }
}

//signOut Function
export const signOut = ()=>{
    return async (firebase, dispatch) => {
        try {
          dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
          await firebase.logout();
          window.location.reload();
        } 
        catch (e) {
          console.log(e.message);
        }
      };
}

//delete user function 
export const deleteAccount = ()=>{
    return async(firebase, firestore, dispatch)=>{
        const auth = getAuth();
        const user = auth.currentUser;
        try{
            dispatch({type:actions.CLEAR_AUTH_PROFILE_STATE});
            console.log("The uid is", user.uid);
            await deleteUser(user);
            await firestore.collection("users").doc(user.uid).delete();
        }
        catch(e){
            console.log(e.message);
        }
    }
}

export const clearAuthError = () => (dispatch) => {
    dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
}; 

//Forgot Password Function
export const sendPasswordResetEmail = (email) => async (firebase, dispatch) => {
    const auth = getAuth();
    const logInMethod = await fetchSignInMethodsForEmail(auth, email); 
    console.log("The email is", logInMethod);
    if(logInMethod == 'password'){
        try {
            dispatch({ type: actions.SEND_RESET_EMAIL_START });
            const result = await firebase.resetPassword(email);
            console.log(`The reset password work is done, ${result}`);
            dispatch({ type: actions.SEND_RESET_EMAIL_SUCCESS });
          } catch (e) {
              console.log("The forgot password error is", e.message);
            dispatch({ type: actions.SEND_RESET_EMAIL_FAIL, payload: e });
          }
    }
    else{
        const e = `You have signed up using ${logInMethod}.Sorry we can't change your password!`
        dispatch({ type: actions.SEND_RESET_EMAIL_FAIL, payload: e});
    }
    
};
  