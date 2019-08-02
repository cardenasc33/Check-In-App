import React, { useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { fetchUser } from '../actions/userActions';
//import { createUser } from '../actions/userActions';
import { exists } from 'fs';
import UserContext from '../context/users/userContext';
import Modal from 'react-modal';

const SearchUser = ({ showClear, clearUsers, setAlert }) => {
    const userContext = useContext(UserContext); 

    const { getUser, user, not_found, users } = userContext;
    
    const [info, setInfo] = useState({});

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
    
    
    const [manualID, setManualID] = useState(""); //contains uin of manually searched student
    const [swipedID, setSwipedID] = useState(""); //contains uin of swiped id card
   
    
    const isEmpty = myObject => {
        for(var key in myObject) {
            if (myObject.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
    /*
    useEffect(() => {

        if(isEmpty(userContext.user)){
            console.log("User not in database: ");
            console.log(userContext.user_not_found);

            //Creates a new user in the database with information provided
            userContext.createUser(userContext.user_not_found);
        }else{
            console.log("UIN match was found");
            console.log(userContext.user);
        }
        //userContext.createUser(userContext.createUser);
    },[userContext.user])
    */

    /*
    componentWillReceiveProps(nextProps){

        
        //console.log(nextProps.user);
        //console.log(nextProps.user_not_found);
        if(this.isEmpty(nextProps.user)){
            console.log("User not in database: ");
            console.log(nextProps.user_not_found);

            //Creates a new user in the database with information provided
            this.props.createUser(nextProps.user_not_found);
        }else{
            console.log("UIN match was found");
            console.log(nextProps.user);
        }
       
    }
    */
   
    /*
    const postItems = info.map(post => (
        <div key={post.uin}>
            <p>{post.firstName} {post.lastName}</p>
            <p>UIN: {post.uin}</p>
            <p>RSVP: {post.rsvp}</p>
            <p>Checked In: {post.checkIn}</p>
            <br></br>
        </div>
    ));
        */

    
    useEffect(() => {
        userContext.searchUsers();

        if(isEmpty(userContext.user)){
            console.log("User not found: ");
            console.log(userContext.not_found);
            if(isEmpty(userContext.not_found)){
                console.log("No search conducted");
            }else{ //new user added to database
                console.log("New user added to database");
                console.log(userContext.not_found);
                userContext.createUser(userContext.not_found);
            }
            
         
        }else{
            console.log("UIN match was found");
            console.log(userContext.user);
        }

    },[userContext.user]);
    
   
    //Called by Manual check in
    const searchUser = (uin) =>{

        userContext.getUser(uin); //getUser defined by userContext
        setModalIsOpen(true);
        
    }

    const enterPressed = (e) => {
        var keyValue = e.keyCode || e.which;
        if(keyValue === 13){
            checkId();
        }
    }

    const checkId = () => {
        var typedUIN = document.getElementById('uinInput').value;
        if (typedUIN.length === 9){     
            searchUser(typedUIN);
            setManualID(typedUIN);
        }  
    }

    const getText = () => {
        var textInput = document.getElementById('swipeBar').value;
        textInput = textInput.replace(/\s/g, ''); 
        count(textInput);
        
    }

    const count = (textInput) =>{
        var total = textInput;
        total = total.replace(/\s/g, '');
        document.getElementById("total").innerHTML="Total Characters: " + (total.length);
        
        statusUpdate(total.length , total); 

    }
        
    const statusUpdate = (len , text) => { //Param is the number of characters in the input field

        var maxLength = 79; //Total amount of characters for a successful card swipe
        var prefix = text.toString().substring(0, 2); //obtains the prefix characters of the input (ex. %B)  


        //TODO check creat diagram
        document.getElementById("prefix").innerHTML= "Prefix: " + prefix;

            if (len === 0){ 
                document.getElementById("status").innerHTML="Status: " + "Please Swipe Card";
            }
            if (len === maxLength && prefix === "%B"){
                document.getElementById("status").innerHTML="Status: " + "Success"; //Card was read properly
                getUIN(text); //Calls the function getUIN() to obtain the UIN substring

            }
            else{
                document.getElementById("status").innerHTML="Status: " + "Error, please swipe again"; //Card did NOT read properly
            }
    }

    /* 
     * called if UIN is obtainable 
     * searches UIN in the database,
     * displays info for matching UIN
     */ 
    
     const getUIN = (text) => {
        var uin = text.substring(54, 63); //Obtains the string of the UIN
        document.getElementById("uinID").innerHTML="UIN: " + uin;
        userContext.getUser(uin);

        setSwipedID(uin); //add the uin to the state hook from swiped ID

        setSecondModalIsOpen(true);
        
        //Clears input bar for new swipe in
        //document.getElementById("inputBar").value="";

    }

    /*
     *  Function: closeOnTime()
     *  Usage: closes the modal when certain amount of time is reached 
     */
    const closeOnTime = () => {
        setTimeout(function(){setModalIsOpen(false);}, 2000);
        setTimeout(function(){setSecondModalIsOpen(false);}, 2000);
        document.getElementById("swipeBar").value="";
        document.getElementById("uinInput").value="";
    }

    //replace render

            //const data = userContext.user;
            const data= userContext.user;
            console.log(data.uin);
           
            const swipeSearch = (
                <div class = "swipe-container" id='swipeSearch'>
                    <h2 className='primary'>Swipe Check In: </h2>
                    <input className='inputBar' id = "swipeBar" type="text" placeholder="Please Swipe ICard..." onInput={getText} autoFocus="true"></input>
                    <div id='swipeResult'>
                        <p id = "total"> Total Characters: 0</p>
                        <p id = "status"> Status: Please Swipe Card</p>
                        <p id = "uinID">UIN: </p>
                        <p id="prefix">Prefix: </p>
                    </div>
                </div>
            )

            const manualSearch = (
                <div class="manual-container">
                    <h2 className='primary'> Manual Check In: </h2>
                    <form id = "manualForm" onSubmit = {e => e.preventDefault()} onKeyPress={enterPressed.bind(this)}>

                        <input className='inputBar' type="text" id="uinInput" placeholder="Enter UIN..." required minLength="9" maxLength="9" ></input>
                        <br></br>
                        <button className="btn btn-primary btn-block" id="checkinBtn"  type="button" onClick={checkId}>Manual Checkin</button>
                    </form>
                </div>
            );
            
            /*
                const userItem = (
                <div key={data.uin}>
                    <p>{data.firstName} {data.lastName}</p>
                    <p>UIN: {data.uin}</p>
                    <p>RSVP: {data.rsvp}</p>
                    <p>Checked In: {data.checkIn}</p>
                    <br></br>
                </div>
            );
            */

            const userItem = (
 
                <div id='checkinResult' className="grid-menu" key={info.uin}>
                    <p>{info.firstName} {info.lastName}</p>
                    <p>UIN: {info.uin}</p>
                    <p>RSVP: {info.rsvp}</p>
                    <p>Checked In: {info.checkIn}</p>
                    <br></br>
                </div>
            )
            
            
            const modalItem = (
                <div>
                    {/*<button onClick={() => setModalIsOpen(true)}>Open Modal</button>
                    <button onClick={() => setSecondModalIsOpen(true)}>Open Second Modal</button>*/}

                    <Modal className='modals' isOpen={modalIsOpen} onAfterOpen={closeOnTime} onRequestClose={() => setModalIsOpen(false)}>
                    <button onClick={() => setModalIsOpen(false)}>close</button>
                    <div className='modalMessage'>Added user: {manualID}</div>
                    </Modal>

                    <Modal className='modals' isOpen={secondModalIsOpen} onAfterOpen={closeOnTime} onRequestClose={() => setSecondModalIsOpen(false)}>
                    <button onClick={() => setSecondModalIsOpen(false)}>close</button>
                    <div className='modalMessage'>User "{swipedID}" was successfully swiped in.</div>
                    </Modal>
                </div>
            );

        return (

            <div className="checkIn-container">
                {swipeSearch}
                {manualSearch}
                {modalItem}
                {userItem}
            </div>
        )
    

}

SearchUser.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,   
    showClear: PropTypes.object,
    setAlert: PropTypes.object,
}

const mapStateToProps = state => (
{
    user: state.student.found,
    user_not_found: state.student.not_found
}
)


export default SearchUser;