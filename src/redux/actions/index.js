// actions.js

export const GET_NOWPLAYING = 'GET_NOWPLAYING';
export const GET_UPCOMING = 'GET_UPCOMING';
export const GET_POPULAR = 'GET_POPULAR';
export const GET_TOPRATED = 'GET_TOPRATED';
export const GET_SEARCH = 'GET_SEARCH';
export const GET_REVIEWS = 'GET_REVIEWS';
export const POST_REVIEWS = 'POST_REVIEWS';
export const GET_SIMILAR = 'GET_SIMILAR';
// tvshow
export const GET_AIRINGTODAY = 'GET_AIRINGTODAY';
export const GET_ONTHEAIR = 'GET_ONTHEAIR';
export const GET_TVPOPULAR = 'GET_TVPOPULAR';
export const GET_TVTOPRATED = 'GET_TVTOPRATED';

const apiKey = "fe4cdf06ddd3985087ca7bae07a4bddb";
const baseApiUrl = "https://api.themoviedb.org/3";
const guestId = "8a961debe9bae6f8b709f8834a8bfd53";

const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error("Problema nella chiamata API");
  }
  return response.json();
};

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  return handleErrors(response);
};

const filterResultsWithPosterPath = (results) => {
  return results.filter(movie => movie.backdrop_path);
};

export const getFetch = (type, nome) => {
  return async (dispatch) => {
    try {
      const obj = await fetchData(`${baseApiUrl}/${type}/${nome}?api_key=${apiKey}`);
      const filteredResults = filterResultsWithPosterPath(obj.results);
      switch (nome) {
        case 'now_playing':
          dispatch({ type: GET_NOWPLAYING, payload: filteredResults });
          break;
        case 'upcoming':
          dispatch({ type: GET_UPCOMING, payload: filteredResults });
          break;
        case 'popular':
          if (type === "movie") {
            dispatch({ type: GET_POPULAR, payload: filteredResults });
          } else if (type === "tv") {
            dispatch({ type: GET_TVPOPULAR, payload: filteredResults });
          }
          break;
        case 'top_rated':
          if (type === "movie") {
            dispatch({ type: GET_TOPRATED, payload: filteredResults });
          } else if (type === "tv") {
            dispatch({ type: GET_TVTOPRATED, payload: filteredResults });
          }
          break;
        case 'airing_today':
          dispatch({ type: GET_AIRINGTODAY, payload: filteredResults });
          break;
        case 'on_the_air':
          dispatch({ type: GET_ONTHEAIR, payload: filteredResults });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`ERRORE nella richiesta ${nome}: ${error.message}`);
    }
  };
};


export const search = (nome) => {
  return async (dispatch) => {
    try {
      const obj = await fetchData(`https://api.themoviedb.org/3/search/movie?query=${nome}&api_key=${apiKey}`);
      const filteredResults = filterResultsWithPosterPath(obj.results);
      dispatch({ type: GET_SEARCH, payload: filteredResults });
    } catch (error) {
      console.error(`ERRORE nella richiesta di ricerca: ${error.message}`);
    }
  };
};

export const similar = (type,id) => {
  return async (dispatch) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTRjZGYwNmRkZDM5ODUwODdjYTdiYWUwN2E0YmRkYiIsInN1YiI6IjY2MmE3OGIyNTBmN2NhMDBiM2M4OWIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8BNyjqt4a_3nsuG_PYooEZY1naVTuU-434lKKDlFw6E'
      }
    };

    try {
      const obj = await fetchData(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`, options);
      const filteredResults = filterResultsWithPosterPath(obj.results);
      dispatch({
        type: GET_SIMILAR, payload: filteredResults
      });
    } catch (error) {
      console.error(`ERRORE nella richiesta di film simili per ${id}: ${error.message}`);
    }
  };
};

export const getReviews = (type,id) => { 
  return async (dispatch) => {
    try {
      const obj = await fetchData(`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${apiKey}`);
      dispatch({ type: GET_REVIEWS, payload: obj.results });
    } catch (error) {
      console.error(`ERRORE nella richiesta di recensioni per ${id}: ${error.message}`);
    }
  };
};

export const postReviews = (id, body) => {
  return async (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTRjZGYwNmRkZDM5ODUwODdjYTdiYWUwN2E0YmRkYiIsInN1YiI6IjY2MmE3OGIyNTBmN2NhMDBiM2M4OWIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8BNyjqt4a_3nsuG_PYooEZY1naVTuU-434lKKDlFw6E'
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guestId}`, options);
      await response.json()
    } catch (error) {
      console.error(`ERRORE nella pubblicazione della recensione per ${id}: ${error.message}`);
    }
  };
};
