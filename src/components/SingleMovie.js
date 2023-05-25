import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleMovieAsync, selectSingleMovie } from "../features/singleMovieSlice";
import EditMovie from "./EditMovie";

// SingleMovie component for displaying a single movie
const SingleMovie = () => {
  // Hook to dispatch actions to the store
  const dispatch = useDispatch()
  // Hook to get the id parameter from the URL
  const { id } = useParams()
  // Hook to get the single movie data from the store
  const single = useSelector(selectSingleMovie);
  // State variable for showing/hiding the edit menu
  const [showMenu, SetShowMenu] = useState(false)

  // Fetch single movie data when component mounts
  useEffect(() => {
    dispatch(fetchSingleMovieAsync(id))
  }, [dispatch])

  // Function to toggle the edit menu
  const toggleMenu = () => SetShowMenu(!showMenu);

  return (
    <div>
      <div className="edit-menu">
        <button onClick={() => toggleMenu()}>Update Movie Information</button>
        {showMenu && <EditMovie id={id} />}
      </div>
      <img src={`${single.imageUrl}`} />
      <h1>{single.title}</h1>
      <h2>{single.year}</h2>
      <h3>Genre: {single.genre}</h3>
      <h4>Price: {single.price}</h4>
      <p>Description: {single.description}</p>
    </div>
  );
};

export default SingleMovie;
