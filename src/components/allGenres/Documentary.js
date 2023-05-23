import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { selectMovies } from "../../features/allMovies/allMoviesSlice";
import RightSideNav from "../RightSideNav";
import { addToCart } from "../../features/cartSlice";

const Documentary = () => {
  // Get the movies from the Redux store
  const documentary = useSelector(selectMovies)
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch()
  // Get the navigate function from React Router
  const navigate = useNavigate();

  // Function to handle adding a movie to the cart
  const handleAddToCart = (filter) => {
    // Dispatch an action to add the movie to the cart
    dispatch(addToCart(filter));
    // Navigate to the cart page
    navigate("/cart");
  };

  return (
    <section className="container">
      <h1 className="genre">Documentary</h1>
      {documentary.map((filter) => {
        if (filter.genre === 'Documentary') {
          return (
            <div className="card">
              <div className="card-image">
                <Link to={`/movies/${filter.id}`}>
                  <img className="movieImage" src={filter.imageUrl} alt="" />
                  <h2 className="movieTitle">{filter.title}</h2>
                  <h2 className="moviePrice">
                    <small>${filter.price}</small>
                  </h2>
                </Link>
                <button onClick={() => handleAddToCart(filter)}>
                  Add To Cart
                </button>
              </div>
            </div>
          )
        }
      })}
      <RightSideNav />
    </section>
  );
};

export default Documentary;
