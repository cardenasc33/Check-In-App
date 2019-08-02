import React, {useState, useContext, useEffect, useRef} from 'react';
import UserContext from '../context/users/userContext';

const FilterUsers = () => {
    const userContext = useContext(UserContext);
    const [info, setInfo] = useState({});
    const text = useRef('');

    const {filterUsers, clearFilter, filtered} = userContext;

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    });
    const onChange = e => {
        if(text.current.value !== '') {
            filterUsers(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Users..." onChange={onChange}/>
        </form>
    )
    /*
    useEffect(() => {

        //userContext.filterUsers();

    },[]);
    */

}

export default FilterUsers;