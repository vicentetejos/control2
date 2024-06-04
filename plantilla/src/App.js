import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar.js';

function App() {
 
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('search');

  const getfact = () => {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then((response) => {
        const fact = response.data.value;
        const date = response.data.created_at;
        const category = response.data.categories.join(', ');
        alert(`Fact: ${fact}\nDate: ${date}\nCategory: ${category}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const searchfact = () => {
    axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then((response) => {
        setResults(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addToFavorites = (joke) => {
    setFavorites([...favorites, joke]);
  }
  
  const removeFromFavorites = (jokeToRemove) => {
    setFavorites(favorites.filter(joke => joke.id !== jokeToRemove.id));
  }

  const renderView = () => {
    
    switch (view) {
      case 'random':
        return null;
      case 'search':
        return (
          <>
          <br />
          <div><img src="https://i.gifer.com/origin/ca/cae0e37657949a0a6450bbc73cd9aabe_w200.webp" alt="Search Chuck"></img></div>
            <input 
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Looking for Fact..."
            />
            <br/>
            <button className="btn btn-secondary" onClick={searchfact}>Search</button>
            <br /><br />
            {results.length > 0 && (
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Fact</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((fact) => (
                      <tr key={fact.id}>
                        <td>{fact.value}</td>
                        <td>{fact.created_at}</td>
                        <td>{fact.categories.join(', ')}</td>
                        <td>
                          <button className="btn btn-success" onClick={() => addToFavorites(fact)}>Like!</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        );
      case 'favorites':
        return (
          <>
          
            {favorites.length > 0 ? (
              
              <div className="table-responsive">
                <img src="https://i.gifer.com/FPW.gif" alt="Fav Chuck"></img>
                <table className="table table-bordered table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Fact</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((fact, index) => (
                      <tr key={index}>
                        <td>{fact.value}</td>
                        <td>{fact.created_at}</td>
                        <td>{fact.categories.join(', ')}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => removeFromFavorites(fact)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            ) : (
              <div> <img src="https://64.media.tumblr.com/5f06644c34c935cbaab4a0f536c0b5da/tumblr_inline_p7jrecLoLT1qhy6fn_400.gifv" alt="nothing"></img><br/><p>No hay favoritos. Agrega algunos desde la búsqueda de factos.</p></div>
              
            )}
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <br /><br />
        <h1>Chuck Norris Factos</h1>
        <br /><br />
        <div className="image-container">
  </div>
    <br /><br />

      </header>
      <div className="container">
        <Sidebar onSelect={setView} />
        <div className="content">
          {renderView()}
        </div>
      </div>
      <footer className="App-footer">
        @2024 Control 2 TEL335 || Vicente Tejos Medel | 201930017-2             ||   UTFSM <br /><button className="btn btn-primary" onClick={getfact}>Get Random Fact</button>
      </footer>
    </div>
  );
}


export default App;