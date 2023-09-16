import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/navbar.css'

const NavBar= () =>{
    return (
        <div class = "navbar">
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
                <Link to="/data_review">Data Review</Link>
            </li>

            <li>
                <Link to="/reminder_list">Reminder List</Link>
            </li>

            <li>
                <Link to="/settings">Settings</Link>
            </li>

            <li>
                <Link to="/admin_management">Admin Management</Link>
            </li>

            <li>
                <Link to="/survey_management">Survey Management</Link>
            </li>
        </div>
    );
}

export default NavBar;