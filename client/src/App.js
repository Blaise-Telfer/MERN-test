import { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import socketIOClient from 'socket.io-client';


function App() {
  const [message, setMessage] = useState({});
  const socket = useRef();
  
  useEffect(() => {
    axios.get("/api/test").then((response) => {
	  setMessage(response.data)
    });
	
	socket.current = socketIOClient("http://localhost:5000");
    socket.current.on('addUser', res => console.log("socket has connected succesfully"));
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{message.message}</h3>
		<p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
