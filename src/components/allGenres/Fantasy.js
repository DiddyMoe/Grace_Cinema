import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies } from "../../features/allMovies/allMoviesSlice";
import RightSideNav from "../RightSideNav";
import { addToCart } from "../../features/cartSlice";

const Fantasy = () => {
  // Get the movies from the Redux store
  const fantasy = useSelector(selectMovies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter the movies by genre
  const filteredFantasyMovies = fantasy.filter(
    (movie) => movie.genre === "Fantasy"
  );

  // Handle adding a movie to the cart
  const handleAddToCart = (movie) => {
    dispatch(addToCart(movie));
    navigate("/cart");
  };

  return (
    <section className="container">
      <h1 className="genre">Fantasy</h1>
      {filteredFantasyMovies.map((movie) => (
        <div className="card" key={movie.id}>
          <div className="card-image">
            <Link to={`/movies/${movie.id}`}>
              <img className="movieImage" src={movie.imageUrl} alt="" />
              <h2 className="movieTitle">{movie.title}</h2>
              <h2 className="moviePrice">
                <small>${movie.price}</small>
              </h2>
            </Link>
            <button onClick={() => handleAddToCart(movie)}>Add To Cart</button>
          </div>
        </div>
      ))}
      <RightSideNav />
    </section>
  );
};

export default Fantasy;
