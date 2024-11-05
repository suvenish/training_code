import React, { useState } from 'react';
import '../Delete/delete-page.css';
function EmployeeList() {
    // Initial employee data
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Alice', age: 28, role: 'Developer' },
        { id: 2, name: 'Bob', age: 35, role: 'Designer' },
        { id: 3, name: 'Charlie', age: 40, role: 'Manager' },
        { id: 4, name: 'Alia', age: 28, role: 'Developer' },
        { id: 5, name: 'Saranya', age: 35, role: 'Designer' },
        { id: 6, name: 'John', age: 40, role: 'Manager' },
       
    ]);

    // Function to handle deletion
    const handleDelete = (id) => {
        // Filter out the employee with the matching id
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    return (
        <div className='ab'>
            <h1>Employee Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.age}</td>
                            <td>{employee.role}</td>
                            <td>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
