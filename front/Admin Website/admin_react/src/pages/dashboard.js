// JS file for Dashboard Page 

// Import library
import React from 'react';

// Import CSS
import styles from '../stylesheets/dashboard.module.css';

// Import Assets
import Plant from '../Assets/Image/plant1.png'; 

const dashboard = () =>{

    return (
        <main>
            <div class={styles.dashboard}>

                {/* Heading */}
                <h1 class={styles.page_heading}>Dashboard</h1>

                {/* Container */}
                <div class={styles.container}>

                    {/* Top box */}
                    <div class={styles.name_box}>
                        <img id={styles.plant_one} src={Plant} alt="Plant 1" />

                        {/* ----------------------Replace admin's name with Apple Banana */}
                        <div id={styles.hello_info}>Hello, Apple Banana</div>
                    </div>

                    {/* Middle container */}
                    <div id={styles.middle_container}>

                        {/* Summary Box */}
                        <div id={styles.summary_box}>
                            <h2>Data Review Summary</h2>

                            {/* -------------------------------Add summary graph here */}
                            <div class={styles.middle_box}>
                            </div>
                        </div>

                        {/* Reminder Box */}
                        <div id={styles.reminder_box}>
                            <h2>Reminder List</h2>

                            {/* -------------------------------Add reminder list here */}
                            <div class={styles.middle_box}>
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
export default dashboard;