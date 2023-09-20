// Table component for the survey question list

import React from 'react'

// Import CSS
import styles from '../stylesheets/survey_management.module.css';

// Import Asset
import EditIcon from '../Assets/Icon/icon_edit_list.png'
import DeleteIcon from '../Assets/Icon/icon_delete_list.png'

const SurveyQuestionTable = () => {

    // Handle the edit request
    const handleEdit = (item) => {

        console.log('Edit clicked item:', item);
    };
    
    // Handle the delete request
    const handleDelete = (item) => {

        //--------------------Delete item from databas
        console.log('Delete clicked item:', item);
    };

    // Front end testing data
    // -------------------- Replace the data with survey question table in database
    const tableData = [
      { id:1, topic: 'Story', type: 'Text', question: 'This is the first question.' },
      { id:2, topic: 'Wellbeing', type: 'Rating', question: 'This is the second question.' },
      { id:3, topic: 'Story', type: 'Drop down', question: 'This is the third question.' },
      { id:4, topic: 'Employability', type: 'Text', question: 'This is the forth question.' },
      { id:5, topic: 'Wellbeing', type: 'Number', question: 'This is the fifth question.' },
      { id:5, topic: 'Story', type: 'Rating', question: 'This is the sixth question.' },
      { id:1, topic: 'Story', type: 'Text', question: 'This is the first question.' },
      { id:2, topic: 'Wellbeing', type: 'Rating', question: 'This is the second question.' },
      { id:3, topic: 'Story', type: 'Drop down', question: 'This is the third question.' },
      { id:4, topic: 'Employability', type: 'Text', question: 'This is the forth question.' },
      { id:5, topic: 'Wellbeing', type: 'Number', question: 'This is the fifth question.' },
      { id:5, topic: 'Story', type: 'Rating', question: 'This is the sixth question.' },
      { id:1, topic: 'Story', type: 'Text', question: 'This is the first question.' },
      { id:2, topic: 'Wellbeing', type: 'Rating', question: 'This is the second question.' },
      { id:3, topic: 'Story', type: 'Drop down', question: 'This is the third question.' },
      { id:4, topic: 'Employability', type: 'Text', question: 'This is the forth question.' },
      { id:5, topic: 'Wellbeing', type: 'Number', question: 'This is the fifth question.' },
      { id:5, topic: 'Story', type: 'Rating', question: 'This is the sixth question.' },
    ].map((item) => ({
        ...item,
        edit: <button onClick={() => handleEdit(item)} className={styles.survey_list_button}><img src={EditIcon} alt="Edit item" /></button>,
        delete: <button onClick={() => handleDelete(item)} className={styles.survey_list_button}><img src={DeleteIcon} alt="Delete item" /></button>,
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
                    {tableData.map((row) => (
                        <tr key={row.id}>
                        <td className={styles.content}>{row.topic}</td>
                        <td className={styles.content}>{row.type}</td>
                        <td className={styles.content}>{row.question}</td>
                        <td className={styles.content}>{row.edit}</td>
                        <td className={styles.content}>{row.delete}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
  };
  
  export default SurveyQuestionTable;