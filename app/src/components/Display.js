import React , { useState , useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //connects components to redux store
import { fetchPosts } from '../actions/postActions';
import UserContext from '../context/users/userContext';


const Display = ({ searchUsers }) => {
    //Using react_hooks 
    const userContext = useContext(UserContext);
    //const [info, setInfo] = useState(userContext.users);


    //hooks version of componentDidMount

   

    
    useEffect(() => {
           

            userContext.searchUsers();

            
            //fetch('/students')
                //.then(res => res.json())
            
            
            
        //students.unshift(newPost); //hooks version of componentWillReceiveProps
        // eslint-disable-next-line
    },[userContext.user,userContext.not_found]); //edit  for special run conditions...empty means run once
    
    /*
    const componentWillReceiveProps = (nextProps) => {
        if(nextProps.newPost) {
            this.props.students.unshift(nextProps.newPost); //add to beginning
        }
    }
    */

    /*
    const postItems = students.map(post => (
            <div key={post.uin}>
                <p>{post.firstName} {post.lastName}</p>
                <p>UIN: {post.uin}</p>
                <p>RSVP: {post.rsvp}</p>
                <p>Checked In: {post.checkIn}</p>
                <br></br>
            </div>
        ));
    */

   const data = userContext.users;

   const postItems = data.map(post => (
    <div key={post.uin}>
        <p>{post.firstName} {post.lastName}</p>
        <p>UIN: {post.uin}</p>
        <p>RSVP: {post.rsvp}</p>
        <p>Checked In: {post.checkIn}</p>
        <br></br>
    </div>
));



        return (
            <div>
                <h1>Display Component:</h1>
                { postItems }
            </div>
        )
    
}

Display.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,   
    showClear: PropTypes.object,
    setAlert: PropTypes.object,
}

const mapStateToProps = state => ({
    students: state.posts.items,
    newPost: state.posts.item
})

export default Display;
