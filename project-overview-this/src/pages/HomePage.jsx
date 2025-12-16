import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../utils';
import { NavLink } from 'react-router-dom';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div>
      <h1>Movie Recommendations</h1>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin</NavLink>
      </nav>
      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;