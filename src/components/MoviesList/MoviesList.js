import { useEffect, useState } from "react";
import { fetchMovies } from "../api/api";
import MovieCard from "../MovieCard/MovieCard";
import { Spin, Alert, Input, Pagination } from "antd";
import { debounce } from "lodash";
import "./MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const loadMovies = async (searchQuery, pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(searchQuery, pageNum);
      setMovies(data.results.slice(0, 6));
      setTotalResults(data.total_results);
    } catch (err) {
      setError("Error loading movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(query, page);
  }, [query, page]);

  const handleSearch = debounce((e) => {
    setQuery(e.target.value);
    setPage(1);
  }, 500);

  return (
    <div className="movie-container">
      <Input
        id="movieSearch"
        name="search"
        placeholder="Type to search..."
        onChange={handleSearch}
        autoComplete="off"
      />
      {loading && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}>
          <Spin size="large" />
        </div>
      )}
      {error && <Alert type="error" message={error} />}
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        current={page}
        total={totalResults}
        pageSize={6}
        showSizeChanger={false}
        onChange={(pageNum) => setPage(pageNum)}
      />
    </div>
  );
};

export default MoviesList;
