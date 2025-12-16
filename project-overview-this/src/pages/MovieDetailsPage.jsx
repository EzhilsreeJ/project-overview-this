import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../utils';
import { NavLink } from 'react-router-dom';

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieById(id);
        if (data) {
          setMovie(data);
        } else {
          setError('Movie not found.');
        }
      } catch (err) {
        setError('Failed to load movie details. Please try again later.');
        console.error(`Error fetching movie ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <NavLink to="/">Back to Home</NavLink>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <p>Movie not found.</p>
        <NavLink to="/">Back to Home</NavLink>
      </div>
    );
  }

  return (
    <div>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin</NavLink>
      </nav>
      <div className="movie-details">
        <img src={movie.poster} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        {/* Add more details as needed */}
      </div>
      <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>Back to Movies</button>
    </div>
  );
}

export default MovieDetailsPage;