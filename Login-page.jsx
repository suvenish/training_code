import React, { useState } from 'react';
import '../Login/Register.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Register = () => {
    const [action, setAction] = useState('login');

    const registerLink = () => {
        setAction('register');
    };

    const loginLink = () => {
        setAction('login');
    };

    return (
        <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
            <div className={`form-box login ${action === 'login' ? 'show' : 'hide'}`}>
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required/>
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
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
                <form action="">
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
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
