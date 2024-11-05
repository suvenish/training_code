// // App.js
// import React, { useState } from 'react';
// import './App.css';
// import { v4 as uuid } from 'uuid';
// import Add from './components/Add'; // Import the Add component

// const defaultUsers = [
//   { id: uuid(), name: "John Doe", age: "25", email: "john@example.com", phone: "1234567890", role: "Developer" },
//   { id: uuid(), name: "Jane Smith", age: "30", email: "jane@example.com", phone: "0987654321", role: "Manager" },
//   { id: uuid(), name: "Alice Brown", age: "28", email: "alice@example.com", phone: "1122334455", role: "Designer" },
//   { id: uuid(), name: "Bob White", age: "35", email: "bob@example.com", phone: "6677889900", role: "Analyst" },
//   { id: uuid(), name: "Charlie Green", age: "30", email: "charlie@example.com", phone: "2233445566", role: "Engineer" }
// ];

// function App() {
//   const [users, setUsers] = useState(defaultUsers);
//   const [isFormPage, setIsFormPage] = useState(false);

//   const addData = (userInfo) => {
//     setUsers((currUsers) => [...currUsers, { ...userInfo, id: uuid() }]);
//     setIsFormPage(false); // Return to the main page
//   };

//   const handleAddClick = () => {
//     setIsFormPage(true); // Switch to the form page
//   };

//   const handleFormClose = () => {
//     setIsFormPage(false); // Return to the main page
//   };

//   return (
//     <div className='container'>
//       {isFormPage ? (
//         <Add onAddData={addData} onClose={handleFormClose} /> // Render the Add component with props
//       ) : (
//         <>
//           <h1>Employee Data</h1>
//           <button className='addbtn' onClick={handleAddClick}>Add</button>
//           <div className='dataTable'>
//             <table className='table'>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Age</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Role</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.name}</td>
//                     <td>{user.age}</td>
//                     <td>{user.email}</td>
//                     <td>{user.phone}</td>
//                     <td>{user.role}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';
import Add from './components/Add';
import Edit from './components/Edit';
import View from './components/View';
import Delete from './components/Delete';

const defaultUsers = [
  { id: uuid(), name: "John Doe", age: "25", email: "john@example.com", phone: "1234567890", role: "Developer" },
  { id: uuid(), name: "Jane Smith", age: "30", email: "jane@example.com", phone: "0987654321", role: "Manager" },
  { id: uuid(), name: "Alice Brown", age: "28", email: "alice@example.com", phone: "1122334455", role: "Designer" },
  { id: uuid(), name: "Bob White", age: "35", email: "bob@example.com", phone: "6677889900", role: "Analyst" },
  { id: uuid(), name: "Charlie Green", age: "30", email: "charlie@example.com", phone: "2233445566", role: "Engineer" }
];

function App() {
  const [users, setUsers] = useState(defaultUsers);
  const [isFormPage, setIsFormPage] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);
  const [isViewPage, setIsViewPage] = useState(false);
  const [isDeletePage, setIsDeletePage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const addData = (userInfo) => {
    setUsers((currUsers) => [...currUsers, { ...userInfo, id: uuid() }]);
    setIsFormPage(false); // Return to the main page
  };

  const handleAddClick = () => {
    setIsFormPage(true); // Switch to the form page
  };

  const handleEditClick = (user) => {
    setCurrentUser(user); // Set the current user to edit
    setIsEditPage(true); // Switch to the edit page
  };

  const handleViewClick = (user) => {
    setCurrentUser(user); // Set the current user to view
    setIsViewPage(true); // Switch to the view page
  };

  const handleDeleteClick = (user) => {
    setCurrentUser(user); // Set the current user to delete
    setIsDeletePage(true); // Switch to the delete confirmation page
  };

  const handleUpdateData = (updatedUser) => {
    setUsers((currUsers) =>
      currUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditPage(false); // Return to the main page
    setCurrentUser(null); // Clear the current user
  };

  const handleDelete = (userId) => {
    setUsers((currUsers) => currUsers.filter((user) => user.id !== userId));
    setIsDeletePage(false); // Return to the main page
    setCurrentUser(null); // Clear the current user
  };

  const handleFormClose = () => {
    setIsFormPage(false); // Return to the main page
  };

  const handleEditClose = () => {
    setIsEditPage(false); // Return to the main page
    setCurrentUser(null); // Clear the current user
  };

  const handleViewClose = () => {
    setIsViewPage(false); // Return to the main page
    setCurrentUser(null); // Clear the current user
  };

  const handleDeleteClose = () => {
    setIsDeletePage(false); // Return to the main page
    setCurrentUser(null); // Clear the current user
  };

  return (
    <div className='container'>
      {isFormPage ? (
        <Add onAddData={addData} onClose={handleFormClose} />
      ) : isEditPage ? (
        <Edit user={currentUser} onUpdateData={handleUpdateData} onClose={handleEditClose} />
      ) : isViewPage ? (
        <View user={currentUser} onClose={handleViewClose} />
      ) : isDeletePage ? (
        <Delete user={currentUser} onDelete={handleDelete} onClose={handleDeleteClose} />
      ) : (
        <>
          <h1>Employee Data</h1>
          <button className='addbtn' onClick={handleAddClick}>Add</button>
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
                      <button onClick={() => handleEditClick(user)}>Edit</button>
                      <button onClick={() => handleViewClick(user)}>View</button>
                      <button onClick={() => handleDeleteClick(user)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;



