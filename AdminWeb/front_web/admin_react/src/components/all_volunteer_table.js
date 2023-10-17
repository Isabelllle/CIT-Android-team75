// Volunteer table component for the dashboard

import React, { useState, useEffect } from 'react'

// Import CSS
import styles from '../stylesheets/dashboard.module.css';

const VolunteerTable = ({ token }) => {

    // Table Variable
    const [tableData, setTableData] = useState([]);
    const token_one = token;
  
    const tableHeaders = ['Last Name', 'First Name', 'Email'];

    console.log('token is token',token);

    useEffect(() => {
        if (token_one){
            fetch('http://localhost:3001/api/getReminderList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            })
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                  return response.json().then(errorData => {
                    throw new Error(errorData.error);
                  });
                }
                return response.json();
            })
            .then(data => {
                setTableData(data);
            })
            .catch(error => console.error('Error:', error));
        }
    }, []); 

    return (
        <div id={styles.volunteer_table}>

            {/* Table header */}
            <table className={styles.header_table}>
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
            </table>

            {/* Table Body */}
            <div className={styles.content_container}>
                <table className={styles.content_table}>
                    <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index}>
                        <td className={styles.content}>{item.last_name}</td>
                        <td className={styles.content}>{item.first_name}</td>
                        <td className={styles.content}>{item.email}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
  };
  
  export default VolunteerTable;