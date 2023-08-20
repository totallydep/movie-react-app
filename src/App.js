import React from "react";
import searchIcon from "./search.svg";
import "./App.css";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=18d87383";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>FilmFusion</h1>

      <div className="search">
        <input
          type="text"
          placeholder="enter movie name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <img src={searchIcon} alt="searchIcon" onClick={() => handleSearch()} />
      </div>

      <div className="container">
        {movies?.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <div className="empty">
            <h2>No Results Found.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
