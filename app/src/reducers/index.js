//Combine all reducers
import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';



/*
const appReducer = combineReducers({
    posts: postReducer,
    student: userReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_NOT_FOUND'){
        state = undefined
    }

    return appReducer(state, action);
}

export default rootReducer;
*/

export default combineReducers({
    posts: postReducer,
    student: userReducer
});
