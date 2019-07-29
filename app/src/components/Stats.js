import {useState, useContext, useEffect} from 'react';

const Stats = () => {
    const userContext = useContext();
    const [info, setInfo] = useState({});

    useEffect(() => {
        
        //userContext.countUsers();

    },[]);

    //const userCount = userContext.user_count;
    console.log("Total Users: ");
    //console.log(userCount);

}

export default Stats;