import React from 'react'
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import submitReducer from './submitReducer';
import { combineReducers } from 'redux';
import {
    firebaseReducer
} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    // forgotPasswordReducer: forgotPasswordReducer,
    profileReducer: profileReducer,
    firebaseReducer: firebaseReducer,
    authReducer:authReducer,
    firestore: firestoreReducer,
    submitReducer: submitReducer
})

export default rootReducer