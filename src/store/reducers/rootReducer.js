import React from 'react'
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import {
    firebaseReducer
} from 'react-redux-firebase';

const rootReducer = combineReducers({
    // forgotPasswordReducer: forgotPasswordReducer,
    profileReducer: profileReducer,
    firebaseReducer: firebaseReducer,
    authReducer:authReducer,
    // signInReducer: signInReducer,
    // signUpReducer: signUpReducer
})

export default rootReducer