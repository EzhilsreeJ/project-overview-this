import React, { useState, useEffect } from 'react';

function MovieForm({ initialMovie, onSubmit }) {
  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    director: '',
    poster: ''
  });

  useEffect(() => {
    if (initialMovie) {
      setMovie(initialMovie);
    }
  }, [initialMovie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie);
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <h3>{initialMovie ? 'Edit Movie' : 'Add New Movie'}</h3>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={movie.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="releaseYear">Release Year:</label>
        <input
          type="number"
          id="releaseYear"
          name="releaseYear"
          value={movie.releaseYear}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="director">Director:</label>
        <input
          type="text"
          id="director"
          name="director"
          value={movie.director}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="poster">Poster URL:</label>
        <input
          type="text"
          id="poster"
          name="poster"
          value={movie.poster}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Save Movie</button>
    </form>
  );
}

export default MovieForm;