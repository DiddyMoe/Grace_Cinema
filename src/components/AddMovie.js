import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovieAsync } from "../features/allMovies/allMoviesSlice";

const AddMovie = () => {
  const dispatch = useDispatch();
  //⬇️DON'T UPDATE THE `allowedGenres` ARRAY WITHOUT ALSO CHANGING THE INPUT STRING ON ENUM ON ./server/db/models/Movie.js &AND& THE `allowedGenres` ARRAY IN ./src/components/EditMovie.js❗️
  const allowedGenres = [
    "Action/Adventure",
    "Biography/Historical",
    "Comedy",
    "Documentary",
    "Drama",
    "Family/Animated",
    "Fantasy",
    "Horror/Thriller",
    "Romance",
    "Science Fiction",
    "Western",
  ];
  //⬆️DON'T UPDATE THE `allowedGenres` ARRAY WITHOUT ALSO CHANGING THE INPUT STRING ON ENUM ON ./server/db/models/Movie.js &AND& THE `allowedGenres` ARRAY IN ./src/components/EditMovie.js❗️

  // Set local state variables for each part of the form
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.01);
  const [inventory, setInventory] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  // Define a function for submitting that takes in the event object as a parameter; this function will...
  const onSubmit = (e) => {
    // ...prevent the submit from loading a new page
    e.preventDefault();
    // ...verify that all *required* fields are filled out
    if (!title || !genre || !year || !description || !price || !imageUrl) {
      alert(
        "All required fields must be completed: Title, Genre, Year, Description, Price"
      );
      return;
    }
    if (!allowedGenres.includes(genre)) {
      alert(
        "The genre entered does not match a genre in the database - please enter a valid genre"
      );
      return;
    }
    if (year < 1888) {
      alert(
        "The year must be an integer value between 1888 and the current year - please enter a valid year"
      );
      return;
    }
    if (!Number.isInteger(price * 100)) {
      alert(
        "Please enter the price as a plain number (without symbols) and no more than two decimal place values"
      );
      return;
    }
    try {
      new URL(imageUrl);
    } catch (error) {
      alert("The URL entered is invalid; please enter a valid URL for the movie");
      return;
    }

    // ...create a new object from input fields (stored from the form as state variables)
    const newMovie = {
      title,
      genre,
      year,
      description,
      price,
      inventory,
      imageUrl,
    };
    dispatch(addMovieAsync(newMovie));
    // ...and reset the form
    setTitle("");
    setGenre("");
    setYear("");
    setDescription("");
    setPrice(0.01);
    setInventory(0);
    setImageUrl("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Title</label>
        <input
          type="text"
          placeholder="**REQUIRED**"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Genre</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="" disabled>
            **REQUIRED**
          </option>
          {allowedGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label>Year</label>
        <input
          type="number"
          min="1888"
          max={new Date().getFullYear()}
          placeholder="**REQUIRED**"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Description</label>
        <input
          type="text"
          placeholder="**REQUIRED**"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="**REQUIRED**"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Inventory</label>
        <input
          type="number"
          min="0"
          placeholder="(optional)"
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Poster Image URL</label>
        <input
          type="url"
          placeholder="**REQUIRED**"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      {/*...and a submit button down at the very bottom🔘 */}
      <input type="submit" value="Save" />
    </form>
  );
};

export default AddMovie;
