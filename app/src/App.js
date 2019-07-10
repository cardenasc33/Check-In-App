import React, { Fragment, useState } from 'react';
import './App.css';

import FileUploader from './upload/FileUploader'

import Display from './components/Display';
import SearchUser from './components/SearchUser';


import UserState from './context/users/UserState';
import Modal from 'react-modal';

import styles from './components/DisplayModule.css'; //Style sheet

const App = () => {




  
    return (
        
        <UserState>
        <div className="nav-head-bar"></div>
        <div className="App">
          <div className="Card">
          <FileUploader/>
          <div className="grid-container">
         
         <Fragment>
         
  
          <SearchUser/>
          
          <Display/>
          </Fragment>

          
          </div>
          </div>
        </div>   
        </UserState>
    )
  
}

export default App;
