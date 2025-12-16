import React, { useState, useEffect } from 'react';
import MovieForm from '../components/MovieForm';
import { fetchMovies, addMovie, updateMovie, deleteMovie } from '../../utils';
import { NavLink } from 'react-router-dom';

function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    loadMovies();
  }, []);

  const handleSaveMovie = async (movieData) => {
    if (editingMovie) {
      // Update existing movie
      await updateMovie(editingMovie.id, movieData);
    } else {
      // Add new movie
      await addMovie(movieData);
    }
    // Refresh the movie list
    const updatedMovies = await fetchMovies();
    setMovies(updatedMovies);
    setEditingMovie(null);
    setShowForm(false);
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await deleteMovie(id);
      // Refresh the movie list
      const updatedMovies = await fetchMovies();
      setMovies(updatedMovies);
    }
  };

  const handleAddClick = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin</NavLink>
      </nav>

      <button onClick={handleAddClick} style={{ marginBottom: '20px' }}>Add New Movie</button>

      {showForm && (
        <MovieForm
          initialMovie={editingMovie}
          onSubmit={handleSaveMovie}
        />
      )}

      <h2 style={{ marginTop: '30px' }}>Existing Movies</h2>
      {movies.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {movies.map(movie => (
            <li key={movie.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #eee',
              marginBottom: '10px',
              backgroundColor: '#fff',
              borderRadius: '4px'
            }}>
              <span>{movie.title} ({movie.releaseYear})</span>
              <div>
                <button onClick={() => handleEditClick(movie)} style={{ marginRight: '10px', backgroundColor: '#f39c12', color: 'white' }}>Edit</button>
                <button onClick={() => handleDeleteClick(movie.id)} style={{ backgroundColor: '#e74c3c', color: 'white' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;