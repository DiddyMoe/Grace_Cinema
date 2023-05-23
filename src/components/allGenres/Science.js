import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMovies } from "../../features/allMovies/allMoviesSlice";
import RightSideNav from "../RightSideNav";

const Science = () => {
  // Get the movies from the Redux store
  const science = useSelector(selectMovies);

  // Filter the movies by genre
  const filteredScienceMovies = science.filter(
    (movie) => movie.genre === "Science/Fiction"
  );

  return (
    <section className="container">
      <h1 className="genre">Science/Fiction</h1>
      {filteredScienceMovies.length === 0 ? (
        <p>No Science/Fiction Movies yet</p>
      ) : (
        filteredScienceMovies.map((movie) => (
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

export default Science;
