import { ADD_TO_LIST, GET_AIRINGTODAY, GET_NOWPLAYING, GET_ONTHEAIR, GET_POPULAR, GET_REVIEWS, GET_SEARCH, GET_SIMILAR, GET_TOPRATED, GET_TVPOPULAR, GET_TVTOPRATED, GET_UPCOMING, REMOVE_FROM_LIST } from "../actions/index";

const initialState = {
    nowplaying: [],
    upcoming: [],
    toprated: [],
    popular: [],
    search: [],
    similar: [],
    reviews: null,
    airing_today: [],
    on_the_air: [],
    popular_tv: [],
    top_rated_tv: [],
    myList: [],


}

const dataReducer = function (state = initialState, action) {
    switch (action.type) {

        case GET_NOWPLAYING:
            return {
                ...state,
                nowplaying: action.payload
            };
        case GET_UPCOMING:
            return {
                ...state,
                upcoming: action.payload
            };
        case GET_POPULAR:
            return {
                ...state,
                toprated: action.payload
            };
        case GET_TOPRATED:
            return {
                ...state,
                popular: action.payload
            };
        case GET_SEARCH:
            return {
                ...state,
                search: action.payload
            };
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            };
        case GET_SIMILAR:
            return {
                ...state,
                similar: action.payload
            };

        case GET_TVTOPRATED:
            return {
                ...state,
                top_rated_tv: action.payload
            };
        case GET_TVPOPULAR:
            return {
                ...state,
                popular_tv: action.payload
            };
        case GET_AIRINGTODAY:
            return {
                ...state,
                airing_today: action.payload
            };
        case GET_ONTHEAIR:
            return {
                ...state,
                on_the_air: action.payload
            };
            case ADD_TO_LIST: {
                
                if (state.myList.some(movie => movie.id === action.payload.id)) {
                  return state;
                } else {
                  return {
                    ...state,
                    myList: [...state.myList, action.payload],
                  };
                }
              }
        case REMOVE_FROM_LIST:
            return {
                ...state,
                myList: state.myList.filter(movie => movie.id !== action.payload),
            };



        default:
            return state;
    }
}

export default dataReducer;
