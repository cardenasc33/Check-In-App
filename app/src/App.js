import React, { Fragment, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Upload from './upload/Upload'
//import UploadCSV from './upload/UploadCSV'
import FileUploader from './upload/FileUploader'

import Display from './components/Display';
import SearchUser from './components/SearchUser';
import axios from 'axios';

import UserState from './context/users/UserState';

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
