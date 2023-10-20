// Sub page of survey management - Text Question
// Let admin add/edit text survey question

// Import library
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css';

const SurveyText = () =>{

    // Variables
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const selectedTitle = queryParams.get('selectedTitle');
    // const selectedType = queryParams.get('selectedType');
    const [question, setQuestion] = useState('');
    const [questionSecond, setQuestionSecond] = useState('');
    const [giveWarning, setWarning] = useState(false);

    // Submit survey question information
    const handleQuestion = event => {
        setQuestion(event.target.value);
    };

    const handleQuestionSecond = event => {
        setQuestionSecond(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (question !== '') {
            // Add post request (selectedTitle, selectedType, question)
            fetch('https://weconnect-admin-06193c688dcf.herokuapp.com/api/addTextQuestion', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selectedTitle: selectedTitle,  
                question: question,
                questionSecond: questionSecond,
              })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Question added successfully:', data);
                navigate('/survey_management'); 
            })
            .catch(error => {
                console.error('Error adding question:', error);
            });

            console.log('Submitted with value:', selectedTitle, question, questionSecond);
            navigate('/survey_management'); 
        } else {
            setWarning(true);
        }
    };

    return (
        <div>
            <h3 className={styles.sub_heading}>Add New Survey Question</h3>

            {/* {Line} */}
            <div className={styles.line}></div>

            <div id={styles.survey_text}>

                <h2 className={styles.survey_manage_instruction}>Text</h2>

                {/* Container in the middle */}
                <div className={styles.question_container}>

                    {/* Enter Question box */}
                    <div className={styles.survey_manage_question_instruction}>Question</div>

                    {/* Enter question text in the input box */}
                    <textarea className={styles.input_question_text} value={question} onChange={handleQuestion} placeholder="Enter the question text here" row={3} colume={50}/>
                    <textarea className={styles.input_question_text} value={questionSecond} onChange={handleQuestionSecond} placeholder="Enter the second survey question text here if it is different" row={3} colume={50}/>

                    {/* Buttons down the bottom */}
                    <div className={styles.button_container}>
                        <Link to="/survey_management/type" className={styles.no_underline}>
                            <button className={styles.button}>Cancel</button>
                        </Link>

                        {/* Give user a reminder if none of the text is entered */}
                        {giveWarning && <div className={styles.warning}>Please enter the question text before submit.</div>}

                        <button type="submit" onClick={handleSubmit} className={styles.button}>Submit</button>
                    </div>
                
                </div>

            </div>

        </div>
    );
}
export default SurveyText;