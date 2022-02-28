import React, {useState, useEffect} from 'react';
import './App.css';
import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4000";

function App() {

  useEffect(() => {
    console.log("connecting to server")
    io(ENDPOINT);
  } ,[])

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
