import React from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectMovies } from "../../features/allMovies/allMoviesSlice";
import RightSideNav from "../RightSideNav";


const Comedy = () => {

const comedy = useSelector(selectMovies)
  return (
		<div>No Comedy Movies yet
      {comedy.map((filter) => {
        if(filter.genre === 'Comedy'){
          return(
            <div>
               <Link to={`/movies/${filter.id}`}>
                    <img className="movieImage" src={filter.imageUrl} alt="" />
                    <h2 className="movieTitle">{filter.title}</h2>
                    <h2 className="moviePrice">
                      <small>${filter.price}</small>
                    </h2>
                    </Link>
            </div>
          )
        }
      })}
<RightSideNav/>
		</div>
	);
};

export default Comedy;