import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers' //includes all reducers

const initialState = {};

const middleware = [thunk];


//Create store by passing root reducing function in createStore
const store = createStore(rootReducer, initialState, 
    compose( //composes function from right to left
        applyMiddleware(...middleware),
        //Allows for redux devtools extension use in web browser
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
    )
    );

export default store;



