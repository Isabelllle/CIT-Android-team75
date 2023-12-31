// Setting page - Change Password 
// Admin can change their password

// Import library
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import CSS
import styles from '../stylesheets/settings.module.css';

// Import Token
const token = localStorage.getItem('token');

const SettingsPassword = () =>{

    // Attributes
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const [giveWarningFill, setWarningFill] = useState(false);
    const [giveWarningConfirm, setWarningConfirm] = useState(false);
    const [giveWarningPassword, setWarningPassword] = useState(false);

    useEffect(() => {
        if(token){
            // fetch to get the user's information
            fetch('https://weconnect-admin-06193c688dcf.herokuapp.com/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            })
        
            .then(response => response.json())
            .then(data => {
                setOldPassword(data.password);
                setEmail(data.email);
            })
            .catch(error => console.error('Error:', error));
        }
    }, []); 

    // Handle input changes
    const handleOldPassword = (old_password) => {
        setOldPassword(old_password.target.value);
    };

    const handleNewPassword = (new_password) => {
        setNewPassword(new_password.target.value);
    };

    const handleConfirmPassword = (confirm_password) => {
        setConfirmPassword(confirm_password.target.value);
    };

    // Handle input changes submit
    const handleSubmit = () => {
        if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
            setWarningFill(true);
            setWarningConfirm(false);
            setWarningPassword(false);
        } else if (newPassword.trim() !== confirmPassword.trim()) {
            setWarningConfirm(true);
            setWarningFill(false);
            setWarningPassword(false);
        } else {
            // Post change of all inputs to database
            fetch('https://weconnect-admin-06193c688dcf.herokuapp.com/api/userspassword', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                  oldpassword: oldPassword,
                  password: newPassword,
                  email: email,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Data updated successfully:', data); 
                    console.log('Entered Password:', oldPassword, newPassword, confirmPassword);
                    setWarningPassword(false);
                    navigate('/settings'); 
                } else {
                    console.error('Error:', data.message);
                    setWarningFill(false);
                    setWarningConfirm(false);
                    setWarningPassword(true);
                }
            })
        }
    };

    return (
        <main>
            <div id={styles.settings_change_password}>

                {/* Heading */}
                <h1 class={styles.page_heading}>Settings</h1>

                {/* Subheading */}
                <h3 className={styles.sub_heading}>Change Password</h3>

                {/* Line */}
                <div className={styles.line}></div>

                {/* Change Password Container */}
                <div className={styles.change_password_container}>
                    <form>
                        {/* Old Password Input */}
                        <div className={styles.input_container}>
                            <h2>Old Password</h2>
                            <input type="password" value={oldPassword} onChange={handleOldPassword} placeholder="Enter your old password" />
                        </div>

                        {/* New Password Input */}
                        <div className={styles.input_container}>
                            <h2>New Password</h2>
                            <input type="password" value={newPassword} onChange={handleNewPassword} placeholder="Enter your new password" />
                        </div>

                        {/* Confirm New Password Input */}
                        <div className={styles.input_container}>
                            <h2>Confirm Password</h2>
                            <input type="password" value={confirmPassword} onChange={handleConfirmPassword} placeholder="Confirm your old password" />
                        </div>
                    </form>

                    {/* Give user a reminder if password is not entered */}
                    {giveWarningFill && <div className={styles.warning}>Please fill all the passwords before submit.</div>}

                    {/* Give user a reminder if the new password and confirm password are different */}
                    {giveWarningConfirm && <div className={styles.warning}>New password and confirm password must be same!</div>}

                    {/* Give user a reminder if the old password is incorrect */}
                    {giveWarningPassword && <div className={styles.warning}>Old password is incorrect, check your input!</div>}

                    <div className={styles.button_container}>
                        <Link to="/settings" className={styles.no_underline}>
                            <button className={styles.button}>Back</button>
                        </Link>

                        <button onClick={handleSubmit} className={styles.button}>Submit</button>
                    </div>
                </div>

            </div>
        </main>
    );
}
export default SettingsPassword;
