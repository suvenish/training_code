import React, { useState } from 'react';
import './login-signup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Login"); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registeredUser = {
        email: "user@example.com",
        password: "password123"
    };
    const isUserRegistered = email === registeredUser.email && password === registeredUser.password;
    const handleLogin = () => {
        if (isUserRegistered) {
            console.log("Logging in...");
           
        } else {
            alert("User not registered. Please sign up.");
            setAction("Sign Up"); 
        }
    };

    const handleSignUp = () => {
        console.log("Signing up...");
        
        alert("Sign-up successful! Please log in.");
        setAction("Login"); 
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt="User Icon" />
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                )}
                
                <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)}  />
                </div>
                
                <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input type="password"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            {action === "Login" && (
                <div className="forgot-password">
                    Forgot Password? <span>Click Here!</span>
                </div>
            )}
            
            <div className="submit-container">
                {action === "Login" ? (
                   <div className="submit" onClick={handleLogin}>Login</div>) : (
                   <div className="submit" onClick={handleSignUp}>  Sign Up</div>
                )}
                
               
                <div  className="submit gray" onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}  >
                    {action === "Login" ? "Sign Up" : "Login"}
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
