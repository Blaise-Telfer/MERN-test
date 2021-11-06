import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";


function App() {
  
  const [message, setMessage] = useState({});
  
  useEffect(() => {
    axios.get("/api/test").then((response) => {
	  setMessage(response.data)
    });
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