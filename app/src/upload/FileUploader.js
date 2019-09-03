import React, { useState, useContext, useEffect} from 'react';
// import { connect } from 'react-redux'
import ReactFileReader from 'react-file-reader';
import { ENETUNREACH } from 'constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //connects components to redux store

import Modal from 'react-modal';
import UserContext from '../context/users/userContext';
import styles from '../components/DisplayModule.css';



function insertJSON(data){
  console.log("Client Body:");
  var parsedJSON = JSON.stringify(data);
  console.log(parsedJSON);
  fetch("/insert", {
    method: "POST",
    body: parsedJSON
  }).then((res) => {
    if (res.ok){
      //console.log("Fetch successful")
      //console.log(res);
      return res;
    }
    else{
      throw new Error ("Something went wrong with fetch");

    }
  })
}

const FileUploader = () => {

  const userContext = useContext(UserContext); 

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  
  const [uploadClicked, setUploadClicked] = useState(false);
  /*
  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.newPost) {
        this.props.posts.unshift(nextProps.newPost); //add to beginning
      }
  }
  */

 useEffect(() => {
  userContext.searchUsers();

},[uploadClicked]);
  

  
  const handleFiles = files => {
    var reader = new FileReader();
    const t_his = this;
    reader.onload = function (e) { //executes when file has been loaded
      
      // Use reader.result
      var csv = reader.result;
      //var lines = csv.split(/\r\n|\n/);
      
      var lines = csv.split('\n'); //Separates each csv line
      
      var lineResult = [];
      var jsonArray = [];
      var resultsArray = [];
      
      for (var row = 0; row < lines.length; row++){

        var objBlock = {}
        //Split the current line dilimited with ','
        var currLine = lines[row].split(',');

        //Assign a key for each value in the row
        for (var col = 0; col < currLine.length; col++){
          
          var jsonArg = new Object(); //Allows to set name and value 
          
          //Remove quotes:
          currLine[col] = currLine[col].replace(/['"]+/g, '');

          switch(col){
            case 0: 
              jsonArg.firstName = currLine[col]; //{firstName:value}
              jsonArray.push(jsonArg); 
              break;
            case 1:
              jsonArg.middleName = currLine[col]; //{middleName:value}
              jsonArray.push(jsonArg);
              break;
            case 2:
              jsonArg.lastName = currLine[col]; //{lastName:value}
              jsonArray.push(jsonArg);
              break;
            case 3:
              jsonArg.uin = currLine[col]; //{uin:value}
              jsonArray.push(jsonArg);
              break;
            case 4:
              jsonArg.rsvp = currLine[col]; //{rsvp:value}
              jsonArray.push(jsonArg);
              break;
            case 5:
              jsonArg.checkIn = currLine[col]; //{checkIn:value}
              jsonArray.push(jsonArg);
              break;
            default:
              //lineResult[col] = "missing" + currLine[col]; //Extra line column
              jsonArg.missing = currLine[col];
              //jsonArg.value = currLine[col];
              jsonArray.push(jsonArg);
          }
          //console.log(lineResult[col]);
        }//End of columns
        
        //Convert array to JSON string: 
        var m = 0;
        for (m = 0; m < jsonArray.length; m++){
          objBlock = Object.assign(objBlock, jsonArray[m]);
        }
        //Not currently used:
        //var resultArray = JSON.parse(JSON.stringify(jsonArray));
        //var stringJSON = JSON.stringify(resultArray);

        //Call insert route from server.js to turn to JSON and upload to database
        insertJSON(objBlock);
        console.log("\n"); //new line for easier reading
        
        resultsArray.push(objBlock); //Array to display onto page
        jsonArray = []; //Clear result array for new line
      }//End of rows
      
      //for header removal
      /*
      var result = [];
      var headers = lines[0].split(",");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        const removeQuotesFromLine = lines[i].replace(/['"]+/g, '');
        var currentline = removeQuotesFromLine.split(",");
        for (var j = 0; j < headers.length; j++) {
          const removeQuotesFromHeaders = headers[j].replace(/['"]+/g, '');
          obj[removeQuotesFromHeaders] = currentline[j];
        }
        delete obj['Timestamp'];
        result.push(obj);
        //console.log(obj);
      }

      t_his.setState({
        data: JSON.stringify(result, null, 4),
        isAvailable: true
      })
      */
  
    }
    reader.readAsText(files[0]);
    // format json as standard json object
  
  
    setModalIsOpen(true); //pop-up
    userContext.searchUsers();
    //userContext.getUser(null); //forces re-render of dispay component after upload

    setUploadClicked(true);
  } //end of handleFiles

  const closeOnTime = () => {
    setTimeout(function(){setModalIsOpen(false);}, 2000);
    //setTimeout(function(){alert("Hello");}, 3000);
  }

 

  const modalItem = (
    <div>
                    {/*<button onClick={() => setModalIsOpen(true)}>Open Modal</button>
                    <button onClick={() => setSecondModalIsOpen(true)}>Open Second Modal</button>*/}

                    <Modal className='modals' isOpen={modalIsOpen} onAfterOpen={closeOnTime} onRequestClose={() => setModalIsOpen(false)}>
                    <button onClick={() => setModalIsOpen(false)}>close</button>
                    <div className='modalMessage'>Upload Successful</div>
                    </Modal>

                    <Modal
                    isOpen={secondModalIsOpen}
                    onAfterOpen={closeOnTime}
                    onRequestClose={() => setSecondModalIsOpen(false)}
                    >
                    <button onClick={() => setSecondModalIsOpen(false)}>close</button>
                    <div className='modalMessage'>Swipe Check-In Successful</div>
                    </Modal>
                </div>
  );

    return (
      

      <div className='grid-menu'>
        <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
          <button >Upload</button>
        </ReactFileReader>
        {modalItem}

        
      </div>
    );
  
}

FileUploader.propTypes = {
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
})

export default FileUploader;