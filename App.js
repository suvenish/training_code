import React, { useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

// Predefined users data
const defaultUsers = [
  { id: uuid(), name: "John Doe", age: "25", email: "john@example.com", phone: "1234567890", role: "Developer" },
  { id: uuid(), name: "Jane Smith", age: "30", email: "jane@example.com", phone: "0987654321", role: "Manager" },
  { id: uuid(), name: "Alice Brown", age: "28", email: "alice@example.com", phone: "1122334455", role: "Designer" },
  { id: uuid(), name: "Bob White", age: "35", email: "bob@example.com", phone: "6677889900", role: "Analyst" },
  { id: uuid(), name: "Charlie Green", age: "30", email: "charlie@example.com", phone: "2233445566", role: "Engineer" }
];

function App() {
  const [users, setUsers] = useState(defaultUsers);
  const [buttonState, setButtonState] = useState("add");
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [errors, setErrors] = useState({});

  const [userInfo, setUserInfo] = useState({
    id: uuid(),
    name: "",
    age: "",
    email: "",
    phone: "",
    role: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((currInfo) => ({
      ...currInfo,
      [name]: value
    }));
    
    // Real-time validation for age
    if (name === "age") {
      const ageValue = parseInt(value, 10);
      setErrors((currErrors) => ({
        ...currErrors,
        age: ageValue < 18 || ageValue > 65 ? "Age must be between 18 and 65" : ""
      }));
    } else {
      setErrors((currErrors) => ({
        ...currErrors,
        [name]: value ? "" : `${name} is required`
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    
    // Validate each field
    Object.keys(userInfo).forEach((key) => {
      if (!userInfo[key]) formErrors[key] = `${key} is required`;
    });

    // Specific validation for age range
    const ageValue = parseInt(userInfo.age, 10);
    if (ageValue < 18 || ageValue > 65) {
      formErrors.age = "Age must be between 18 and 65";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const addData = () => {
    if (validateForm()) {
      setUsers((currUsers) => [...currUsers, { ...userInfo, id: uuid() }]);
      setUserInfo({
        id: uuid(),
        name: "",
        age: "",
        email: "",
        phone: "",
        role: ""
      });
      setShowForm(false);
    }
  };

  const deleteData = (id) => {
    setUsers((currUsers) => currUsers.filter((user) => user.id !== id));
  };

  const startEditing = (user) => {
    setUserInfo(user);
    setButtonState("edit");
    setShowForm(true);
  };

  const cancelEditing = () => {
    setUserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
      role: ""
    });
    setButtonState("add");
    setShowForm(false);
  };

  const updateData = () => {
    if (validateForm()) {
      setUsers((currUsers) => currUsers.map((user) => (user.id === userInfo.id ? userInfo : user)));
      cancelEditing();
    }
  };

  const viewData = (user) => {
    setViewUser(user);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setViewUser(null);
  };

  return (
    <div className='container'>
      <h1>Employee Data</h1>
      <button className='addbtn' onClick={() => setShowForm(true)}>Add</button>
      
      {showForm && (
        <div className='form'>
          <input type='text' placeholder='Enter your name' value={userInfo.name} name='name' onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
          <br />
          <input type='number' placeholder='Enter your age' value={userInfo.age} name='age' onChange={handleChange} />
          {errors.age && <p className="error">{errors.age}</p>}
          <br />
          <input type='email' placeholder='Enter your email' value={userInfo.email} name='email' onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
          <br />
          <input type='number' placeholder='Enter your phone' value={userInfo.phone} name='phone' onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
          <br />
          <input type='text' placeholder='Enter your role' value={userInfo.role} name='role' onChange={handleChange} />
          {errors.role && <p className="error">{errors.role}</p>}
          <br />
          {buttonState === "add" ? (
            <button onClick={addData}>Add</button>
          ) : (
            <div className='buttonContainer'>
              <button onClick={updateData}>Update</button>
              <button onClick={cancelEditing}>Cancel</button>
            </div>
          )}
        </div>
      )}

      <div className='dataTable'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => startEditing(user)}>Edit</button>
                  <button onClick={() => deleteData(user.id)}>Delete</button>
                  <button className='btnview' onClick={() => viewData(user)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for viewing user details */}
      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {viewUser.name}</p>
            <p><strong>Age:</strong> {viewUser.age}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Phone:</strong> {viewUser.phone}</p>
            <p><strong>Role:</strong> {viewUser.role}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

