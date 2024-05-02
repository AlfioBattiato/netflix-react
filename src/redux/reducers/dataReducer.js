import { GET_NOWPLAYING, GET_POPULAR, GET_SEARCH, GET_TOPRATED, GET_UPCOMING } from "../actions/index";

const initialState = {
    nowplaying: "",
    upcoming: "",
    toprated: "",
    popular: "",
    search: "",
  

}

const dataReducer = function(state = initialState, action) {
    switch (action.type) {
     
        case GET_NOWPLAYING:
                return {
                    ...state,
                    nowplaying:  action.payload
                };
        case GET_UPCOMING:
                return {
                    ...state,
                    upcoming:  action.payload
                };
        case GET_POPULAR:
                return {
                    ...state,
                    toprated:  action.payload
                };
        case GET_TOPRATED:
                return {
                    ...state,
                    popular:  action.payload
                };
        case GET_SEARCH:
                return {
                    ...state,
                    search:  action.payload
                };

            
        default:
            return state;
    }
}

export default dataReducer;
