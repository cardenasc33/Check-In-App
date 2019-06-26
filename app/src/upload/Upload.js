import React, { Component } from 'react'
import './Upload.css'
import Dropzone from '../dropzone/Dropzone'
import Progress from "../progress/Progress"



class Upload extends Component {

//add the new files to the already added files by setting
//the state accordingly
onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
  
      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }


  //Creates a new promise, inside that promise, we create a XMLHttpRequest and send
  //that to the url of our file upload server using a post request 
  //and the file to upload wrapped into a FromData object
  
    sendRequest(file) {
        return new Promise((resolve, reject) => {
         const req = new XMLHttpRequest();
       
         req.upload.addEventListener("progress", event => {
          if (event.lengthComputable) {
           const copy = { ...this.state.uploadProgress };
           copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
           };
           this.setState({ uploadProgress: copy });
          }
         });
          
         req.upload.addEventListener("load", event => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "done", percentage: 100 };
          this.setState({ uploadProgress: copy });
          resolve(req.response);
         });
          
         req.upload.addEventListener("error", event => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "error", percentage: 0 };
          this.setState({ uploadProgress: copy });
          reject(req.response);
         });
       
         const formData = new FormData();
         formData.append("file", file, file.name);
       
         req.open("POST", "http://localhost:3001/upload");
         req.send(formData);
        });
       }
  

  //Extract upload progress from the state component, by using the name of the file
  //Then check whether the file is currently being upload or the upload succeeded
  //Only if these conditions is true, we want to render a progress bar
  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

    constructor(props) {
        super(props);
        this.state = {
          files: [],
          uploading: false,
          uploadProgress: {},
          successfullUploaded: false
        };
    
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderActions = this.renderActions.bind(this);
      }

      render() {
        return (
          <div className="Upload">
            <span className="Title">Upload Files</span>
            <div className="Content">
              <div>
                <Dropzone
                  onFilesAdded={this.onFilesAdded}
                  disabled={this.state.uploading || this.state.successfullUploaded}
                />
              </div>
              <div className="Files">
                // Add this:
                {this.state.files.map(file => {
                  return (
                    <div key={file.name} className="Row">
                      <span className="Filename">{file.name}</span>
                      // Added Progress Bar:
                      {this.renderProgress(file)}

                    </div>
                  );
                })}
              </div>
            </div>
            <div className="Actions">{this.renderActions()}</div>
          </div>
        );
      }
    }


    export default Upload