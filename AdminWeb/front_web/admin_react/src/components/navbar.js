// The navigation bar in admin website page

// Import library
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Import css file
import styles from '../stylesheets/navbar.module.css'

// Import assets
import { ReactComponent as DashboardIcon } from '../Assets/Icon/icon_dashboard.svg';
import { ReactComponent as DataReviewIcon } from '../Assets/Icon/icon_data_review.svg';
import { ReactComponent as ReminderListIcon } from '../Assets/Icon/icon_reminder_list.svg';
import { ReactComponent as SettingsIcon } from '../Assets/Icon/icon_settings.svg';
import { ReactComponent as AdminManageIcon } from '../Assets/Icon/icon_admin_management.svg';
import { ReactComponent as SurveyManageIcon } from '../Assets/Icon/icon_survey_management.svg';

// Import token
const token = localStorage.getItem('token');

const NavBar= () =>{
    const location = useLocation();
    const [isManager, setIsManager] = useState([]);

    useEffect(() => {
        // fetch to get the user's information
        fetch('http://localhost:3001/api/getIsManger', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        })
        .then(response => response.json())
        .then(data => {
            setIsManager(data);
        })
        .catch(error => console.error('Error:', error));
    }, [isManager]); 

    return (

        // Create the list in navigation bar
        <div className={styles.navbar}>
            <li>
                <Link to="/" className={styles.no_underline}>
                    <DashboardIcon className={styles.icon} style={{ fill: location.pathname === '/' ? '#DE0A3F' : 'black' }} src={DashboardIcon} />
                    <h1 className={location.pathname === '/' ? styles.selectedText : styles.unselectedText}>Dashboard</h1>
                </Link>
            </li>

            <li>
                <Link to="/data_review" className={styles.no_underline}>
                    <DataReviewIcon className={styles.icon} style={{ fill: location.pathname === '/data_review' ? '#DE0A3F' : 'black' }} src={DataReviewIcon} />
                    <h1 className={location.pathname === '/data_review' ?  styles.selectedText : styles.unselectedText}>Data Review</h1>
                </Link>
            </li>

            <li>
                <Link to="/reminder_list" className={styles.no_underline}>
                    <ReminderListIcon className={styles.icon} style={{ fill: location.pathname.startsWith('/reminder_list') ? '#DE0A3F' : 'black',  stroke: location.pathname.startsWith('/reminder_list') ? '#DE0A3F' : 'black'  } } src={ReminderListIcon} />
                    <h1 className={location.pathname.startsWith('/reminder_list') ? styles.selectedText : styles.unselectedText}>Reminder List</h1>
                </Link>
            </li>

            <li>
                <Link to="/settings" className={styles.no_underline}>
                    <SettingsIcon className={styles.icon} style={{ fill: location.pathname.startsWith('/settings') ? '#DE0A3F' : 'black' } } src={SettingsIcon} />
                    <h1 className={location.pathname.startsWith('/settings') ?  styles.selectedText : styles.unselectedText}>Settings</h1>
                </Link>
            </li>

            {isManager && (
                <div>
                    <li>
                        <Link to="/admin_management" className={styles.no_underline}>
                            <AdminManageIcon className={styles.icon} style={{ fill: location.pathname.startsWith('/admin_management') ? '#DE0A3F' : 'black',  stroke: location.pathname.startsWith('/admin_management') ? '#DE0A3F' : 'black'  } } src={AdminManageIcon} />
                            <h1 className={location.pathname.startsWith('/admin_management') ? styles.selectedText : styles.unselectedText}>Admin Management</h1>
                        </Link>
                    </li>

                    <li>
                        <Link to="/survey_management" className={styles.no_underline}>
                            <SurveyManageIcon className={styles.icon} style={{ fill: location.pathname.startsWith('/survey_management') ? '#DE0A3F' : 'black' } } src={SurveyManageIcon} />
                            <h1 className={location.pathname.startsWith('/survey_management') ? styles.selectedText : styles.unselectedText}>Survey Management</h1>
                        </Link>
                    </li>
                </div>
            )}
        </div>
    );
}

export default NavBar;