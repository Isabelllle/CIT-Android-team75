// Table component for the survey question list

import React, { useState } from 'react'

// Import CSS
import styles from '../stylesheets/survey_management.module.css';

// Import Asset
import EditIcon from '../Assets/Icon/icon_edit_list.png'
import DeleteIcon from '../Assets/Icon/icon_delete_list.png'

const SurveyQuestionTable = () => {

    // Variable
    // -------------------- Replace the data with survey question table in database
    const [tableData, setTableData] = useState([
        { id:1, topic: 'Story', type: 'Text', question: 'This is the first question.' },
        { id:2, topic: 'Wellbeing', type: 'Rating', question: 'This is the second question.' },
        { id:3, topic: 'Story', type: 'Drop down', question: 'This is the third question.' },
        { id:4, topic: 'Employability', type: 'Text', question: 'This is the forth question.' },
        { id:5, topic: 'Wellbeing', type: 'Number', question: 'This is the fifth question.' },
        { id:6, topic: 'Story', type: 'Rating', question: 'This is the sixth question.' },
        { id:7, topic: 'Story', type: 'Text', question: 'This is the first question.' },
        { id:8, topic: 'Wellbeing', type: 'Rating', question: 'This is the second question.' },
        { id:9, topic: 'Story', type: 'Drop down', question: 'This is the third question.' },
        { id:10, topic: 'Employability', type: 'Text', question: 'This is the forth question.' },
        { id:11, topic: 'Wellbeing', type: 'Number', question: 'This is the fifth question.' },
        { id:12, topic: 'Story', type: 'Rating', question: 'This is the sixth question.' },
        { id:13, topic: 'Story', type: 'Text', question: 'This is the first question.' },
        { id:14, topic: 'Wellbeing', type: 'Rating', question: 'This is the second question.' },
        { id:15, topic: 'Story', type: 'Drop down', question: 'This is the third question.' },
        { id:16, topic: 'Employability', type: 'Text', question: 'This is the forth question.' },
        { id:17, topic: 'Wellbeing', type: 'Number', question: 'This is the fifth question.' },
        { id:18, topic: 'Story', type: 'Rating', question: 'This is the sixth question.' },
    ]);

    // Handle the edit request
    const handleEdit = (id) => {

        console.log('Edit clicked item:', id);
    };
    
    // Handle the delete request
    const handleDelete = (id) => {

        const updatedTableData = tableData.filter(item => item.id !== id);
        // Update the tableData state with the updated list
        setTableData(updatedTableData);

        //--------------------Delete item from databas
        console.log('Delete clicked item:', id);
    };

    const mappedTableData = tableData.map((item) => ({
        ...item,
        edit: <button onClick={() => handleEdit(item.id)} className={styles.survey_list_button}><img src={EditIcon} alt="Edit item" /></button>,
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

                    {/* Empty header for edit and delete icon */}
                    <th></th>
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
                        <td className={styles.content}>{item.question}</td>
                        <td className={styles.content}>{item.edit}</td>
                        <td className={styles.content}>{item.delete}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
  };
  
  export default SurveyQuestionTable;