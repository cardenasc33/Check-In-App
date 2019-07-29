import React, { Fragment, useState } from 'react';
import './App.css';

import FileUploader from './upload/FileUploader'

import Display from './components/Display';
import SearchUser from './components/SearchUser';
import Stats from './components/Stats';
<<<<<<< HEAD

=======
>>>>>>> 14e2857ac65a18ec6171cd5aab368109d26a6a2c

import UserState from './context/users/UserState';
import Modal from 'react-modal';

import styles from './components/DisplayModule.css'; //Style sheet
import logo from './white_logo.png';

const App = () => {

    return (
        
        <UserState>
        <div className="nav-head-bar">
          <img className="logo" src={logo} alt="Logo" />
          <h2 className="login">Log In</h2>
        </div>


        <div className="App">
          <FileUploader/>
          <div className="grid-container">
          <SearchUser/> 
          <Stats/>
            <div className="Card">
  
              <Fragment>
                
               
                <Display/>
              </Fragment>

                
            </div>
          </div>
        </div>   
        </UserState>
    )
  
}

export default App;
