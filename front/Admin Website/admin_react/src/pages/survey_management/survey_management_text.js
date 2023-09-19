// Sub page of survey management - Text Question
// Let admin add/edit text survey question

// Import library
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css';

const SurveyText = () =>{

    // Submit survey question information
    const [question, setQuestion] = useState('');
    const navigate = useNavigate();

    const handleQuestion = event => {
        setQuestion(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        // ---------------- Add post request

        console.log('Submitted with value:', question);
        navigate('/survey_management'); 
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
                    <textarea className={styles.input_question_text} value={question} onChange={handleQuestion} placeholder="Enter the question text here" row={4} colume={50}/>

                    {/* Buttons down the bottom */}
                    <div className={styles.button_container}>
                        <Link to="/survey_management/type" className={styles.no_underline}>
                            <button className={styles.button}>Cancel</button>
                        </Link>

                        <button type="submit" onClick={handleSubmit} className={styles.button}>Add New</button>
                    </div>
                
                </div>

            </div>

        </div>
    );
}
export default SurveyText;