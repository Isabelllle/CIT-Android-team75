// Dashboard Page 
// Admin can view a overall summary of viewdata, admin management and reminder list page

// Import library
import React, { useState, useEffect } from 'react';

// Import CSS
import styles from '../stylesheets/dashboard.module.css';

// Import Assets
import Plant from '../Assets/Image/plant1.png'; 

// Import Component
import VolunteerTable from '../components/all_volunteer_table';

// Get Token
const token = localStorage.getItem('token');

const Dashboard = () =>{
    const [FirstName, setFirstName] = useState(''); 
    const [LastName, setLastName] = useState(''); 

    if (token !== localStorage.getItem('token')) {
        window.location.reload(true);
    }

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
       
        .then(response => {
            if (!response.ok) {
                window.location.reload(true);
            }

            return response.json();
        })
        .then(data => {
   
            setFirstName(data.firstName);
            setLastName(data.lastName);

        })
        .catch(error => console.error('Error:', error));

    }, []); 

    // Variable
    const firstName = FirstName;
    const lastName = LastName;

    // Middle Box Numbers
    const [reminderNum, setReminderNum] = useState(''); 
    const [dataNum, setDataNum] = useState(''); 
    const [volunNum, setVolunNum] = useState(''); 

    // get reminder list number
    useEffect(() => {
        if (token){
            // fetch to get the user's information
            fetch('http://localhost:3001/api/getReminderList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            })
            .then(response => {
                if (!response.ok) {
                  return response.json().then(errorData => {
                    throw new Error(errorData.error);
                  });
                }
                return response.json();
            })
            .then(data => {
                const dataLength = data.length;
                setReminderNum(dataLength);
            })
            .catch(error => console.error('Error:', error));
        }
    }, []); 

    // get data number
    useEffect(() => {
        if (token){
            // fetch to get the user's information
            fetch('http://localhost:3001/api/getResponseNum', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            })
            .then(response => {
                if (!response.ok) {
                  return response.json().then(errorData => {
                    throw new Error(errorData.error);
                  });
                }
                return response.json();
            })
            .then(data => {
                const dataLength = data.length;
                setDataNum(dataLength);
                console.log('datalength',dataNum);
            })
            .catch(error => console.error('Error:', error));
        }
    }, []); 


    // get volunteer number
    useEffect(() => {
        if (token){
            // fetch to get the user's information
            fetch('http://localhost:3001/api/getVolunteer', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            })
            .then(response => {
                if (!response.ok) {
                  return response.json().then(errorData => {
                    throw new Error(errorData.error);
                  });
                }
                return response.json();
            })
            .then(data => {
                const dataLength = data.length;
                setVolunNum(dataLength);
            })
            .catch(error => console.error('Error:', error));
        }
    }, []); 

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

                        <div id={styles.hello_info}>Hello, {firstName} {lastName}</div>
                    </div>

                    {/* Middle container */}
                    <div id={styles.middle_container}>
                        <div className={styles.middle_box}>
                            <div className={styles.middle_num} id={styles.num_one}>{reminderNum}</div>
                            <div className={styles.middle_text}>Reminder List People</div>
                        </div>

                        <div className={styles.middle_box}>
                            <div className={styles.middle_num} id={styles.num_two}>{dataNum}</div>
                            <div className={styles.middle_text}>Number of Data</div>
                        </div>

                        <div className={styles.middle_box}>
                            <div className={styles.middle_num} id={styles.num_three}>{volunNum}</div>
                            <div className={styles.middle_text}>Volunteers Number</div>
                        </div>
                    </div>

                    {/* Bottom container */}
                    <div id={styles.bottom_container}>
                        <VolunteerTable token={token}/>
                    </div>

                </div>

            </div>
        </main>
    );
}
export default Dashboard;