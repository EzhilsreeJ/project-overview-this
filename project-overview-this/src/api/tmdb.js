// This is a placeholder API interaction module.
// In a real application, you would integrate with a service like TMDB (The Movie Database)
// or another movie API. You'll need an API key.

const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Mock data for demonstration purposes if API key is not available or for offline testing
const mockPopularMovies = [
  { id: 1, title: 'Inception', poster_path: '/poster1.jpg', overview: 'A thief who steals information by entering people\'s dreams...', vote_average: 8.8, release_date: '2010-07-16' },
  { id: 2, title: 'The Matrix', poster_path: '/poster2.jpg', overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his own role in the war against its creators.', vote_average: 8.7, release_date: '1999-03-31' },
  { id: 3, title: 'Parasite', poster_path: '/poster3.jpg', overview: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', vote_average: 8.5, release_date: '2019-05-30' },
];

const mockTrendingMovies = [
  { id: 4, title: 'Dune', poster_path: '/poster4.jpg', overview: 'A mythic and emotionally charged hero\'s journey, \'Dune\' tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond understanding.', vote_average: 8.0, release_date: '2021-10-22' },
  { id: 5, title: 'Spider-Man: No Way Home', poster_path: '/poster5.jpg', overview: 'Peter Parker\'s secret identity is revealed, compelling him to seek help from Doctor Strange. When a spell goes wrong, dangerous foes from other worlds appear.', vote_average: 8.3, release_date: '2021-12-17' },
  { id: 6, title: 'The Batman', poster_path: '/poster6.jpg', overview: 'In his second year of fighting crime, Batman explores the corruption that plagues Gotham City and connects to his own family in the midst of the killings of mysterious serial killer known as the Riddler.', vote_average: 7.8, release_date: '2022-03-04' },
];

// Function to simulate fetching popular movies
export const fetchPopularMovies = async () => {
  if (API_KEY === 'YOUR_TMDB_API_KEY') {
    console.warn("TMDB API key not configured. Using mock data for popular movies.");
    return Promise.resolve(mockPopularMovies);
  }
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Add mock poster paths if they are missing, for consistent display
    return data.results.map(movie => ({
      ...movie,
      poster_path: movie.poster_path || '/placeholder-poster.png' // Fallback poster
    }));
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    console.warn("Falling back to mock data for popular movies.");
    return Promise.resolve(mockPopularMovies);
  }
};

// Function to simulate fetching trending movies
export const fetchTrendingMovies = async () => {
  if (API_KEY === 'YOUR_TMDB_API_KEY') {
    console.warn("TMDB API key not configured. Using mock data for trending movies.");
    return Promise.resolve(mockTrendingMovies);
  }
  try {
    // You might want to fetch 'trending/movie/day' or 'trending/movie/week'
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Add mock poster paths if they are missing
    return data.results.map(movie => ({
      ...movie,
      poster_path: movie.poster_path || '/placeholder-poster.png' // Fallback poster
    }));
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    console.warn("Falling back to mock data for trending movies.");
    return Promise.resolve(mockTrendingMovies);
  }
};

// Function to fetch movie details by ID (optional, for MovieDetail component)
export const fetchMovieDetails = async (movieId) => {
  if (API_KEY === 'YOUR_TMDB_API_KEY') {
    console.warn(`TMDB API key not configured. Returning mock details for movie ID ${movieId}.`);
    // Find mock movie with the given ID
    const mockMovie = [...mockPopularMovies, ...mockTrendingMovies].find(m => m.id === movieId);
    return Promise.resolve(mockMovie || { id: movieId, title: 'Mock Movie', overview: 'Mock details' });
  }
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
};

// Function to search for movies
export const searchMovies = async (query) => {
  if (API_KEY === 'YOUR_TMDB_API_KEY') {
    console.warn("TMDB API key not configured. Simulating search results.");
    // Simulate search based on mock data
    const allMockMovies = [...mockPopularMovies, ...mockTrendingMovies];
    const filtered = allMockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered);
  }
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};