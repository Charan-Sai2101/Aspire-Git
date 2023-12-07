import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeMovie } from "./actions/movieActions";
import "./App.css";

const Default_Image = "https://picsum.photos/seed/picsum/200/300";

const Movie = ({ movie }) => {
  const dispatch = useDispatch();

  const [showCloseButton, setShowCloseButton] = useState(false);
  const poster =
    movie.Poster === "N/A" ? Default_Image : movie.Poster;

  const handleCloseClick = () => {
    dispatch(removeMovie(movie.imdbID)); // Replace 'movie.imdbID' with your unique identifier
  };

  return (
    <div className="card" onMouseEnter={() => setShowCloseButton(true)} onMouseLeave={() => setShowCloseButton(false)}>
      {showCloseButton && (
        <button className="close-button" onClick={handleCloseClick}>
          X
        </button>
      )}
      <img className="card-img-top" src={poster} alt={`The movie titled: ${movie.Title}`} />
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">({movie.Year})</p>
      </div>
    </div>
  );
};

export default Movie;