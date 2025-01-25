import { useEffect, useState } from "react";
// useParams gets our dynamic movie id to make our page for selected mvoie
import { useParams } from "react-router-dom";
import axios from "axios";

// Movies exponent
export default function Movies() {
  // Gets movie ID from the URL
  const { id } = useParams();
  // This state hold our movie details and updates it when a new one is clicked
  const [movie, setMovie] = useState(null);

  // Rerenders component each time movie id changes
  useEffect(() => {
    // Func will take movie details when component loads or movie ID changes
    async function fetchMovieDetails() {
      const apiKey = "5865f6f02b62d72f0866293a0e421985";
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

      try {
        // await api response for the specific movies details
        const response = await axios.get(url);
        setMovie(response.data); // Fetched data stored in state
      } catch (error) {
        console.error(`Error fetching movie details: ${error}`);
      }
    }

    // Call the func we just made to actually fetch the movie details
    fetchMovieDetails();
  }, [id]); // Dependency array, wehn movie id changes, useEffect will re-execute

  // If there's no movie data yet, show this loading message to show we're waiting on our data
  if (!movie) {
    return <p>Loading...</p>;
  }

  // Here we return the data for that specific movie
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Description: {movie.overview}</p>
      {/* Gets movie poster with a width of 500px, slightly larger than home page */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <p>Released: {movie.release_date}</p>
      <p>Rated: {movie.vote_average}/10</p>
    </div>
  );
}
