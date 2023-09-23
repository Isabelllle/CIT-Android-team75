// Table component for the reminder list

import React, { useState, useEffect } from 'react'

// Import CSS
import styles from '../stylesheets/reminder_list.module.css';

// Import Asset
import DeleteIcon from '../Assets/Icon/icon_delete_list.png'

const ReminderTable = ({ selectedSort, searchEmail }) => {

    // useEffect(() => {
    //     fetch('http://localhost:3001/api/getReminderList')
    //         .then(response => response.json())
    //         .then(data => setTableData(data))
    //         .catch(error => console.error('Error:', error));
    // }, []); 


    // Testing Variable
    const [tableData, setTableData] = useState([
        { id:1, last_name: 'Story', first_name: 'Text', email: '12345@gmail.com', overdue_day: '1' },
        { id:2, last_name: 'Wellbeing', first_name: 'Rating', email: '23456@gmail.com', overdue_day: '3'},
        { id:3, last_name: 'Story', first_name: 'Drop down', email: '34567@gmail.com', overdue_day: '3' },
        { id:4, last_name: 'Employability', first_name: 'Text', email: '45678@gmail.com', overdue_day: '4' },
        { id:5, last_name: 'Wellbeing', first_name: 'Number', email: '56789@gmail.com', overdue_day: '2' },
        { id:6, last_name: 'Story', first_name: 'Rating', email: '67890@gmail.com', overdue_day: '2' },
        { id:7, last_name: 'Story', first_name: 'Text', email: 'abcde@gmail.com', overdue_day: '2' },
        { id:8, last_name: 'Wellbeing', first_name: 'Rating', email: 'bcdef@gmail.com', overdue_day: '3' },
        { id:9, last_name: 'Story', first_name: 'Drop down', email: 'cdefg@gmail.com', overdue_day: '1' },
        { id:10, last_name: 'Employability', first_name: 'Text', email: 'defga@gmail.com', overdue_day: '5' },
        { id:11, last_name: 'Wellbeing', first_name: 'Number', email: 'efgab@gmail.com', overdue_day: '2' },
        { id:12, last_name: 'Story', first_name: 'Rating', email: 'fgabc@gmail.com', overdue_day: '5' },
        { id:13, last_name: 'Story', first_name: 'Text', email: 'gabcd@gmail.com', overdue_day: '5' },
    ])

    // Handle the sort option
    const handleSort = () => {
        if (selectedSort === 'last_name') {
            // -------------------- 调取data，用last name排序
            console.log('Sort by last_name');
        } else if (selectedSort === 'first_name') {
            // -------------------- 调取data，用first name排序
            console.log('Sort by first_name');
        } else {
            // -------------------- 调取data，用overdue day排序
            console.log('Sort by overdue_day');
        }
    };

    
    useEffect(() => { // Call handleSort whenever selectedSort changes
        handleSort();
    }, [selectedSort]); 

    // Handle the sort option
    const handleSearch = () => {
        // -------------------- 调取data，只显示searchEmail对应的data
        console.log('The search Message is' + searchEmail);
    };

    useEffect(() => { // Call handleSort whenever selectedSort changes
        handleSearch();
    }, [searchEmail]); 
    
    // Handle the delete request
    const handleDelete = (id) => {

        const updatedTableData = tableData.filter(item => item.id !== id);
        // Update the tableData state with the updated list
        setTableData(updatedTableData);

        //--------------------Delete item from databas
        // fetch(`http://localhost:3001/api/deleteItem/${id}`, {
        //     method: 'DELETE',
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data); 
        // })
        // .catch(error => console.error('Error:', error));

        console.log('Delete clicked item:', id);
    };

    const mappedTableData = tableData.map((item) => ({
        ...item,
        delete: <button onClick={() => handleDelete(item.id)} className={styles.reminder_list_button}><img src={DeleteIcon} alt="Delete item" /></button>,
    }));
  
    const tableHeaders = ['Last Name', 'First Name', 'Email', 'Overdue Day'];
  
    return (
        <div id={styles.reminder_list_table}>

            {/* Table header */}
            <table className={styles.header_table}>
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                    ))}

                    {/* Empty header for delete icon */}
                    <th></th>
                </tr>
                </thead>
            </table>

            {/* Table Body */}
            <div className={styles.content_container}>
                <table className={styles.content_table}>
                    <tbody>
                    {mappedTableData.map((item) => (
                        <tr key={item.id}>
                        <td className={styles.content}>{item.last_name}</td>
                        <td className={styles.content}>{item.first_name}</td>
                        <td className={styles.content}>{item.email}</td>
                        <td className={styles.content}>{item.overdue_day}</td>
                        <td className={styles.content}>{item.delete}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
  };
  
  export default ReminderTable;