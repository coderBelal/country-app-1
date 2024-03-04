import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import "./App.css";

import Search from "./components/Search";
const url = "https://restcountries.com/v3.1/all";
const App = () => {
  //------------Data structure (selection)--------------
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountris] = useState([]);
  const [filteredsCountries, setFilteredCountries] = useState(countries);
  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountris(data);
      setFilteredCountries(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };
  //------------Data structure (selection)--------------
  useEffect(() => {
    fetchData(url);
  });

  //------------ Search Country----------------------
  const handleSearch = (searchValue) => {
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setFilteredCountries(newCountries);
  };
  //------------ Search Country----------------------
  return (
    <>
      <h1>Country App</h1>
      <Search onSearch={handleSearch} />

      {error && <h5>{error.message}</h5>}
      {countries && <Countries countries={filteredsCountries} />}
    </>
  );
};

export default App;
