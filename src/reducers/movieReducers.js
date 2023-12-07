//import { INCREMENT, DECREMENT } from '../actions/types';

const initialState = {
    loading: false,
    movies: [],
    errorMessage: null,
    yearsDropdown: []
  };
  
  const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case "Search_Request":
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "Search_Success":
        const years = action.payload.map(movie => movie.Year);
        return {
          ...state,
          loading: false,
          movies: action.payload,
          yearsDropdown: [...new Set(years)].sort((a, b) => parseInt(a) - parseInt(b))
        };
      case "Search_Failure":
        return {
          ...state,
          loading: false,
          errorMessage: action.payload
        };
      case "Remove_Movie":
        const updatedMovies = state.movies.filter(movie => movie.imdbID !== action.payload);
        const updatedYears = updatedMovies.map(movie => movie.Year);
        return {
          ...state,
          movies: updatedMovies,
          yearsDropdown: [...new Set(updatedYears)].sort((a, b) => parseInt(a) - parseInt(b))
        };
      case "Add_Movie":
        return {
          ...state,
          movies: [...state.movies, action.payload],
          yearsDropdown: [...new Set([...state.yearsDropdown, action.payload.Year])].sort((a, b) => parseInt(a) - parseInt(b))
        };
      default:
        return state;
    }
  };
  
  export default movieReducer;