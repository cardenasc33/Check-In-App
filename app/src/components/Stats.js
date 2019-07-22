import {useState, useContext, useEffect} from 'react';

const Stats = () => {
    const userContext = useContext();
    const [info, setInfo] = useState({});

    useEffect(() => {

        //userContext.countUsers();

    },[]);


}

export default Stats;