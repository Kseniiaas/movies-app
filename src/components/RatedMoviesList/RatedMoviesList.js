import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

const RatedMoviesList = () => {
  const [ratedMovies, setRatedMovies] = useState([]);

  const loadRatedMovies = () => {
    const savedRatedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    setRatedMovies(savedRatedMovies);
  };

  useEffect(() => {
    loadRatedMovies();
    
    const handleStorageChange = () => loadRatedMovies();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="movie-list">
      {ratedMovies.length === 0 ? (
        <p>No rated movies yet.</p>
      ) : (
        ratedMovies.map((ratedMovie) => (
          <MovieCard
            key={ratedMovie.id}
            movie={ratedMovie}
            isRatedTab={true}
            setRatedMovies={setRatedMovies}
          />
        ))
      )}
    </div>
  );
};

export default RatedMoviesList;



