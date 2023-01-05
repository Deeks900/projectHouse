import * as actions from './actionTypes';
import { getAuth } from "firebase/auth";

//Adding the Project to the Database
export const addProject = (projectData)=>{
    return async(dispatch, firebase, firestore)=>{
        try{
            dispatch({type:actions.ADDING_DATA_START})
            const {title, description, github, live, techList} = projectData

            //Getting the current user
            const auth = getAuth();
            const user = auth.currentUser.email;
            const userId = auth.currentUser.uid;
            // const id = firestore.collection("projects").doc().id;
            //adding the data to firestore
            let data = {
                title: title,
                description: description,
                technologies: techList,
                github: github,
                live: live,
                author: user,
                created:firebase.firestore.FieldValue.serverTimestamp(),
                authorId:userId
            }
            let result = await firestore.collection('projects').add(data)
            dispatch({type:actions.ADDING_DATA_SUCCESS})
        }
        catch(e){
            console.log("The error in adding is", e.message);
            dispatch({type:actions.ADDING_DATA_FAIL, payload:e})
        }
    }
}

//clear Project state
export const clearSubmitError = () => (dispatch) => {
    dispatch({ type: actions.CLEAR_PROJECT_STATE });
}; 