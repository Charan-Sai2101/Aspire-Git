
export const searchRequest = () => ({
    type: "Search_Request"
  });
  
  export const searchSuccess = movies => ({
    type: "Search_Success",
    payload: movies
  });
  
  export const searchFailure = error => ({
    type: "Search_Failure",
    payload: error
  });
  
  export const removeMovie = imdbID => ({
    type: "Remove_Movie",
    payload: imdbID
  });
  
  export const addMovie = (title, year, imdbID, poster) => ({
    type: "Add_Movie",
    payload: { Title: title, Year: year, imdbID, Poster: poster }
  });