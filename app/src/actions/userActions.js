import { USER_FOUND , USER_NOT_FOUND , NEW_USER } from './types';


// fetch api that checks if user exits
/*
export const displayUsers = () => async dispatch => {
    try    
}
*/

export const fetchUser = (uin) => async dispatch => {
    /*   
    fetch('/student/' + uin)
        .then(res => res.json())
        .then(user => dispatch({ //user was found
            type: USER_FOUND,
            payload: user
        }))
        .catch(user_not_found => dispatch({
            type: USER_NOT_FOUND,
            payload: {uin: uin, rsvp: "No", checkIn: "Yes"}
        }));
    */

    fetch('/updateCheckin/' + uin)
        .then(res => res.json())
            .then(user => dispatch({ //user was found
                type: USER_FOUND,
                payload: user
            }))
            .catch(user_not_found => dispatch({
                type: USER_NOT_FOUND,
                payload: {uin: uin, rsvp: "No", checkIn: "Yes"}
            }));
    
};

//TODO Make CREATE_NEW_USER Type
//Add new user to the display component

export const createUser = (postData) => async dispatch => {
    console.log(postData);
    var stringedJSON = JSON.stringify(postData);
    console.log(stringedJSON);

    fetch('/insertStudent', {
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
/*
export const createUser = (postData) => dispatch => {
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(post => dispatch({
            type: USER_NOT_FOUND,
            payload: post
        }));
        
};
*/





/*
export const fetchUser = (uin) => dispatch => {
    fetch(('/student/' + uin))
        .then(res => res.json())
        .then(user => dispatch({
            type: USER_FOUND,
            payload: user
        }))
        .catch(user_not_found => dispatch({
            type: USER_NOT_FOUND,
            payload: user_not_found
        }));
        
        
}
*/