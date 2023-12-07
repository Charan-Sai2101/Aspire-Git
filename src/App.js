import React, { useEffect, useState } from "react";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { searchRequest, searchSuccess, searchFailure, removeMovie, addMovie } from "./actions/movieActions";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import AddMoviePopup from "./Addmovie";
import { v4 as uuidv4 } from 'uuid';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const Default_Image = "https://picsum.photos/id/96/200/300";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { loading, movies, errorMessage, yearsDropdown } = state;

  const [showAddMoviePopup, setShowAddMoviePopup] = useState(false);

  useEffect(() => {
    dispatch(searchRequest());
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch(searchSuccess(jsonResponse.Search));
        } else {
          dispatch(searchFailure(jsonResponse.Error));
        }
      });
  }, [dispatch]);

  const handleAddMovie = (title, year) => {
    const random_uuid = uuidv4();
    dispatch(addMovie(title, year, random_uuid, Default_Image));
  };

  const sortedMovies = [...movies].sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

  const search = searchValue => {
    dispatch(searchRequest());
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(movies);
        if (jsonResponse.Response === "True") {
          dispatch(searchSuccess(jsonResponse.Search));
        } else {
          dispatch(searchFailure(jsonResponse.Error));
        }
      })
      .catch(error => {
        dispatch(searchFailure(error.errorMessage));

      });
  };

  return (
    <div className="App">
      <Header useName="Charan" />
      <Search search={search} />
      <select className="year-dropdown">
        {yearsDropdown.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button className="add-movie-button" onClick={() => setShowAddMoviePopup(true)}>
        Add Movie
      </button>
      <AddMoviePopup
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
        ) : movies.length>0 ? (
          sortedMovies.map((movie, index) => (
            <Movie
              key={`${index}-${movie.Title}`}
              movie={movie}
              onClose={() => dispatch(removeMovie(movie.imdbID))}
            />
          ))
        ) : (
        <div>No movies found</div>
        )}
      </div>
    </div>
  );
};

export default App;
