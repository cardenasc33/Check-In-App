import React, { Fragment, useState } from 'react';
import './App.css';

import FileUploader from './upload/FileUploader'

import Display from './components/Display';
import SearchUser from './components/SearchUser';


import UserState from './context/users/UserState';
import Modal from 'react-modal';

const App = () => {




  
    return (
        <UserState>
  
        <div className="App">
          <div className="Card">
         
         <Fragment>
          <FileUploader/>
  
          <SearchUser/>
          
          <Display/>
          </Fragment>

          
        
          </div>
        </div>   
        </UserState>
    )
  
}

export default App;
