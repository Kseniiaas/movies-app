export const apiKey = "5c439718a94b1009b444273e62114c9b";
export const baseUrl = "https://api.themoviedb.org/3";

export const fetchMovies = async (query, page = 1) => {
  const url = query
    ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
    : `${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

export const fetchGenres = async () => {
  const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  return response.json();
};

export const createGuestSession = async () => {
  const url = `${baseUrl}/authentication/guest_session/new?api_key=${apiKey}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to create guest session");
  }
  return response.json();
};

export const fetchMovieRating = async (movieId, guestSessionId) => {
  const url = `${baseUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch movie rating");
  }
  const data = await response.json();
  return data.value || 0;
};

export const rateMovie = async (movieId, rating, guestSessionId) => {
  const url = `${baseUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`;
  
  const body = JSON.stringify({ value: rating });
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (response.ok) {
    return true;
  } else {
    throw new Error("Failed to rate movie");
  }
};