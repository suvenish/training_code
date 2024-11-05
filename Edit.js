// Edit.js
import React, { useState, useEffect } from 'react';

function Edit({ user, onUpdateData, onClose }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((currInfo) => ({
      ...currInfo,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    onUpdateData(userInfo); // Pass the updated data to the parent component
    onClose(); // Close the edit page
  };

  return (
    <div className='form'>
      <h2>Edit Employee Details</h2>
      <input
        type='text'
        placeholder='Enter your name'
        value={userInfo.name}
        name='name'
        onChange={handleChange}
      />
      <input
        type='number'
        placeholder='Enter your age'
        value={userInfo.age}
        name='age'
        onChange={handleChange}
      />
      <input
        type='email'
        placeholder='Enter your email'
        value={userInfo.email}
        name='email'
        onChange={handleChange}
      />
      <input
        type='number'
        placeholder='Enter your phone'
        value={userInfo.phone}
        name='phone'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Enter your role'
        value={userInfo.role}
        name='role'
        onChange={handleChange}
      />
      <button onClick={handleUpdateClick}>Update</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Edit;
