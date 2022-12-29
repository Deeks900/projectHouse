import React from 'react'
import * as actions from '../actions/actionTypes';

const initialState = {
    loading:false,
    error:null
};

const submitReducer = (state=initialState, {type, payload}) => {
 switch(type){
    case actions.CLEAR_PROJECT_STATE:
        return {
            ...state,
            loading: false,
            error: null
        }
    case actions.ADDING_DATA_START:
        return {
            ...state,
            loading: true,
            error: null,
          };

    case actions.ADDING_DATA_SUCCESS:
        return {
            ...state,
            loading: false,
            error: false,
          };

    case actions.ADDING_DATA_FAIL:
        return {
            ...state,
            loading: false,
            error: payload
        };

    default:
      return state
 }
}

export default submitReducer