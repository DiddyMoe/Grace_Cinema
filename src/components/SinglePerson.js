import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePersonAsync, selectSinglePerson } from "../features/singlePersonSlice";
import EditPerson from "./EditPerson";

// SinglePerson component for displaying a single person
const SinglePerson = () => {
 // Hook to dispatch actions to the store
 const dispatch = useDispatch()
 // Hook to get the id parameter from the URL
 const { id } = useParams()
 // Hook to get the single person data from the store
 const single = useSelector(selectSinglePerson);
 // State variable for showing/hiding the edit menu
 const [showMenu, SetShowMenu] = useState(false)

 // Fetch single person data when component mounts
 useEffect(() => {
 dispatch(fetchSinglePersonAsync(id))
 }, [dispatch])

 // Function to toggle the edit menu
 const toggleMenu = () => SetShowMenu(!showMenu);

 return (
 <div>
 <div className="edit-menu">
 <button onClick={() => toggleMenu()}>Update Person Information</button>
 {showMenu && <EditPerson id={id} />}
 </div>
 <img src={`${single.imageUrl}`} />
 <h1>{single.name}</h1>
 <h2>{single.age}</h2>
 <h3>Occupation: {single.occupation}</h3>
 <p>Bio: {single.bio}</p>
 </div>
 );
};

export default SinglePerson;
