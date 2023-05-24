import React, { useState } from "react";
import RightSideNav from "./RightSideNav";
import { Link, useNavigate } from "react-router-dom";
import "./movies.css";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies } from "../features/allMovies/allMoviesSlice";
import Pagination from "./Pagination";
import { addToCart } from "../features/cartSlice";
import { deleteMovieAsync } from '../features/allMovies/allMoviesSlice';

const Movies = () => {
  // Get movies data from Redux store
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to delete a movie by its ID
  const deleteMovieById = (id) => {
    dispatch(deleteMovieAsync(id));
  }

  // State for current page and number of posts per page
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);

  // Calculate first and last post index for pagination
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = movies.slice(firstPostIndex, lastPostIndex);

  // Function to handle adding a movie to the cart
  const handleAddToCart = (movie) => {
    dispatch(addToCart(movie));
    navigate("/cart");
  };

  return (
    <div>
      <section className="container">
        {currentPost.map((movie) => {
          return (
            <div className="card" key={movie.id}>
              <div className="card-image">
                <Link to={`/movies/${movie.id}`}>
                  <img className="movieImage" src={movie.imageUrl} alt="" />
                  <h2 className="movieTitle">{movie.title}</h2>
                  <h2 className="moviePrice">
                    <small>${movie.price}</small>
                  </h2>
                </Link>
                <div>
                  <button className='user-add' onClick={() => handleAddToCart(movie)}>
                    Add To Cart
                  </button>
                  <button className='admin-edit' onClick={() => deleteMovieById(movie.id)}>
                    Edit Movie
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <Pagination
        totalPosts={movies.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <RightSideNav />
    </div>
  );
};

export default Movies;
