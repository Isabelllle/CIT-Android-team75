// Admin Management Page
// Let admin see the list of manager sign up accounr request

// Import library
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import CSS
import styles from '../stylesheets/admin_management.module.css';

// Import Component
import AdminManagementTable from '../components/admin_management_table';

const AdminManagement = () =>{

    // Handle sorting options
    const [selectedSort, setSelectedSort] = useState('organization');

    const handleSort = (event) => {
        setSelectedSort(event.target.value);
    };

    return (
        <main>
            <div className={styles.admin_management}>

                {/* Heading */}
                <h1 className={styles.page_heading}>Admin Management</h1>

                <div className={styles.box_container}>
                    
                    {/* Sort Box */}
                    <select id={styles.sort_box} value={selectedSort} onChange={handleSort}>
                        <option value="last_name">Last Name</option>
                        <option value="first_name">First Name</option>
                        <option value="group">Group</option>
                    </select>

                    {/* Add New Group Button */}
                    <Link to="/admin_management/add_new_group" className={styles.no_underline}>
                        <button id={styles.new_group_button}>Add New Group</button>
                    </Link>
                    
                </div>

                {/* Admin Management Table */}
                <AdminManagementTable selectedSort={selectedSort}/>

            </div>

        </main>
    );
}
export default AdminManagement;