import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-card-content">
        <div>
          <h3>{movie.title}</h3>
          <p>Genre: {movie.genre}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;