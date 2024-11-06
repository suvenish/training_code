import React, { useState } from 'react';
import '../Login/Login-page.css'; // Adjust the path if needed
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Register = () => {
    const [action, setAction] = useState('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const registerLink = () => {
        setAction('register');
        setError(''); // Clear error message when switching views
    };

    const loginLink = () => {
        setAction('login');
        setError(''); // Clear error message when switching views
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
                // Handle successful login (e.g., store token, redirect, etc.)
            } else {
                alert(data.message || 'Invalid username or password'); // Show alert for invalid login
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.'); // Alert on error
            setError('An error occurred. Please try again.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Registration successful! You can now log in.');
                setAction('login'); // Switch to login view after successful registration
            } else {
                alert(data.message || 'Registration failed.'); // Show alert for registration failure
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.'); // Alert on error
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
            <div className={`form-box login ${action === 'login' ? 'show' : 'hide'}`}>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="input-box">
                        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' value={password}  onChange={(e) => setPassword(e.target.value)} required/>
                        <FaLock className="icon" />
                    </div>
                    <div className="forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <span><p>Forgot password?</p></span>
                    </div>
                    <button className="gh" type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <button className='btn' onClick={registerLink}>Register</button></p>
                    </div>
                </form>
            </div>
            <div className={`form-box register ${action === 'register' ? 'show' : 'hide'}`}>
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="input-box">
                        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}  required/>
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input  type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <FaLock className="icon" />
                    </div>
                    <div className="forgot">
                        <label><input type="checkbox" />I agree to the terms & conditions</label>
                    </div>
                    <button className="gh" type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <button className='btn' onClick={loginLink}>Login</button></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
