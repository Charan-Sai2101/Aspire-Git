import React, { useState } from "react";

const AddMoviePopup = ({ showPopup, onClose, onAddMovie }) => {
  const [newMovieData, setNewMovieData] = useState({
    title: "",
    year: ""
  });
  
  const handleAddMovieSubmit = (e) => {
    e.preventDefault();
    onAddMovie(newMovieData.title, newMovieData.year);
    onClose();
    setNewMovieData({
      title: "",
      year: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovieData({
      ...newMovieData,
      [name]: value
    });
  };

  

  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <form onSubmit={handleAddMovieSubmit}>
              <label>
                Movie Name:
                <input
                  type="text"
                  name="title"
                  value={newMovieData.title}
                  onChange={handleInputChange}
                />
              </label>
              <br></br>
              <label>
                Year:
                <input
                  type="text"
                  name="year"
                  value={newMovieData.year}
                  onChange={handleInputChange}
                />
              </label>
              <br></br>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMoviePopup;