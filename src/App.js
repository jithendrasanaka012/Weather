import './App.css';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  const api = {
    key: '853fc39a72d3e7745373ee810365a7cb',
    url: 'https://api.openweathermap.org/data/2.5/weather'
  };

  function fetchData() {
    setLoading(true);
    fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
        setSearch('');
      })
      .catch(err => {
        console.error('error', err);
        setLoading(false);
      });
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      fetchData();
    }
  }

  // console.log(search);

  return (
    <div>
      <input
        onKeyPress={handleKeyPress}
        onChange={handleSearchChange}
        type="text"
        value={search}
        placeholder="Enter city name"
      />
      <button onClick={fetchData}>Search</button>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : data.main !== undefined ? (
        <h1>
          City: {data.name} | Temp: {data.main.temp}°C
        </h1>
      ) : (
        data.cod && data.cod !== 200 && <h1 className="error">Data not found</h1>
      )}
    </div>
  );
}

export default App;