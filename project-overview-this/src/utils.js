// Placeholder for utility functions.
// In a real application, this might include API call logic, data formatting, etc.

export const fetchMovies = async () => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, title: "Inception", genre: "Sci-Fi", releaseYear: 2010, director: "Christopher Nolan", poster: "https://via.placeholder.com/300x450/FF5733/FFFFFF?text=Inception" },
    { id: 2, title: "The Matrix", genre: "Sci-Fi", releaseYear: 1999, director: "Lana Wachowski, Lilly Wachowski", poster: "https://via.placeholder.com/300x450/33FF57/FFFFFF?text=The+Matrix" },
    { id: 3, title: "Parasite", genre: "Thriller", releaseYear: 2019, director: "Bong Joon Ho", poster: "https://via.placeholder.com/300x450/3357FF/FFFFFF?text=Parasite" },
    { id: 4, title: "Interstellar", genre: "Sci-Fi", releaseYear: 2014, director: "Christopher Nolan", poster: "https://via.placeholder.com/300x450/FFC300/FFFFFF?text=Interstellar" },
    { id: 5, title: "Spirited Away", genre: "Animation", releaseYear: 2001, director: "Hayao Miyazaki", poster: "https://via.placeholder.com/300x450/DAF7A6/FFFFFF?text=Spirited+Away" },
  ];
};

export const getMovieById = async (id) => {
  const movies = await fetchMovies();
  return movies.find(movie => movie.id === parseInt(id));
};

export const addMovie = async (movieData) => {
  // Mock API call to add a movie
  console.log("Adding movie:", movieData);
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, you'd get a response with the new movie's ID and data
  return { ...movieData, id: Math.floor(Math.random() * 1000) + 10 };
};

export const updateMovie = async (id, movieData) => {
  // Mock API call to update a movie
  console.log(`Updating movie ${id}:`, movieData);
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id: parseInt(id), ...movieData };
};

export const deleteMovie = async (id) => {
  // Mock API call to delete a movie
  console.log(`Deleting movie ${id}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  return true; // Indicates success
};