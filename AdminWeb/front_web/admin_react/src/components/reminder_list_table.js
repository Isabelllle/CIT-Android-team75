// Table component for the reminder list

import React, { useState, useEffect, useCallback } from 'react'

// Import CSS
import styles from '../stylesheets/reminder_list.module.css';

// Import Asset
import DeleteIcon from '../Assets/Icon/icon_delete_list.png'

const ReminderTable = ({ selectedSort, searchEmail }) => {

    // Testing Variable
    const [tableData, setTableData] = useState([
    ])

    // Handle the sort option
    const handleSort = useCallback(() => {
        console.log('Sorting...');
        fetch('http://localhost:3001/api/getReminderList') 
            .then(response => response.json())
            .then(data => {
                console.log('Sorted data:', data);
                if (selectedSort === 'last_name') {
                    // -------------------- 调取data，用last name排序
                    const sortedData = data.sort((a, b) => a.last_name.localeCompare(b.last_name));
                    setTableData(sortedData);
                } else if (selectedSort === 'first_name') {
                    // -------------------- 调取data，用first name排序
                    const sortedData = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
                    setTableData(sortedData);
                } else {
                    // -------------------- 调取data，用overdue day排序
                    const sortedData = data.sort((a, b) => a.overdue_day.seconds - b.overdue_day.seconds);
                    setTableData(sortedData);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [selectedSort]);


    // Handle the sort option
    const handleSearch = useCallback(() => {

        // -------------------- 调取data，只显示searchEmail对应的data
        fetch(`http://localhost:3001/api/searchReminderByEmail?email=${searchEmail}`)
            .then(response => response.json())
            .then(data => setTableData(data))
            .catch(error => console.error('Error:', error));

        //     console.log('The search Message is' + searchEmail);
    }, [searchEmail]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);
    
    useEffect(() => {
        handleSort();
    }, [handleSort]);
    
    
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
                    {mappedTableData.map((item, index) => (
                        <tr key={index}>
                        <td className={styles.content}>{item.last_name}</td>
                        <td className={styles.content}>{item.first_name}</td>
                        <td className={styles.content}>{item.email}</td>
                        <td className={styles.content}>{item.overdue_day.seconds}</td>
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