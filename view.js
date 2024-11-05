// components/view.js
import React from 'react';

const View = () => {  // Renamed from App to View
    const handleClick = () => {
        alert("Viewing details..."); 
    };

    const styles = {
        container: {
            height: '100vh', 
            width: '100vw', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: 'rgba(76, 175, 80, 0.5)', 
        },
        button: {
            backgroundColor: 'rgba(76, 175, 80, 1)', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            borderRadius: '5px', 
            transition: 'background-color 0.3s ease', 
        }
    };

    return (
        <div style={styles.container}>
            <h1>Hello Employees, Welcome to View!</h1>
            <button onClick={handleClick} style={styles.button}>
                View
            </button>
        </div>
    );
};

export default View; // Ensure you export as View
