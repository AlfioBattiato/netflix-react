export const GET_NOWPLAYING = 'GET_NOWPLAYING';
export const GET_UPCOMING = 'GET_UPCOMING';
export const GET_POPULAR = 'GET_POPULAR';
export const GET_TOPRATED = 'GET_TOPRATED';
export const GET_SEARCH = 'GET_SEARCH';
export const GET_REVIEWS = 'GET_REVIEWS';
export const POST_REVIEWS = 'POST_REVIEWS';
export const GET_SIMILAR = 'GET_SIMILAR';

const apiKey = "fe4cdf06ddd3985087ca7bae07a4bddb";
const baseApiUrl = "https://api.themoviedb.org/3/movie/";
const guestId = "8a961debe9bae6f8b709f8834a8bfd53";

export const getFetch = (nome) => {
  return (dispatch) => {
    fetch(`${baseApiUrl}${nome}?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problema nella chiamata API");
        }
        return response.json();
      })
      .then((obj) => {
        // Dispatching action based on nome
        switch (nome) {
          case 'now_playing':
            dispatch({ type: GET_NOWPLAYING, payload: obj.results });
            break;
          case 'upcoming':
            dispatch({ type: GET_UPCOMING, payload: obj.results });
            break;
          case 'popular':
            dispatch({ type: GET_POPULAR, payload: obj.results });
            break;
          case 'top_rated':
            dispatch({ type: GET_TOPRATED, payload: obj.results });
            break;
          
          default:
            break;
        }
      })
      .catch((error) => {
        console.error(`ERRORE nella richiesta ${nome}: ${error.message}`);
      });
  };
};

export const search = (nome) => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${nome}&api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problema nella chiamata API");
        }
        return response.json();
      })
      .then((obj) => {
        dispatch({
          type: GET_SEARCH,
          payload: obj.results
        });
      })
      .catch((error) => {
        console.error(`ERRORE nella richiesta di ricerca: ${error.message}`);
      });
  };
};

export const getReviews = (nome) => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/movie/${nome}/reviews?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problema nella chiamata API");
        }
        return response.json();
      })
      .then((obj) => {
        // console.log("rew", obj);
        dispatch({
          type: GET_REVIEWS,
          payload: obj.results
        });
      })
      .catch((error) => {
        console.error(`ERRORE nella richiesta di ricerca: ${error.message}`);
      });
  };
};

export const postReviews = (id, body) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTRjZGYwNmRkZDM5ODUwODdjYTdiYWUwN2E0YmRkYiIsInN1YiI6IjY2MmE3OGIyNTBmN2NhMDBiM2M4OWIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8BNyjqt4a_3nsuG_PYooEZY1naVTuU-434lKKDlFw6E'
      },
      body: JSON.stringify(body),
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guestId}`, options)
      .then(response => response.json())
      .then(response => console.log("rate ok",response))
      .catch(err => console.error(err));
  };
};
export const similar = (id) => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTRjZGYwNmRkZDM5ODUwODdjYTdiYWUwN2E0YmRkYiIsInN1YiI6IjY2MmE3OGIyNTBmN2NhMDBiM2M4OWIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8BNyjqt4a_3nsuG_PYooEZY1naVTuU-434lKKDlFw6E'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, options)
      .then(response => response.json())
      .then((obj) => {
        dispatch({
          type: GET_SIMILAR,
          payload: obj.results
        });
      })
      .catch(err => console.error(err));
  };
};



