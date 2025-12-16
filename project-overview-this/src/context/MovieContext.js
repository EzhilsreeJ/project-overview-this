import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <MovieContext.Provider
      value={{
        popularMovies,
        setPopularMovies,
        trendingMovies,
        setTrendingMovies,
        selectedMovie,
        setSelectedMovie,
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};