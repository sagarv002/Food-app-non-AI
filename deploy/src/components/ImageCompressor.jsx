import React from "react";
import "./style.css"

import imageCompression from "browser-image-compression";
import Card from "react-bootstrap/Card";


export default class ImageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "D:/horse",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
      compressedLink1:
      "D:/horse",
    originalImage1: "",
    originalLink1: "",
    clicked1: false,
    uploadImage1: false
    };
  }
 

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };
  handle1= e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink1: URL.createObjectURL(imageFile),
      originalImage1: imageFile,
      outputFileName1: imageFile.name,
      uploadImage1: true
    });
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("!");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  click1 = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage1.size / 1024) {
      alert("!");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage1, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked1: true });
    return 1;
  };

  render() {
    return (
      <>
      <div className="Top-container">
        <h1> Image compressor  </h1>
        <div className="scroll-progress-tracking-conatiner">

        </div>
      </div>




      <div className="m-5">
        {/* <div className=" text-center">
          <h1>Three Simple Steps</h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div> */}

        <div className="row mt-5">
          <div className=" col-sm-12">
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
              ></Card.Img>
            )}
            <div className="d-flex justify-content-left">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={e => this.handle(e)}
              />
            </div>
            
          </div>
          
          <div className=" justify-content-center align-items-baseline">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className=" btn btn-dark"
                onClick={e => this.click(e)}
              >
                {/* Compress */}
              </button>
            ) : (
              <></>
            )}
          </div>




          

          <div className=" mt-3">
            <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  {/* Download */}
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>


      <div className="m-5">
        {/* <div className=" text-center">
          <h1>Three Simple Steps</h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div> */}

        <div className="row mt-5">
          <div className=" col-sm-12">
            {this.state.uploadImage1? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink1}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
              ></Card.Img>
            )}
            <div className="d-flex justify-content-left">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={e => this.handle1(e)}
              />
            </div>
            
          </div>
          
          <div className=" justify-content-center align-items-baseline">
            <br />
            {this.state.outputFileName1 ? (
              <button
                type="button"
                className=" btn btn-dark"
                onClick={e => this.click1(e)}
              >
                {/* Compress */}
              </button>
            ) : (
              <></>
            )}
          </div>  
        </div>
      </div>



      </>);
  }
}
