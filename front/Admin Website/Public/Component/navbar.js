// React component
// Navigation bar for all the page after admin log in

import React from 'react';
import { NavLink } from 'react-router-dom';

const navbar= () =>{
    return (
        <div>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>

            <li>
                <NavLink to="/data_review">Data Review</NavLink>
            </li>

            <li>
                <NavLink to="/reminder_list">Reminder List</NavLink>
            </li>

            <li>
                <NavLink to="/settings">Settings</NavLink>
            </li>

            <li>
                <NavLink to="/admin_management">Admin Management</NavLink>
            </li>

            <li>
                <NavLink to="/survey_management">Survey Management</NavLink>
            </li>
        </div>
    );
}

export default navbar;