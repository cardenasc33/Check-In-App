//initial state, actions (searchUser)
import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    USER_FOUND,
    USER_NOT_FOUND,
    NEW_USER,
    COUNT_USERS
} from '../types';

const UserState = props => {
    const initialState = {
        users: [],
        user: {},
        not_found: {},
        loading: false,
        user_count: {}
    }

    //dispatch type back to reducer (using reducer hook)
    const [state, dispatch] = useReducer(UserReducer, initialState);

    /* Actions */

    // Search Users
    const searchUsers = async () => {
     /*
        export const fetchPosts = () => async dispatch => {
        
            fetch('/students')
                .then(res => res.json())
                .then(posts => dispatch({
                    type: FETCH_POSTS,
                    payload: posts
                }));
    }*/
        //make request
        const res = await fetch('/students')
        .then(res => res.json())
          .then(users => dispatch({
              type: SEARCH_USERS,
              payload: users
          }))
    
    };

    //Get User
    const getUser = async uin => {
        
        const res = await fetch('/updateCheckin/' + uin)
        .then(res => res.json())
            .then(user => dispatch({ //user was found
                type: USER_FOUND,
                payload: user
            }))
            .catch(user_not_found => dispatch({
                type: USER_NOT_FOUND,
                payload: {uin: uin, rsvp: "No", checkIn: "Yes"}
            }));
    }

    //Add User
    const createUser = async postData =>{
        const res = await fetch('/insertStudent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(post => dispatch({
            type: NEW_USER,
            payload: post
        }));

        
    };

    //Count Users
    const countUsers = async () => {
        const res = await fetch('/countUsers')
        .then(res => res.json())
            .then(user_count => dispatch({
                type: COUNT_USERS,
                payload: user_count
            }));

    }

    //Clear Users

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });



    

    //Provider takes a prop which makes available to the entire app
    //Equivalent to mapStateToProps
    return <UserContext.Provider
        value={{
            users: state.users,
            user: state.user,
            loading: state.loading,
            not_found: state.not_found,
            user_count: state.user_count,
            searchUsers,
            getUser,
            createUser,
            countUsers
        }}
    >
        {props.children}
    </UserContext.Provider>
}

export default UserState;