import React, { Component } from "react";
import "./style.css";
import { motion } from "framer-motion";

export default class LightSwitch extends Component {
  constructor() {
    super();
    this.state = {
      isLightOn: false
    };
  }

  toggleLight = () => {
    this.setState(prevState => ({ isLightOn: !prevState.isLightOn }));
  };

  render() {
    return (
      <motion.div
        className="light-switch-container"
        style={{ textAlign: "center", padding: "50px", backgroundColor: this.state.isLightOn ? "#ffffe0" : "#282c34" }}
        animate={{ backgroundColor: this.state.isLightOn ? "#ffffe0" : "#282c34" }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          style={{ color: this.state.isLightOn ? "#000" : "#61dafb" }}
          animate={{ opacity: this.state.isLightOn ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {this.state.isLightOn ? "Light is ON" : "Light is OFF"}
        </motion.h1>
        <motion.button
          onClick={this.toggleLight}
          style={{
            padding: "10px 20px",
            fontSize: "1.5rem",
            backgroundColor: this.state.isLightOn ? "#dc3545" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {this.state.isLightOn ? "Turn OFF" : "Turn ON"}
        </motion.button>
      </motion.div>
    );
  }
}
