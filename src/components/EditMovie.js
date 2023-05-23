import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editMovieAsync } from '../features/allMovies/allMoviesSlice';
import { fetchSingleMovieAsync, selectSingleMovie } from '../features/singleMovieSlice';

const EditMovie = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector(selectSingleMovie);

  // Define an array of allowed genres
  const allowedGenres = [
    'Action/Adventure',
    'Biography/Historical',
    'Comedy',
    'Documentary',
    'Drama',
    'Family/Animated',
    'Fantasy',
    'Horror/Thriller',
    'Romance',
    'Science Fiction',
    'Western'
  ];

  // Set local state variables for each part of the form
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.01);
  const [inventory, setInventory] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  // Define a function for submitting that takes in the event object as a parameter
  const onSubmit = (e) => {
    // Prevent the submit from loading a new page
    e.preventDefault();

    // Verify that all required fields are filled out
    if (!title || !genre || !year || !description || !price) {
      alert('All required fields must be completed: Title, Genre, Year, Description, Price');
      return;
    }

    // Verify that the genre entered matches a genre in the database
    if (!allowedGenres.includes(genre)) {
      alert('The genre entered does not match a genre in the database - please enter a valid genre');
      return;
    }

    // Verify that the year entered is between 1888 and the current year
    if (year < 1888 || year > new Date().getFullYear()) {
      alert('The year must be an integer value between 1888 and the current year - please enter a valid year');
      return;
    }

    // Verify that the price entered is a plain number with no more than two decimal place values
    if (!Number.isInteger(price * 100)) {
      alert('Please enter the price as a plain number (without symbols) and no more than two decimal place values');
      return;
    }

    // Verify that the URL entered is valid
    try {
      new URL(imageUrl);
    } catch (e) {
      alert('The URL entered is invalid; please enter a valid URL for the movie');
      return;
    }

    // Create a new object from input fields (stored from the form as state variables)
    const updatedMovie = { id, title, genre, year, description, price, inventory, imageUrl };
    
    // Dispatch an action to update the movie in the store
    dispatch(editMovieAsync(updatedMovie));

    // Reset the form
    setTitle('');
    setGenre('');
    setYear('');
    setDescription('');
    setPrice(0.01);
    setInventory(0);
    setImageUrl('');
  };

  return (
	<form className='edit-form' onSubmit={onSubmit}>
	<div className='form-control'>
	  <label>
		<span style={{ fontWeight: 'bold' }}>Current Movie Name:</span>
		<small>{movie.name}</small>
	  </label>
	  <input
		type='text'
		placeholder='**REQUIRED**'
		value={title}
		onChange={(e) => setTitle(e.target.value)}
	  />
	</div>
	<div className='form-control'>
	  <label>
		<span style={{ fontWeight: 'bold' }}>Current Movie Genre:</span>
		<small>{movie.genre}</small>
	  </label>
	  {/* This needs to be a drop-down selection menu */}
	  <input
		type='text'
		placeholder='**REQUIRED**'
		value={genre}
		onChange={(e) => setGenre(e.target.value)}
	  />
	</div>
	<div className='form-control'>
	  <label>
		<span style={{ fontWeight: 'bold' }}>Current Movie Year:</span>
		<small>{movie.year}</small>
	  </label>
	  <input
		type='text'
		placeholder='**REQUIRED**'
		value={year}
		onChange={(e) => setYear(e.target.value)}
	  />
	</div>
	<div className='form-control'>
	  <label>
		<span style={{ fontWeight: 'bold' }}>Current Movie Description:</span>
		<small>{movie.description}</small>
	  </label>
	  <input
		type='text'
		placeholder='(optional)'
		value={description}
		onChange={(e) => setDescription(e.target.value)}
	  />
	</div>
	<div className='form-control'>
	  <label>
		<span style={{ fontWeight: 'bold' }}>Current Movie Price:</span>
		<small>{movie.price}</small>
	  </label>
	  <input
		type='text'
		placeholder='**REQUIRED**'
		value={price}
		onChange={(e) => setPrice(e.target.value)}
	  />
	</div>
	<div className='form-control'>
	  <label>
		<span style={{ fontWeight: 'bold' }}>Current Movie Inventory:</span>
		<small>{movie.inventory}</small>
	  </label>
	  <input
		type='text'
		placeholder='(optional)'
		value={inventory}
		onChange={(e) => setInventory(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>
          <span style={{ fontWeight: 'bold' }}>Current Movie Image URL:</span>
          <small>{movie.imageUrl}</small>
        </label>
        <input
          type='text'
          placeholder='(optional)'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      {/* Submit button */}
      <input type='submit' value='Save' />
    </form>
  );
};

export default EditMovie;
