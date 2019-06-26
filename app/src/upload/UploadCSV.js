import React, { Component } from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import ReactFileReader from 'react-file-reader';
//import "./styles.css";


class CSVFileUploader extends React.Component {
    
    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
        // Use reader.result
        var csvString = reader.result;
        alert(reader.result)
        console.log(reader.result);
        
        var jsonArray = csvString.split(',');
        console.log(jsonArray);
        
        }
      reader.readAsText(files[0]);
    }

    render() {
        return(
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
            <button className='btn'>Choose File</button>
        </ReactFileReader>
        )
    }
}

export default CSVFileUploader;