import React, { useReducer, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import Header from "./Header";
import Movie from "./movie";
import Search from "./Search";
import Addmovie from "./Addmovie";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const Default_Image = "https://picsum.photos/id/96/200/300"

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "Search_Request":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "Search_Sucess":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "Search_Failure":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    case "Remove_Movie":
      const updatedMovies = state.movies.filter(
        (movie) => movie.imdbID !== action.payload
      );
      const updatedYears = updatedMovies.map(movie => movie.Year);
      return {
        ...state,
        movies: updatedMovies,
        yearsDropdown: [...new Set(updatedYears)].sort((a,b) => parseInt(a) - parseInt(b))
      };
    default:
      return state;
  }
};



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [yearsDropdown, setYearsDropdown] = useState([]);
  const [showAddMoviePopup, setShowAddMoviePopup] = useState(false);

  const handleAddMovie = (title, year ) => {
    const random_uuid = uuidv4();
    dispatch({
      type: "Search_Sucess",
      payload: [
        ...state.movies,
        { Title: title, Year: year, imdbID: random_uuid, Poster: Default_Image } // Replace 'customID' with a unique ID
      ]
    });

    setYearsDropdown(prevYears => {
      if (!prevYears.includes(year)) {
        console.log(year);
        return [...prevYears, year].sort((a, b) => parseInt(a) - parseInt(b));

      }
      return prevYears;
    });
  };


    useEffect(() => {
    
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
              const movies = jsonResponse.Search || [];
              const years = movies.map(movie => movie.Year);
              setYearsDropdown([...new Set(years)].sort((a, b) => parseInt(a) - parseInt(b)));
              
              //console.log("Years:", years);
            dispatch({
                type: "Search_Sucess",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "Search_Request"
    	});
	
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      	.then(response => response.json())
      	.then(jsonResponse => {
          const movies = jsonResponse.Search || [];
          const years = movies.map(movie => movie.Year);
          setYearsDropdown([...new Set(years)]);
          
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "Search_Sucess",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "Search_Failure",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    const { movies, errorMessage, loading } = state;
    const sortedMovies = [...movies].sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

    return (
    <div className="App">
      <Header name="Charan" />
      <Search search={search} />
      <select className="year-dropdown">
        {yearsDropdown.map((year, index) => (
          <option key={index} value={year} >
            {year}
          </option>
        ))}
      </select>
      <button className="add-movie-button" onClick={() => { setShowAddMoviePopup(true); 
        setYearsDropdown(prevYears => { const movieYears = state.movies.map(movie => movie.Year);
          return [...new Set(movieYears)].sort((a,b) => parseInt(a) - parseInt(b));
        });
        }}>Add Movie
      </button>
      <Addmovie
        showPopup={showAddMoviePopup}
        onClose={() => setShowAddMoviePopup(false)}
        onAddMovie={handleAddMovie}
      />
      
      <p className="App-intro">Sharing a few of our favourite movies</p>
      
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : ( 
          sortedMovies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} onClose={() => dispatch({ type: "Remove_Movie", payload: movie.imdbID })} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;