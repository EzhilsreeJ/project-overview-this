import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

function MovieList({ movies, onMovieSelect }) {
  return (
    <div className="movie-list">
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieSelect={onMovieSelect} />
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default MovieList;