// MovieList.jsx

import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";
import { useState, useEffect } from "react";

const MovieList = ({ movies, onMovieClick }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (movies.length) {
      const moviesWithPosters = movies.filter((movie) => movie.poster_path);
      setFilteredMovies(moviesWithPosters);
      setSearched(true);
    }
  }, [movies]);

  if (searched && !filteredMovies.length) return <p>No movies found</p>;

  return (
    <ul className={styles.movieList}>
      {filteredMovies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.movieItem}>
          <Link
            to={`/movies/${id}`}
            className={styles.movieLink}
            onClick={() => onMovieClick(id)} // Викликаємо обробник кліку
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${poster_path}`}
              alt={title}
              className={styles.moviePoster}
            />
            <p className={styles.movieTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
