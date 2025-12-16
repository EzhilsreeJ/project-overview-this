import React, { useContext } from 'react';
import MovieCard from './MovieCard';
import { MovieContext } from '../context/MovieContext';
import './RecommendationList.css';

function RecommendationList() {
  const { popularMovies, trendingMovies, setSelectedMovie } = useContext(MovieContext);

  // Simple recommendation logic: combine popular and trending, then pick a few distinct ones
  const allMovies = [...popularMovies, ...trendingMovies];
  const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie.id, movie])).values());

  // Shuffle and pick a few (e.g., 3) for recommendation
  const shuffled = uniqueMovies.sort(() => 0.5 - Math.random());
  const recommendations = shuffled.slice(0, 3);

  return (
    <div className="recommendation-list">
      {recommendations.length > 0 ? (
        recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieSelect={setSelectedMovie} />
        ))
      ) : (
        <p>No recommendations available yet. Keep browsing!</p>
      )}
    </div>
  );
}

export default RecommendationList;