// MovieDetailsPage.jsx

import {
  useParams,
  Outlet,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); // Додано для обробки помилок
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDE5MmVhNzI4MWE4ZGRkY2Y4NWQzNGY0ZjU0MWNkNSIsIm5iZiI6MTcyNjkyNTYyMi4xODQ5MTYsInN1YiI6IjY2ZWRhZmMyMTkyM2ZlMDMyN2FkZTkzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CbpBhMGMc8FenSUP-azVQg86igYBYKq3K4kY6PxzbBY",
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError(true); // Встановлюємо помилку, якщо запит не вдався
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    const from = location.state?.from || "/movies";
    navigate(from);
  };

  if (error) {
    return <Navigate to="/404" />; // Перенаправлення на NotFoundPage
  }

  if (!movie) return null;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Go back
      </button>
      <h1 className={styles.title}>
        {movie.title} ({movie.release_date.split("-")[0]})
      </h1>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h2>Additional information</h2>
        <nav className={styles.navLinks}>
          <Link to="cast" state={{ from: location.state?.from }}>
            Cast
          </Link>
          <Link to="reviews" state={{ from: location.state?.from }}>
            Reviews
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
