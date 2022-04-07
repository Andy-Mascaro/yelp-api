import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './services/components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zipCode, setZipCode] = useState('');
  const [search, setSearch] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const data = await fetchBusinesses(zipCode, search);
    return setBusinesses(data);

  };

  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input type="text" placeholder="zip" onChange={(e)=>setZipCode(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <button value={zipCode} onClick={handleSubmit}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}

export default App;
