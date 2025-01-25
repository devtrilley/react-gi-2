import { useState } from "react";

// Used to navigate between pages. When a user clicks a movie, we'll go to the movies page
import { useNavigate } from "react-router-dom";
// Using axios due to simpler syntax compared to .fetch()
import axios from "axios";

export default function Home() {
  // Stores search query
  const [query, setQuery] = useState("");
  // Stores list of movies API responds with
  const [movies, setMovies] = useState([]);
  // Is the data being loaded or not
  const [loading, setLoading] = useState(false);
  // Used to navigate to different routes when a movie is clicked
  const navigate = useNavigate();

  // Async func awaiting API response. When search button's clicked we make the req
  async function fetchMovies() {
    setLoading(true); // We are now actively loading once serach button is clicked
    const apiKey = "5865f6f02b62d72f0866293a0e421985"; // TMDB api key, will place in .env
    // URL we're hitting to req info dynamically with our var's
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    try {
      // Using Axios for GET request and waiting till we get our response
      const response = await axios.get(url);
      // If we get the response, then we'll update state, if not then empty arr by default
      setMovies(response.data.results || []);
    } catch (error) {
      console.error(`Error fetching movie data: ${error}`);
    } finally {
      // Whether we got the response or not, we're done loading, so update the state
      setLoading(false);
    }
  }

  // When the user selects a specific movie to click on
  function handleMovieClick(id) {
    navigate(`/movies/${id}`);
  }

  return (
    <div>
      <h1>Movie Search Application</h1>

      {/* Input prop onChange will update our query state each characted the user types */}
      {/* Value then equals the updated query we've set */}
      <input
        className="searchbar"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movies here..."
      />

      <button onClick={fetchMovies}>Search</button>

      {/* If we're fetching data (which we are after button is clicked), then render a loading message. The AND logical operator is a ternary operator shorthand */}
      {loading && <p>Loading...</p>}

      {/* Movie Grid */}
      <div>
        {/* .map() of movie api results to make a new array of JSX data we'll make a card using CSS, rather than making a new array of objs (why they have their own <div>)*/}
        {movies.map((movie) => {
          // Div holding movie info in elements, runs handleMovieClick when one is selected and a key has been given to differentiate them
          return <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Released: {movie.release_date}</p>
            {/* w300 = width of 300px for each movie cover. poster_path is movie cover */}
            <img onClick={() => handleMovieClick(movie.id)} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={`${movie.title}'s movie cover`} />
          </div>
        })}
      </div>
    </div>
  );
}
