import "./MovieCard.css";
import { Rate } from "antd";
import { useContext, useEffect, useState } from "react";
import { GenreContext } from "../context/GenreContext";

const MovieCard = ({ movie, isRatedTab, setRatedMovies }) => {
  const { genres, error } = useContext(GenreContext);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const savedRating = JSON.parse(localStorage.getItem("ratedMovies"))?.find(
      (ratedMovie) => ratedMovie.id === movie.id
    )?.rating;
    if (savedRating) {
      setRating(savedRating);
    }
  }, [movie.id]);

  const handleRate = (value) => {
    setRating(value);
    const ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    const movieIndex = ratedMovies.findIndex((ratedMovie) => ratedMovie.id === movie.id);

    if (movieIndex !== -1) {
      ratedMovies[movieIndex].rating = value;
    } else {
      ratedMovies.push({ ...movie, rating: value });
    }

    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));

    if (setRatedMovies) {
      setRatedMovies([...ratedMovies]);
    }

    window.dispatchEvent(new Event("storage"));
  };

  const genreNames = Array.isArray(movie.genre_ids)
    ? movie.genre_ids.map(
        (id) => genres?.find((g) => g.id === id)?.name || "Unknown"
      )
    : [];

  const formattedDate = new Date(movie.release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text || " ";
    return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
  };

  const getRatingColor = (rating) => {
    if (rating >= 0 && rating <= 3) return "#E90000";
    if (rating > 3 && rating <= 5) return "#E97E00";
    if (rating > 5 && rating <= 7) return "#E9D100";
    return "#66E900";
  };

  return (
    <div className="movie-card">
      <div className="movie-content">
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-info">
        <div className="movie-top">
          <h3 className="movie-title">{movie.title}</h3>
          <div
            className="rating-circle"
            style={{ border: `2px solid ${getRatingColor(rating)}` }}
          >
            {rating.toFixed(1)}
          </div>
        </div>
        <p className="movie-release-date">{formattedDate}</p>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="movie-genres">
            {genreNames.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
        )}
      </div>
      <div className="movie-bottom">
        <p className="movie-description">{truncateText(movie.overview, 200)}</p>
        <div className="movie-average">
          <Rate allowHalf count={10} value={rating} onChange={handleRate} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
