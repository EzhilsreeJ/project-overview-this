import React from 'react';
import './MovieCard.css';

function MovieCard({ movie, onMovieSelect }) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

  const handleClick = () => {
    onMovieSelect(movie);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : '/placeholder-poster.png'}
        alt={movie.title}
        className="movie-poster"
        onError={(e) => { e.target.onerror = null; e.target.src="/placeholder-poster.png"; }}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
        <p>⭐ {movie.vote_average || 'N/A'}</p>
      </div>
    </div>
  );
}

export default MovieCard;