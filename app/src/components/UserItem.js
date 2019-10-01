import React from 'react'
import PropTypes from 'prop-types';


const UserItem = ({ user }) => {
    const { uin, firstName, lastName, rsvp, checkIn} = user; //user prop

    return (
        
     
        
        <div className='userItem'>
        <div className = 'card'>
            <h3 className="name-header">
                {firstName}{' '}{lastName}{' '} 
            </h3>
            {/*
            <ul className='list' style={{listStyleType: "none"}}>
                    {uin && (<li>UIN: {uin}</li>)}
                    {rsvp && (<li>RSVP: {rsvp}</li>)}
                    {checkIn && (<li>Checked In: {checkIn}</li>)}
            </ul>
            */}


            <div class="user-sub-info">
                <p>UIN: {uin}</p>
                <p>RSVP: {rsvp}</p>
                <p>Checked In: {checkIn}</p>
            </div>
        </div>
        </div>
    
    );
};


UserItem.propTypes = {
    user: PropTypes.object.isRequired
}
export default UserItem;