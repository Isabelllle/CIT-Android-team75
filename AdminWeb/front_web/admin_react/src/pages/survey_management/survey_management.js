// Entry page of survey management
// Set up the basic layout of survey managements pages

// Import library
import React from 'react';
import { Outlet } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css'

const survey_management = () =>{
    return (
        
        <main>
            <div class={styles.survey_management}>

                {/* Heading */}
                <h1 class={styles.page_heading}>Survey Management</h1>

                <Outlet />
            </div>
        </main>
    );
}
export default survey_management;
