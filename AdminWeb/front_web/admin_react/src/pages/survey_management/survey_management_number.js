// Sub page of survey management - Number Question
// Let admin add/edit number survey question

// Import library
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css';

const SurveyNumber = () =>{

    // Variables
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const selectedTitle = queryParams.get('selectedTitle');
    const selectedType = queryParams.get('selectedType');
    const [question, setQuestion] = useState('');
    const [giveWarning, setWarning] = useState(false);

    // Submit survey question information
    const handleQuestion = event => {
        setQuestion(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (question !== '') {
            // ---------------- Add post request (selectedTitle, selectedType, question)

            console.log('Submitted with value:', selectedTitle, selectedType, question);
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

            <div id={styles.survey_number}>

                <h2 className={styles.survey_manage_instruction}>Number</h2>

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

                        {/* Give user a reminder if none of the text is entered */}
                        {giveWarning && <div className={styles.warning}>Please enter the question text before submit.</div>}

                        <button type="submit" onClick={handleSubmit} className={styles.button}>Submit</button>
                    </div>
                
                </div>

            </div>

        </div>
    );
}
export default SurveyNumber;