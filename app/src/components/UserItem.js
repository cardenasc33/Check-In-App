import React from 'react'
import PropTypes from 'prop-types';


const UserItem = ({ user }) => {
    const { uin, firstName, lastName, rsvp, checkIn} = user; //user prop

    return (
        <div className='card bg-light' id='userItem'>
            <h3 className="text-primary.text-center">
                {firstName}{' '}{lastName}{' '} 
            </h3>
            {/*
            <ul className='list' style={{listStyleType: "none"}}>
                    {uin && (<li>UIN: {uin}</li>)}
                    {rsvp && (<li>RSVP: {rsvp}</li>)}
                    {checkIn && (<li>Checked In: {checkIn}</li>)}
            </ul>
            */}
            

            <div>
                <p>UIN: {uin}</p>
                <p>RSVP: {rsvp}</p>
                <p>Checked In: {checkIn}</p>
            </div>
        </div>
    );
};


UserItem.propTypes = {
    user: PropTypes.object.isRequired
}
export default UserItem;