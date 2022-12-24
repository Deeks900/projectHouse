import React from 'react'
import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import firebase from './../config'
import { createFirestoreInstance, getFirestore } from 'redux-firestore'
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase'
import _ from "lodash";

const middlewares = [
    thunk.withExtraArgument(getFirebase, getFirestore)
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const composedEnhancers = compose(middlewareEnhancer)


// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    attachAuthIsReady: true,
    profileFactory: (userData, profileData, firebase) => { // how profiles are stored in database

      const emailFromPasswordSignUp = _.get(userData, "user.email", false);
      const uidFromPasswordSignUp = _.get(userData, "user.uid", false);
      const emailFromProviderSignUp = _.get(userData, "email", false);
      const uidFromProviderSignUp = _.get(userData, "uid", false);
      const displayNameFromProviderSignUp = _.get(userData, "displayName", false);
      const photoURLFromProviderSignUp = _.get(userData, "photoURL", false);
      const providerData = _.get(userData, "providerData", false);
      const userEmail = (emailFromPasswordSignUp||emailFromProviderSignUp|| (providerData && providerData[0].email));
      return {
        email: userEmail,
        uid: uidFromPasswordSignUp || uidFromProviderSignUp,
        displayName:
        displayNameFromProviderSignUp ||
        (providerData && providerData[0].displayName) ||
        (userEmail+"").substring(0, (userEmail+"").indexOf('@')),
        photoURL:
        photoURLFromProviderSignUp ||
        (providerData && providerData[0].photoURL) ||
        (userEmail+"").substring(0,1).toUpperCase(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }
    }
}

const store = configureStore({reducer: rootReducer, devTools:composeWithDevTools(), enhancers:composedEnhancers });

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

export default store;
