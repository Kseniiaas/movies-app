import { createContext, useState, useEffect } from "react";
import { fetchGenres } from "../api/api";

export const GenreContext = createContext([]);

const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (error) {
        setError("Error fetching genres");
        console.error("Error fetching genres:", error);
      }
    };

    getGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres, error }}>
      {children}
    </GenreContext.Provider>
  );
};

export default GenreProvider;
