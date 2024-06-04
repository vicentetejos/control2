import logo from './logo.svg';
import './App.css';

import { useState } from 'react';
import axios from 'axios';

function App() {
  const [joke, setJoke] = useState('');
  const [date, setdate] = useState('');
  const [category, setcat] = useState('');
 
  const getJoke = () => {
    axios.get('https://api.chucknorris.io/jokes/random').then((response) => {
      setJoke(response.data.value);  setdate(response.data.created_at); setcat(response.data.categories);
    }).catch((error) => {
      console.log(error);
    })  
  }

  

  return (
  

  <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />*/}
        <h1>Chuck Norris Jokes</h1>
      </header>
      
      <br/>
      <br/>
      {/* Botón para obtener un nuevo chiste */}
      <button className="btn btn-primary" onClick={getJoke}>Get Joke</button>      
      <br /><br />
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>El Fact</th>
                <th>Fecha</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{joke}</td>
                <td>{date}</td>
                <td>{category}</td>
              </tr>
            </tbody>
          </table>
        </div>
      <br/>



    </div>
  );
}

export default App;
