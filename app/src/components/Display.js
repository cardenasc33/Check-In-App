import React , { useState , useContext, useEffect , Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //connects components to redux store
import { fetchPosts } from '../actions/postActions';
import UserContext from '../context/users/userContext';
import styles from './DisplayModule.css';
import UserItem from './UserItem';
//import './DisplayModule.css';


const Display = ({ searchUsers }) => {
    //Using react_hooks 
    const userContext = useContext(UserContext);


    const { users } = userContext;

    
    
    const [filteredResult, setFilteredResult] = useState(userContext.users);
    
    
    async function filterOnSearch(input) {
    

        setFilteredResult(input);
    }
    

    
    //hooks version of componentDidMount
    useEffect(() => {
           

            const usersFound = userContext.searchUsers();
            filterOnSearch();
            //fetch('/students')
                //.then(res => res.json())
        
        //students.unshift(newPost); //hooks version of componentWillReceiveProps
        // eslint-disable-next-line

    },[userContext.users]); //edit  for special run conditions...empty means run once

    



    //[userContext.user, userContext.not_found]
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
    <div id='displayComponent' className= "grid-right" key={post.uin}>
        <p>{post.firstName} {post.lastName}</p>
        <p>UIN: {post.uin}</p>
        <p>RSVP: {post.rsvp}</p>
        <p>Checked In: {post.checkIn}</p>
        <br></br>
    </div>
));



        return (
            
            
            <Fragment>
                <div className="grid-right">
                    <div>
                       {/*<input id="filterBar" placeholder="Filter by name or uin"></input>*/} 
                    </div>

                    <br></br>

                    {users.map(user => (
                        <UserItem key={user.uin} user={user} />
                    ))}

                    { postItems }
                </div>
            </Fragment>
            
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
