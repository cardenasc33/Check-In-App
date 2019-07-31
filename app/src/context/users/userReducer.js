import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import UserReducer from './userReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    USER_FOUND,
    USER_NOT_FOUND,
    NEW_USER,
    COUNT_USERS,
    FILTER_USERS,
    CLEAR_FILTER
} from '../types';

export default (state, action) => {
    //evaluate type
    switch(action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case USER_FOUND:
            return {
                ...state,
                user: action.payload,
                not_found: {}
            }
        case USER_NOT_FOUND:
            return {
                ...state,
                not_found: action.payload,
                user: {}
            }
        case NEW_USER:
            return {
                ...state,
                not_found: action.payload,
                new_user: undefined
                //users: state.users.concat(action.payload)
            }
        case SET_LOADING:
            return {
                //state is immutable, need to copy with new payload
                ...state,
                loading: true
            }
        case COUNT_USERS:
            return {
                ...state,
                count_users: action.payload
            }
        case FILTER_USERS:
            return {
                ...state,
                filtered: state.users.filter(user => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return user.uin.match(regex);
                    //return user.firstName.match(regex) || user.uin.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        default:
            return state;
    }
}

