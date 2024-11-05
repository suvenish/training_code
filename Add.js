// Add.js
import React, { useState } from 'react';

function Add({ onAddData, onClose }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    role: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((currInfo) => ({
      ...currInfo,
      [name]: value
    }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!userInfo.name) {
      validationErrors.name = "Name is required";
    }

    if (!userInfo.age || userInfo.age < 18 || userInfo.age > 65) {
      validationErrors.age = "Age must be between 18 and 65";
    }

    if (!userInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!userInfo.phone || userInfo.phone.length !== 10) {
      validationErrors.phone = "Phone number must be 10 digits";
    }

    if (!userInfo.role) {
      validationErrors.role = "Role is required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleAddClick = () => {
    if (validateForm()) {
      onAddData(userInfo); // Pass data to the parent component
      setUserInfo({ name: "", age: "", email: "", phone: "", role: "" }); // Clear form fields
      setErrors({}); // Clear errors
    }
  };

  return (
    <div className='form'>
      <h2>Add New Employee</h2>
      <input
        type='text'
        placeholder='Enter your name'
        value={userInfo.name}
        name='name'
        onChange={handleChange}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        type='number'
        placeholder='Enter your age'
        value={userInfo.age}
        name='age'
        onChange={handleChange}
      />
      {errors.age && <p className="error">{errors.age}</p>}

      <input
        type='email'
        placeholder='Enter your email'
        value={userInfo.email}
        name='email'
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        type='number'
        placeholder='Enter your phone'
        value={userInfo.phone}
        name='phone'
        onChange={handleChange}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <input
        type='text'
        placeholder='Enter your role'
        value={userInfo.role}
        name='role'
        onChange={handleChange}
      />
      {errors.role && <p className="error">{errors.role}</p>}

      <button onClick={handleAddClick}>Add</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Add;




