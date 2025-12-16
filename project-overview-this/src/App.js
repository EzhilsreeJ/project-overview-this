import React, { useContext, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import RecommendationList from './components/RecommendationList';
import SearchBar from './components/SearchBar';
import { MovieContext } from './context/MovieContext';
import { fetchPopularMovies, fetchTrendingMovies } from './api/tmdb';
import './App.css';

function App() {
  const {
    selectedMovie,
    setSelectedMovie,
    popularMovies,
    setPopularMovies,
    trendingMovies,
    setTrendingMovies,
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults
  } = useContext(MovieContext);

  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const popular = await fetchPopularMovies();
        setPopularMovies(popular);

        const trending = await fetchTrendingMovies();
        setTrendingMovies(trending);
      } catch (error) {
        console.error("Error loading initial movies:", error);
      }
    };
    loadInitialMovies();
  }, [setPopularMovies, setTrendingMovies]);

  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    try {
      // In a real app, this would call an API to search movies
      // For now, we'll simulate it or use a dedicated search function if available
      // Example: const results = await searchMovies(searchTerm);
      // For this example, let's filter existing movies for simplicity
      const filtered = [...popularMovies, ...trendingMovies].filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error("Error during search:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Recommendations</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      </header>
      <main>
        {searchResults.length > 0 && (
          <section className="search-results">
            <h2>Search Results</h2>
            <MovieList movies={searchResults} onMovieSelect={setSelectedMovie} />
          </section>
        )}

        {selectedMovie ? (
          <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        ) : (
          <>
            <section className="popular-movies">
              <h2>Popular Movies</h2>
              <MovieList movies={popularMovies} onMovieSelect={setSelectedMovie} />
            </section>
            <section className="trending-movies">
              <h2>Trending Now</h2>
              <MovieList movies={trendingMovies} onMovieSelect={setSelectedMovie} />
            </section>
            <section className="recommendations">
              <h2>Recommended For You</h2>
              {/* Placeholder for personalized recommendations */}
              <RecommendationList />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;