import React, {useState, useContext, useEffect, Fragment} from 'react';


const Stats = () => {
    const [totalUsers, setTotalUsers] = useState({total: 0});

    async function fetchUrl() {
        const response = await fetch('/countTotal');
        const json = await response.json();

        setTotalUsers(json);
    }

    useEffect(() => {
        
        //userContext.countUsers();
        fetchUrl();
    },[totalUsers]);
    

    /*
   const data = totalUsers;

    const totalUsersDisplay = data.map(total = (
        <div id="totalUserInfo" className="grid-right" key={result.total}>
            <p>{result.total}</p>
        </div>
    ));
        */

    const data = totalUsers;
        return (
            
            
            <Fragment>
                <div id="totalUserInfo" className="menu">
                    <h3>Total Users: {data.total}</h3>
                </div>
            </Fragment>
            
        )
     
 }

    //const userCount = userContext.user_count;
    console.log("Total Users: ");
    //console.log(userCount);


export default Stats;