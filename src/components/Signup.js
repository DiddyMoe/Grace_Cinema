import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserAsync } from '../features/users'
import { useNavigate } from 'react-router-dom'

// Signup component for creating a new user
const Signup = () => {
  // Hook to dispatch actions to the store
  const dispatch = useDispatch();
  // Hook to navigate between routes
  const navigate = useNavigate()

  // State variables for form inputs
  const [lName, setLName] = useState('');
  const [fName, setFName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const onSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Verify that all required fields are filled out
    if (!fName || !lName || !email || !password) {
      alert('All required fields must be completed: first name, last name, email, and password');
      return;
    }

    // Create a new user object from input fields
    const newUser = { fName, lName, email, password, type: 'customer' }
    // Dispatch action to add user to the store
    dispatch(addUserAsync(newUser))
    // Navigate to login page
    navigate("/login");
  }

  return (
    <form className='add-user-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>First Name: </label>
        <input type='text' placeholder='**REQUIRED**' value={fName} onChange={(e) => setFName(e.target.value)} />
      </div>
      <div className='form-user-control'>
        <label>Last Name:</label>
        <input type='text' placeholder='**REQUIRED**' value={lName} onChange={(e) => setLName(e.target.value)} />
      </div>
      <div className='form-user-control'>
        <label>Email: </label>
        <input type='text' placeholder='**REQUIRED**' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='form-user-control'>
        <label>Password:</label>
        <input type='text' placeholder='**REQUIRED**' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {/* Submit button */}
      <input type='submit' value='Save' />
    </form>
  )
}

export default Signup;
