// Dashboard Page 
// Admin can view a overall summary of viewdata, admin management and reminder list page

// Import library
import React, { useState, useEffect } from 'react';

// Import CSS
import styles from '../stylesheets/dashboard.module.css';

// Import Assets
import Plant from '../Assets/Image/plant1.png'; 

// Import Token
const token = localStorage.getItem('token');

const Dashboard = () =>{

    const [FirstName, setFirstName] = useState(''); 
    const [LastName, setLastName] = useState(''); 

    useEffect(() => {
        // get URL Token
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            console.log('Token:', token);
        }
    }, []);

    // get profile
    useEffect(() => {
        // fetch to get the user's information
        fetch('http://localhost:3001/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        })
       
        .then(response => response.json())
        .then(data => {
   
            setFirstName(data.firstName);
            setLastName(data.lastName);

        })
        .catch(error => console.error('Error:', error));
    }, []); 

    // Variable
    const firstName = FirstName;
    const lastName = LastName;

    return (
        <main>
            <div className={styles.dashboard}>

                {/* Heading */}
                <h1 className={styles.page_heading}>Dashboard</h1>

                {/* Container */}
                <div className={styles.container}>

                    {/* Top box */}
                    <div className={styles.name_box}>
                        <img id={styles.plant_one} src={Plant} alt="Plant 1" />

                        {/* ----------------------Replace admin's name with Apple Banana */}
                        <div id={styles.hello_info}>Hello, {firstName} {lastName}</div>
                    </div>

                    {/* Middle container */}
                    <div id={styles.middle_container}>

                        {/* Summary Box */}
                        <div id={styles.summary_box}>
                            <h2>Data Review Summary</h2>

                            {/* -------------------------------Add summary graph here */}
                            <div className={styles.middle_box}>
                            </div>
                        </div>

                        {/* Reminder Box */}
                        <div id={styles.reminder_box}>
                            <h2>Reminder List</h2>

                            {/* -------------------------------Add reminder list here */}
                            <div className={styles.middle_box}>
                            </div>
                        </div>
                    </div>

                    {/* Bottom container */}
                    <div id={styles.bottom_container}>
                        <h2>Admin Management</h2>

                        {/* -------------------------------Add admin management reminder here */}
                        <div id={styles.admin_manage_box}>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}
export default Dashboard;