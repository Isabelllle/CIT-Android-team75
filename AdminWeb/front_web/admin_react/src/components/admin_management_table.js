// Table component for the admin management list

import React, { useState, useEffect, useCallback, useRef } from 'react'

// Import CSS
import styles from '../stylesheets/admin_management.module.css';

// Import Asset
import ApproveIcon from '../Assets/Icon/icon_approve.png';
import DisapproveIcon from '../Assets/Icon/icon_disapprove.png';

import axios from 'axios'; // Import the library used to send HTTP requests

const AdminManagementTable = ({ selectedSort }) => {

    // Table Variable
    const [tableData, setTableData] =  useState([]);

    // last_name, first_name, email, group
  
    const tableHeaders = ['Last Name', 'First Name', 'Email', 'Group'];

       // Handle the sort option
       const handleSort = useCallback(() => {
        console.log('Sorting...');
        fetch('http://localhost:3001/api/getUnregisterList') 
            .then(response => response.json())
            .then(data => {
                console.log(selectedSort);
                if (selectedSort === 'last_name') {
                    // -------------------- Fetch data and sort by last name
                    const sortedData = data.sort((a, b) => a.lastName.localeCompare(b.lastName));
                    setTableData(sortedData);
                } else if (selectedSort === 'first_name') {
                    // -------------------- Fetch data and sort it with first name
                    const sortedData = data.sort((a, b) => a.firstName.localeCompare(b.firstName));
                    setTableData(sortedData);
                } else if (selectedSort === 'group') {
                    // -------------------- Fetch data and sort it with group name
                    const sortedData = data.sort((a, b) => a.group_name.localeCompare(b.group_name));
                    setTableData(sortedData);
                } else {
                    setTableData(data);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [selectedSort]);
    
    useEffect(() => {
        handleSort();
    }, [handleSort]);

    // Handle the approve and confirm box request
    const confirmApproveModalRef = useRef(null);
    var approveEmail = '';
    
    const showApproveModal = () => {
        confirmApproveModalRef.current.style.display = 'block';
    };
    
    const closeApproveModal = () => {
        confirmApproveModalRef.current.style.display = 'none';
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
    
        // Approve email
        fetch('http://localhost:3001/api/approveEmail', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: approveEmail,
            })
        })
        .then(response => response.json()) 
        .then(data => {
            sendEmail(approveEmail, 'approve');
        })
        .catch(error => console.error('Error:', error));
    
        console.log('Confirm approve:', approveEmail);
        closeApproveModal();
    };
    

    // send email function
    const sendEmail = (email, type) => {
        axios.post('http://localhost:3001/api/sendEmail', { email, type})
          .then(response => {
            console.log('Email sent successfully');
          })
          .catch(error => {
            console.error('Error sending email:', error);
          });
    };
    

    const handelApproveCancel = () => {
        approveEmail = '';
        closeApproveModal();
    }

    // Handle the disapprove and confirm box request
    const confirmDisapproveModalRef =  useRef(null);
    var disapproveEmail = '';
    
    const showDisapproveModal = () => {
        confirmDisapproveModalRef.current.style.display = "block";
    };
    
    const closeDisapproveModal = () => {
        confirmDisapproveModalRef.current.style.display = "none";
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

        // Disapprove email
        fetch('http://localhost:3001/api/disapproveEmail', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: disapproveEmail,
            })
        })
        .then(response => response.json()) 
        .then(data => {
            sendEmail(disapproveEmail, 'disapprove');
        })
        .catch(error => console.error('Error:', error));

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
                        <td className={styles.content}>{item.lastName}</td>
                        <td className={styles.content}>{item.firstName}</td>
                        <td className={styles.content}>{item.email}</td>
                        <td className={styles.content}>{item.group_name}</td>
                        <td className={styles.content}>{item.approve}</td>
                        <td className={styles.content}>{item.disapprove}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Confirm Modal if the admin want to approve the account */}
            <div className={styles.confirm_modal} ref={confirmApproveModalRef}>
                <div className={styles.modal_content}>
                    <div className={styles.confirm_text}>Are you sure you want to approve the sign up request?</div>
                    
                    <div className={styles.button_box}>
                        <button id='confirm_button' onClick={handleApproveConfirm}>Confirm</button>
                        <button id='cancel_button' onClick={handelApproveCancel}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* Confirm Modal if the admin want to disapprove the account */}
            <div className={styles.confirm_modal} ref={confirmDisapproveModalRef}>
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