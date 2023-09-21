// Setting page 
// Admin can manage their personal details and change their password

// Import library
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import CSS
import styles from '../stylesheets/settings.module.css';
const token = localStorage.getItem('token');

const Settings = () =>{

    // Attributes
    // ---------------------------Replace initial data
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [firstName, setFirstName] = useState('');

    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [lastName, setLastName] = useState('');

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [email, setEmail] = useState('');

    const [initialFirstName, setInitialFirstName] = useState(''); 
    const [initialLastName, setInitialLastName] = useState(''); 
    const [initialEmail, setInitialEmail] = useState('');

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
            setEmail(data.email);

            setInitialFirstName(data.firstName);
            setInitialLastName(data.lastName);
            setInitialEmail(data.email);
        })
        .catch(error => console.error('Error:', error));
    }, []); 

    // Handle the edit button
    const handleEditButton = () => {
        setIsEditingFirstName(true);
        setIsEditingLastName(true);
        setIsEditingEmail(true);
    };
    
    // Handle input changes
    const handleFirstNameChange = (first_name) => {
        setFirstName(first_name.target.value);
    };

    const handleLastNameChange = (last_name) => {
        setLastName(last_name.target.value);
    };

    const handleEmailChange = (email) => {
        setEmail(email.target.value);
    };

    // Handle input changes submit
    const handleSubmit = () => {
        setIsEditingFirstName(false);
        setIsEditingLastName(false);
        setIsEditingEmail(false);

        // ----------------------- Post change of all inputs to database
        fetch('http://localhost:3001/api/users', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email
            })
        })
        .then(response => response.json())
        .then(data => {
        console.log('Data updated successfully:', data);
        })
        .catch(error => console.error('Error:', error));
    };

    // Handle cancel button
    const handleCancelButton = () => {
        setFirstName(initialFirstName); 
        setLastName(initialLastName); 
        setEmail(initialEmail); 
        setIsEditingFirstName(false);
        setIsEditingLastName(false);
        setIsEditingEmail(false);
    };

    return (
        <main>
            <div id={styles.settings}>

                {/* Heading */}
                <h1 class={styles.page_heading}>Settings</h1>

                {/* Add empty space for the sub heading in main page */}
                <div class={styles.space}></div>

                {/* Line */}
                <div className={styles.line}></div>

                {/* Change Password */}
                <div className={styles.change_password_container}>
                    <h2>Password</h2>

                    <Link to="/settings/change_password" className={styles.no_underline}>
                        <button>Change Password</button>
                    </Link>
                </div>

                {/* Line */}
                <div className={styles.line}></div>

                {/* Change Personal Profile */}
                <div className={styles.change_profile_container}>
                    <div className={styles.profile_heading}>
                        <h2>Profile</h2>
                        <button onClick={handleEditButton}>Edit</button>
                    </div>

                    <div className={styles.profile_form}>
                        
                        {/* First Name */}
                        {isEditingFirstName ? (
                            <form>
                                <h4>First Name</h4>
                                <input type="text" value={firstName} onChange={handleFirstNameChange} />
                            </form>
                        ) : (
                            <div className={styles.text_container}>
                                <h4>First Name</h4>
                                <div className={styles.text}>{firstName}</div>
                            </div>
                        )}

                        {/* Last Name */}
                        {isEditingLastName ? (
                            <div className={styles.editing_container}>
                                <form>
                                    <h4>Last Name</h4>
                                    <input type="text" value={lastName} onChange={handleLastNameChange} />
                                </form>
                            </div>
                        ) : (
                            <div className={styles.text_container}>
                                <h4>Last Name</h4>
                                <div className={styles.text}>{lastName}</div>
                            </div>
                        )}

                        {/* Last Name */}
                        {isEditingEmail ? (
                            <div className={styles.editing_container}>
                                <form>
                                    <h4>Email</h4>
                                    <input type="email" value={email} onChange={handleEmailChange} />
                                </form>
                            </div>
                        ) : (
                            <div className={styles.text_container}>
                                <h4>Email</h4>
                                <div className={styles.text}>{email}</div>
                            </div>
                        )}

                        <div className={styles.input_button}>
                            {isEditingFirstName && <button onClick={handleCancelButton}>Cancel</button>}
                            {isEditingFirstName && <button onClick={handleSubmit}>Submit</button>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Settings;