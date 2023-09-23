// Reminder List 
// Let admin see all the volunteer has the second survey overdue

// Import library
import React, { useState } from 'react'

// Import CSS
import styles from '../stylesheets/reminder_list.module.css';

// Import Component
import ReminderTable from '../components/reminder_list_table'

// Import Asset
import SearchIcon from '../Assets/Icon/icon_search.png'

const ReminderList = () =>{

    // Handle sorting options
    const [selectedSort, setSelectedSort] = useState('overdue_day');

    const handleSort = (event) => {
        setSelectedSort(event.target.value);
    };

    // Handle search email
    const [searchEmailChange, setSearchEmailChange] = useState('');
    const [searchEmail, setSearchEmail] = useState('');

    const handleSearchEmailChange = (event) => {
        setSearchEmailChange(event.target.value);
    };

    const handleSubmitSearchEmail = () => {
        setSearchEmail(searchEmailChange);
    };

    return (
        <main>
            <div className={styles.reminder_list}>

                {/* Heading */}
                <h1 className={styles.page_heading}>Reminder List</h1>

                <div className={styles.box_container}>
                    
                    {/* Sort Box */}
                    <select id={styles.sort_box} value={selectedSort} onChange={handleSort}>
                        <option value="last_name">Last Name</option>
                        <option value="first_name">First Name</option>
                        <option value="overdue_day">Overdue Day</option>
                    </select>

                    {/* Search Box */}
                    <div id={styles.search_box}>
                        <input type="email" placeholder="Search by Email" value={searchEmailChange} onChange={handleSearchEmailChange}/>
                        <button onClick={handleSubmitSearchEmail}><img src={SearchIcon} alt="Search by Email" /></button>
                    </div>
                </div>

                {/* Reminder List Table */}
                <ReminderTable selectedSort={selectedSort} searchEmail={searchEmail}/>

            </div>

        </main>
    );
}
export default ReminderList;