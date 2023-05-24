import React from "react";
import { useSelector } from "react-redux";
import { selectPersonnel } from '../features/allPersonnelSlice';

// Personnel component displays information about movie personnel (e.g. actors, directors)
const Personnel = () => {
  // Get personnel data from Redux store
  const persons = useSelector(selectPersonnel);

  // Render personnel information
  return (
    <div>
      {persons.map((person) => (
        <div key={person.fName}>
          <h4>Name: {person.fName} {person.lName}</h4>
          <h4>Details: {person.details}</h4>
          <img src={person.imageUrl} alt='' />
        </div>
      ))}
    </div>
  );
};

export default Personnel;
