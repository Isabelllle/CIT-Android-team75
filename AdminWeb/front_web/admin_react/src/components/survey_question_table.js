// Table component for the survey question list

import React, { useState, useEffect } from 'react'

// Import CSS
import styles from '../stylesheets/survey_management.module.css';

// Import Asset
import DeleteIcon from '../Assets/Icon/icon_delete_list.png'

const SurveyQuestionTable = () => {

    // Variable
    // -------------------- Replace the data with survey question table in database
    const [tableData, setTableData] = useState([ ]);

    useEffect(() => {
        fetch('https://weconnect-admin-06193c688dcf.herokuapp.com/api/getSurveyQuesTable')
            .then(response => response.json())
            .then(data => setTableData(data))
            .catch(error => console.error('Error:', error));
    }, []); 
    
    // Handle the delete and comfirm box request
    const confirmModal = document.getElementById("confirm_modal");
    var deleteId = '';
    
    const showModal = () => {
        confirmModal.style.display = "block";
    };
    
    const closeModal = () => {
        confirmModal.style.display = "none";
    };

    const handleDelete = (id) => {
        console.log('Delete clicked item:', id);
        deleteId = id;
        showModal();
    };

    const handleConfirm = (id) => {

        const updatedTableData = tableData.filter(item => item.id !== deleteId);
        // Update the tableData state with the updated list
        setTableData(updatedTableData);

        //--------------------Delete item from databas
        fetch(`https://weconnect-admin-06193c688dcf.herokuapp.com/api/deleteItem/${deleteId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
        })
        .catch(error => console.error('Error:', error));

        console.log('Confirm delete:', deleteId);
        closeModal();
    };

    const handelCancel = () => {
        deleteId = '';
        closeModal();
    }

    const mappedTableData = tableData.map((item) => ({
        ...item,
        delete: <button onClick={() => handleDelete(item.id)} className={styles.survey_list_button}><img src={DeleteIcon} alt="Delete item" /></button>,
    }));
  
    const tableHeaders = ['Topic', 'Question Type', 'Question Text'];
  
    return (
        <div id={styles.survey_question_table}>

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
                        <td className={styles.content}>{item.topic}</td>
                        <td className={styles.content}>{item.type}</td>
                        <td className={styles.content}>{item.question_first}</td>
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
  
  export default SurveyQuestionTable;