import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";

import Game from "./components/Game";

// import App from "./components/App/App"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   {/* <Game /> */}
   <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom";
// import Game from "./components/Game";

// ReactDOM.render(<Game />, document.getElementById("root"));

// import React from "react";
// import ReactDOM from "react-dom";

// import App from "./App";

// import "bootstrap/dist/css/bootstrap.min.css";

// ReactDOM.render(<App />, document.getElementById("root"));