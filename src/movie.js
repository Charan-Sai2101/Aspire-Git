import React, {useState} from "react";
import "./App.css";

const DEFAULT_PLACEHOLDER_IMAGE = "https://picsum.photos/seed/picsum/200/300";

const Movie = ({ movie, onClose }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="card" onMouseEnter={() => setShowCloseButton(true)}
    onMouseLeave={() => setShowCloseButton(false)}>
      {showCloseButton && (
        <button class="close-button" onClick={onClose} >
          X
        </button>
      )}
      <img className="card-img-top" src={poster} alt={`The movie titled: ${movie.Title}`} />
      <div className="card-body">
       <h5 className="card-title">{movie.Title}</h5>
       <p className="card-text">({movie.Year})</p>
      </div>
    </div>

    //---------------------
    // <div className="movie">
    //   <img src={poster} alt={`The movie titled: ${movie.Title}`} width="200"/>
    //   <div className="container" width='200'>
    //     <h4><b>{movie.Title}</b></h4>
    //     <p>({movie.Year})</p>
    //   </div>
    // </div>
    //---------------------
    //<div className="movie">
    //  <h2>{movie.Title}</h2>
    //  <div>
    //    <img
    //      width="200"
    //      alt={`The movie titled: ${movie.Title}`}
    //      src={poster}
    //    />
    //  </div>
    //  <p>({movie.Year})</p>
    //</div>
  );
};

export default Movie;