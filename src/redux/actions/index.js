export const GET_NOWPLAYING = 'GET_NOWPLAYING';
export const GET_UPCOMING = 'GET_UPCOMING';
export const GET_POPULAR = 'GET_POPULAR';
export const GET_TOPRATED = 'GET_TOPRATED';
export const GET_SEARCH = 'GET_SEARCH';

const apiKey = "fe4cdf06ddd3985087ca7bae07a4bddb";
const baseApiUrl = "https://api.themoviedb.org/3/movie/";

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
            // Se il nome non corrisponde a nessun caso, non fare nulla
            break;
        }
      })
      .catch((error) => {
        console.error(`ERRORE nella richiesta ${nome}: ${error.message}`);
        // Potresti anche dispatchare un'azione di errore qui
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

