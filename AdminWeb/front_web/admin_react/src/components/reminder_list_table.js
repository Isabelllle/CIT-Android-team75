// Table component for the reminder list

import React, { useState, useEffect, useCallback } from 'react'

// Import CSS
import styles from '../stylesheets/reminder_list.module.css';

// Import Asset
import DeleteIcon from '../Assets/Icon/icon_delete_list.png'

// Import token
const token = localStorage.getItem('token');

const ReminderTable = ({ selectedSort, searchEmail }) => {

    // Table Variable
    const [tableData, setTableData] = useState([])
    const [initialTableData, setInitialTableData] = useState([])
  
    const tableHeaders = ['Last Name', 'First Name', 'Email', 'Overdue Day'];

    useEffect(() => {
        if (token){
            // fetch to get the user's information
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
                setInitialTableData(data);
            })
            .catch(error => console.error('Error:', error));
        }
    }, []); 

    console.log(initialTableData);

    // Handle the sort option
    const handleSort = useCallback(() => {
            if (selectedSort === 'last_name') {
                // Fetch data and sort by last name
                const sortedData = [...initialTableData].sort((a, b) => a.last_name.localeCompare(b.last_name));
                setTableData(sortedData);
            } else if (selectedSort === 'first_name') {
                // Fetch data and sort it with first name
                const sortedData =  [...initialTableData].sort((a, b) => a.first_name.localeCompare(b.first_name));
                setTableData(sortedData);
            } else if (selectedSort === 'overdue_day') {
                // Fetch the data and sort it by overdue day
                const sortedData =  [...initialTableData].sort((a, b) => a.overdue_day - b.overdue_day);
                console.log('Sorted data after:', sortedData);
                setTableData(sortedData);
            } else {
                setTableData(initialTableData);
            }  
    }, [selectedSort, initialTableData]);


    const [notFoundWarning, setNotFoundWarning] = useState(false);
    // Handle search
    const handleSearch = useCallback(() => {

        if (searchEmail === '') {
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
            .then(data => 
                {console.log(data, 'survey');
                setTableData(data)})
            .catch(error => console.error('Error:', error));

        }else{
            // fetch data, only the data corresponding to searchEmail is displayed
            fetch(`http://localhost:3001/api/searchReminderByEmail?email=${searchEmail}`)
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
                    setNotFoundWarning(data.length === 0);
                })
                .catch(error => console.error('Error:', error));
        }

    }, [searchEmail]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);
    
    useEffect(() => {
        handleSort();
    }, [handleSort]);
    
    
    // Handle the delete and confirm box request
    const confirmModal = document.getElementById("confirm_modal");
    var deleteEmail = '';
    
    const showModal = () => {
        confirmModal.style.display = "block";
    };
    
    const closeModal = () => {
        confirmModal.style.display = "none";
    };

    const handleDelete = (email) => {
        console.log('Delete clicked item:', email);
        deleteEmail = email;
        showModal();
    };

    const handleConfirm = () => {
        const updatedTableData = tableData.filter(item => item.email !== deleteEmail);
        // Update the tableData state with the updated list
        setTableData(updatedTableData);

        // Delete item from databas
        fetch(`http://localhost:3001/api/deleteEmail/${deleteEmail}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
        })
        .catch(error => console.error('Error:', error));

        console.log('Confirm delete:', deleteEmail);
        closeModal();
    };

    const handelCancel = () => {
        deleteEmail = '';
        closeModal();
    }

    console.log('Table data', tableData);

    const mappedTableData = tableData.map((item) => ({
        ...item,
        delete: <button onClick={() => handleDelete(item.email)} className={styles.reminder_list_button}><img src={DeleteIcon} alt="Delete item" /></button>,
    }));
  
    return (
        <div id={styles.reminder_list_table}>

            {/* If notFoundWarning is true, display a warning message */}
            {notFoundWarning && <div className={styles.warning_message}>No results found for the provided email.</div>}
            
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
                        <td className={styles.content}>{item.overdue_day}</td>
                        <td className={styles.content}>{item.delete}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Confirm Modal if the user trying to delete an item */}
            <div className={styles.confirm_modal} id='confirm_modal'>
                <div className={styles.modal_content}>
                    <div className={styles.confirm_text}>Are you sure you want to delete this?</div>
                    
                    <div className={styles.button_box}>
                        <button id='confirm_button' onClick={handleConfirm}>Confirm</button>
                        <button id='cancel_button' onClick={handelCancel}>Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    );
  };
  
  export default ReminderTable;