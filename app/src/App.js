import React, { Fragment, useState } from 'react';
import './App.css';

import FileUploader from './upload/FileUploader'

import Display from './components/Display';
import SearchUser from './components/SearchUser';
import Stats from './components/Stats';
import FilterUsers from './components/FilterUsers';
import Users from './components/Users';

import UserState from './context/users/UserState';
import Modal from 'react-modal';

import styles from './components/DisplayModule.css'; //Style sheet
import logo from './white_logo.png';

import MediaQuery from 'react-responsive';

const App = () => {

    return (
      <div> 
        {/* 
        <MediaQuery query="(min-device-width: 1224px)">
          <div>You are a desktop or laptop</div>
          <MediaQuery query="(min-device-width: 1824px)">
            <div>You also have a huge screen</div>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <div>You are sized like a tablet or mobile phone though</div>
          </MediaQuery>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          <div>You are a tablet or mobile phone</div>
        </MediaQuery>
        <MediaQuery query="(orientation: portrait)">
          <div>You are portrait</div>
        </MediaQuery>
        <MediaQuery query="(orientation: landscape)">
          <div>You are landscape</div>
        </MediaQuery>
        */}
        
        
        <UserState>
          <div className="nav-head-bar">
            <img className="logo" src={logo} alt="Logo" />
            <h2 className="login">Log In</h2>
          </div>


          <div className="App">
              
                <FileUploader/>

                <div className = "grid-container1">
                  <SearchUser/> 
                  
                </div>
                <br></br>
                <Stats/>
                <FilterUsers/>
                <div className="grid-container">
                  
                    
                        <Users/>
                
                </div>

          </div>  
        </UserState>
      </div>
    )

  
}

export default App;
