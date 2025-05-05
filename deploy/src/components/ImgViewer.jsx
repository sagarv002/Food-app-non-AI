import Card from "react-bootstrap/Card";
import "./style.css";
import React, { Component } from "react";
import { motion } from "framer-motion";

export default class ImgViewer extends Component {
  constructor() {
    super();
    this.state = {
      images: [
        { orgimg: "", orglink: "", uploadImage: false },
        { orgimg: "", orglink: "", uploadImage: false },
        { orgimg: "", orglink: "", uploadImage: false },
        { orgimg: "", orglink: "", uploadImage: false },
        { orgimg: "", orglink: "", uploadImage: false }
      ]
    };
  }

  handleImageUpload = (index, e) => {
    const imageFile = e.target.files[0];
    const updatedImages = [...this.state.images];
    updatedImages[index] = {
      orgimg: imageFile,
      orglink: URL.createObjectURL(imageFile),
      uploadImage: true
    };
    this.setState({ images: updatedImages });
  };

  render() {
    return (
      <>
       <motion.div
      className="effect"
      style={{
        textAlign: "center",
        padding: "30px",
        backgroundColor: "#ffffe0",
        borderRadius: "100px",
      }}
      animate={{ backgroundColor: ["#ffffe0", "#ffcccb", "#FFFFFF", "#ffffe0"] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <motion.h1
        style={{ color: "#000", fontSize: "4rem" ,fontFamily:"arial"}}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
       ___ 
      </motion.h1>
    </motion.div>



        <div className="Top-container text-center py-2" style={{ backgroundColor: "#282c34" }}>
          <h1 style={{ color: "white", fontSize: "3rem", fontWeight: "bold" }}>   '_' </h1>
        </div>
        <div className="d-flex justify-content-center align-items-start flex-wrap mt-5">
          {this.state.images.map((image, index) => (
            <div key={index} className="m-3 p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "900px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "160px" }}>


              <h6 style={{ backgroundColor: "white" }}>



                {

                  index === 0 ? "First Image" : null}   {


                  index === 1 ? " Second Image" : null
                }

                {


                  index === 2 ? " Third Image" : null
                }


                {


                  index === 3 ? " Fourth Imgae" : null
                }

                {


                  index === 4 ? " FIfth Image" : null
                }







              </h6>










              {index === 0 && image.uploadImage ? (
                <Card.Img className="ht" variant="top" src={image.orglink} style={{ borderRadius: "10px", maxHeight: "200px", objectFit: "cover" }} />
              )

                : null





              }
              {index === 1 && image.uploadImage ? (
                <Card.Img className="ht" variant="top" src={image.orglink} style={{ borderRadius: "10px", maxHeight: "200px", objectFit: "cover" }} />
              )

                : null





              }

              {index === 3 && image.uploadImage ? (
                <Card.Img className="ht" variant="top" src={image.orglink} style={{ borderRadius: "10px", maxHeight: "200px", objectFit: "cover" }} />
              )

                : null





              }

              {index === 4 && image.uploadImage ? (
                <Card.Img className="ht" variant="top" src={image.orglink} style={{ borderRadius: "10px", maxHeight: "200px", objectFit: "cover" }} />
              )

                : null





              }

              {index === 5 && image.uploadImage ? (
                <Card.Img className="ht" variant="top" src={image.orglink} style={{ borderRadius: "10px", maxHeight: "200px", objectFit: "cover" }} />
              )

                : null





              }




              <div className="d-flex flex-column align-items-center mt-6">
                <input
                  type="file"
                  accept="image/*"
                  className="btn btn-dark mb-9 " style={{ borderRadius: "900px", maxWidth: "200px" }}
                  onChange={e => this.handleImageUpload(index, e)}
                />
                {/* <p style={{ color: "#6c757d" }}>Select the {index === 0 ? "First Image" : "Second Image"}</p> */}
              </div>
            </div>
          ))}
        </div>
        

      
      {/* <motion.div
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "black",
          borderRadius: "300px",
          position: "absolute",
          bottom: "20px",
        }}
        animate={{ x: ["-100%", "1200%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
      </motion.div>
    */}


        {/* {this.state.images[0].uploadImage && this.state.images[1].uploadImage && (
          <div className="d-flex justify-content-center align-items-center mt-5" style={{ gap: "40px" }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <h5 style={{ color: "#dc3545" }}>First Image</h5>
              <img src={this.state.images[0].orglink} alt="First" style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <h5 style={{ color: "#007bff" }}>Second Image</h5>
              <img src={this.state.images[1].orglink} alt="Second" style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />
            </div>
          </div>
        )} */}
      </>
    );
  }
}
