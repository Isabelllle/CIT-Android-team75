// Table component for the admin management list

import React, { useState, useEffect, useCallback } from 'react'

// Import CSS
import styles from '../stylesheets/admin_management.module.css';

// Import Asset
import ApproveIcon from '../Assets/Icon/icon_approve.png';
import DisapproveIcon from '../Assets/Icon/icon_disapprove.png';

const AdminManagementTable = ({ selectedSort }) => {

    // Table Variable
    const [tableData, setTableData] =  useState([
        { last_name: 'Story', first_name: 'Text', email: '12345@gmail.com', group: 'unimelb' },
        { last_name: 'Wellbeing', first_name: 'Rating', email: '23456@gmail.com', group: 'unimelb'},
        { last_name: 'Story', first_name: 'Drop down', email: '34567@gmail.com', group: 'unimelb' },
        { last_name: 'Employability', first_name: 'Text', email: '45678@gmail.com', group: 'Volunteering Victoria' },
        { last_name: 'Wellbeing', first_name: 'Number', email: '56789@gmail.com', group: 'Volunteering Victoria' },
        { last_name: 'Story', first_name: 'Rating', email: '67890@gmail.com', group: 'Volunteering Victoria' },
        { last_name: 'Story', first_name: 'Text', email: 'abcde@gmail.com', group: 'Volunteering Victoria' },
        { last_name: 'Wellbeing', first_name: 'Rating', email: 'bcdef@gmail.com', group: 'unimelb' },
        { last_name: 'Story', first_name: 'Drop down', email: 'cdefg@gmail.com', group: 'unimelb' },
        { last_name: 'Employability', first_name: 'Text', email: 'defga@gmail.com', group: 'unimelb' },
        { last_name: 'Wellbeing', first_name: 'Number', email: 'efgab@gmail.com', group: 'unimelb' },
        { last_name: 'Story', first_name: 'Rating', email: 'fgabc@gmail.com', group: 'Volunteer West' },
        { last_name: 'Story', first_name: 'Text', email: 'gabcd@gmail.com', group: 'Volunteer West' },
    ]);
  
    const tableHeaders = ['Last Name', 'First Name', 'Email', 'Group'];

    // Handle the sort option
    // const handleSort = useCallback(() => {
    //     console.log('Sorting...');
    //     fetch('http://localhost:3001/api/getReminderList') 
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Sorted data:', data);
    //             if (selectedSort === 'last_name') {
    //                 // -------------------- 调取data，用last name排序
    //                 const sortedData = data.sort((a, b) => a.last_name.localeCompare(b.last_name));
    //                 setTableData(sortedData);
    //             } else if (selectedSort === 'first_name') {
    //                 // -------------------- 调取data，用first name排序
    //                 const sortedData = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
    //                 setTableData(sortedData);
    //             } else {
    //                 // -------------------- 调取data，用overdue day排序
    //                 const sortedData = data.sort((a, b) => a.overdue_day.seconds - b.overdue_day.seconds);
    //                 setTableData(sortedData);
    //             }
    //         })
    //         .catch(error => console.error('Error:', error));
    // }, [selectedSort]);
    
    // useEffect(() => {
    //     handleSort();
    // }, [handleSort]);

    // Handle the approve and confirm box request
    const confirmApproveModal = document.getElementById("confirm_approve_modal");
    var approveEmail = '';
    
    const showApproveModal = () => {
        confirmApproveModal.style.display = "block";
    };
    
    const closeApproveModal = () => {
        confirmApproveModal.style.display = "none";
    };

    const handleApprove = (email) => {
        console.log('Approve account:', email);
        approveEmail = email;
        showApproveModal();
    };

    const handleApproveConfirm = () => {
        const updatedTableData = tableData.filter(item => item.email !== approveEmail);
        // Update the tableData state with the updated list
        setTableData(updatedTableData);

        //--------------------Delete item from databas
        // fetch(`http://localhost:3001/api/deleteItem/${approveEmail}`, {
        //     method: 'DELETE',
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data); 
        // })
        // .catch(error => console.error('Error:', error));

        console.log('Confirm approve:', approveEmail);
        closeApproveModal();
    };

    const handelApproveCancel = () => {
        approveEmail = '';
        closeApproveModal();
    }

    // Handle the disapprove and confirm box request
    const confirmDisapproveModal = document.getElementById("confirm_disapprove_modal");
    var disapproveEmail = '';
    
    const showDisapproveModal = () => {
        confirmDisapproveModal.style.display = "block";
    };
    
    const closeDisapproveModal = () => {
        confirmDisapproveModal.style.display = "none";
    };

    const handleDisapprove = (email) => {
        console.log('Disapprove account:', email);
        disapproveEmail = email;
        showDisapproveModal();
    };

    const handleDisapproveConfirm = () => {
        const updatedTableData = tableData.filter(item => item.email !== disapproveEmail);
        // Update the tableData state with the updated list
        setTableData(updatedTableData);

        //--------------------Delete item from databas
        // fetch(`http://localhost:3001/api/deleteItem/${disapproveEmail}`, {
        //     method: 'DELETE',
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data); 
        // })
        // .catch(error => console.error('Error:', error));

        console.log('Confirm disapprove:', disapproveEmail);
        closeDisapproveModal();
    };

    const handelDisapproveCancel = () => {
        approveEmail = '';
        closeDisapproveModal();
    }

    const mappedTableData = tableData.map((item) => ({
        ...item,
        approve: <button onClick={() => handleApprove(item.email)} className={styles.admin_management_button}><img src={ApproveIcon} alt="Approve request" /></button>,
        disapprove: <button onClick={() => handleDisapprove(item.email)} className={styles.admin_management_button}><img src={DisapproveIcon} alt="Disapprove request" /></button>
    }));
  
    return (
        <div id={styles.admin_management_table}>

            {/* Table header */}
            <table className={styles.header_table}>
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                    ))}

                    {/* Empty header for approve and disapprove icon */}
                    <th></th>
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
                        <td className={styles.content}>{item.group}</td>
                        <td className={styles.content}>{item.approve}</td>
                        <td className={styles.content}>{item.disapprove}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Confirm Modal if the admin want to approve the account */}
            <div className={styles.confirm_modal} id='confirm_approve_modal'>
                <div className={styles.modal_content}>
                    <div className={styles.confirm_text}>Are you sure you want to approve the sign up request?</div>
                    
                    <div className={styles.button_box}>
                        <button id='confirm_button' onClick={handleApproveConfirm}>Confirm</button>
                        <button id='cancel_button' onClick={handelApproveCancel}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* Confirm Modal if the admin want to disapprove the account */}
            <div className={styles.confirm_modal} id='confirm_disapprove_modal'>
                <div className={styles.modal_content}>
                    <div className={styles.confirm_text}>Are you sure you want to disapprove the sign up request?</div>
                    
                    <div className={styles.button_box}>
                        <button id='confirm_button' onClick={handleDisapproveConfirm}>Confirm</button>
                        <button id='cancel_button' onClick={handelDisapproveCancel}>Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    );
  };
  
  export default AdminManagementTable;