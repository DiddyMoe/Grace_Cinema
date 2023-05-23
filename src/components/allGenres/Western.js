import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMovies } from "../../features/allMovies/allMoviesSlice";
import RightSideNav from "../RightSideNav";

const Western = () => {
  // Get the movies from the Redux store
  const western = useSelector(selectMovies);

  // Filter the movies by genre
  const filteredWesternMovies = western.filter(
    (movie) => movie.genre === "Western"
  );

  return (
    <section className="container">
      <h1 className="genre">Western</h1>
      {filteredWesternMovies.length === 0 ? (
        <p>No Western Movies yet</p>
      ) : (
        filteredWesternMovies.map((movie) => (
          <div className="card" key={movie.id}>
            <div className="card-image">
              <Link to={`/movies/${movie.id}`}>
                <img className="movieImage" src={movie.imageUrl} alt="" />
                <h2 className="movieTitle">{movie.title}</h2>
                <h2 className="moviePrice">
                  <small>${movie.price}</small>
                </h2>
              </Link>
            </div>
          </div>
        ))
      )}
      <RightSideNav />
    </section>
  );
};

export default Western;
