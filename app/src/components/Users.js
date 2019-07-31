import React, { Fragment, useContext } from 'react';
import UserItem from './UserItem';
import UserContext from '../context/users/userContext';

const Users = () => {
    const userContext = useContext(UserContext);

    const { users, filtered } = userContext;

    if(users.length === 0) {
        return <h4>Please add a user</h4>;
    }

    return (
        <Fragment>
            {filtered !== null 
            ? filtered.map(user => (<UserItem key = {user.uin}
                user={user} />)) 
            :  users.map(user => (
                <UserItem key = {user.uin} user={user} />
            ))}

           
        </Fragment>
    );
};

export default Users;