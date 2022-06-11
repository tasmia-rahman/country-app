import React, {useState, useEffect} from "react";
import './App.css'
import Countries from './components/Countries'
import Search from "./Search";

const App = () => {
  const url = "https://restcountries.com/v3.1/all";

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  const fetchData = async (url) => {
    setIsLoading(true);
    try{
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setIsLoading(false);
      setError(null);
    }
    catch(err){
      setIsLoading(false);
      setError(err);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [])
  
  const handleRemove = (name) => {
    setCountries((prevData) => {
      const filteredCountries = prevData.filter((country) => country.name.common !== name);
      return filteredCountries;
    })
  }

  const handleSearch = (searchValue) => {
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    })
    setCountries(newCountries);
  }

  return (
    <div>
      <h1>Country App</h1>
      <Search onSearch={handleSearch} />
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {
        countries && <Countries countries={countries} onRemove={handleRemove} />
      }
    </div>
  );
}

export default App;
