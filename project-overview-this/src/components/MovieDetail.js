import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../api/tmdb'; // Assuming you have this function
import './MovieDetail.css';

function MovieDetail({ movie, onClose }) {
  const [detailedMovie, setDetailedMovie] = useState(null);
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    const loadDetails = async () => {
      if (movie) {
        // If movie object already has detailed info, use it. Otherwise, fetch.
        // This is a simplification; in a real app, you'd likely always fetch or have a flag.
        if (!movie.fullDetails) { // Assuming 'fullDetails' is not present initially
          const details = await fetchMovieDetails(movie.id);
          setDetailedMovie({ ...movie, ...details });
        } else {
          setDetailedMovie(movie);
        }
      }
    };
    loadDetails();
  }, [movie]);

  if (!movie || !detailedMovie) {
    return null; // Or a loading indicator
  }

  return (
    <div className="movie-detail-overlay" onClick={onClose}>
      <div className="movie-detail-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <img
          src={detailedMovie.backdrop_path ? IMAGE_BASE_URL + detailedMovie.backdrop_path : '/placeholder-backdrop.png'}
          alt={detailedMovie.title}
          className="movie-backdrop"
        />
        <h2>{detailedMovie.title}</h2>
        <p><strong>Release Date:</strong> {detailedMovie.release_date || 'N/A'}</p>
        <p><strong>Rating:</strong> {detailedMovie.vote_average ? `${detailedMovie.vote_average}/10` : 'N/A'}</p>
        <p><strong>Overview:</strong> {detailedMovie.overview || 'No overview available.'}</p>
        {/* Add more details as available, e.g., genres, runtime, cast */}
      </div>
    </div>
  );
}

export default MovieDetail;