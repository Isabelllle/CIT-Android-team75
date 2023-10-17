// Sub page of survey management - Rating Question
// Let admin add/edit rating survey question

// Import library
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css';

const SurveyRating = () =>{

    // Variables
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const selectedTitle = queryParams.get('selectedTitle');
    const selectedType = queryParams.get('selectedType');
    const [question, setQuestion] = useState('');
    const [questionSecond, setQuestionSecond] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [giveWarning, setWarning] = useState(false);

    // Submit survey question information
    const handleQuestion = event => {
        setQuestion(event.target.value);
    };

    const handleQuestionSecond = event => {
        setQuestionSecond(event.target.value);
    };

    const handleMin = event => {
        setMin(event.target.value);
    };

    const handleMax = event => {
        setMax(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (question !== '' && min !== '' && max !== '') {
            // ---------------- Add post request (selectedTitle, selectedType, question, min, max)
            fetch('http://localhost:3001/api/addRatingQuestion', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selectedTitle: selectedTitle,  
                selectedType: selectedType,
                question: question,
                questionSecond: questionSecond,
                rate_min: min,
                rate_max: max,
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

            console.log('Submitted with value:', selectedTitle, selectedType, question, min, max);
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

            <div id={styles.survey_rating}>

                <h2 className={styles.survey_manage_instruction}>Rating</h2>

                {/* Container in the middle */}
                <div className={styles.question_container}>

                    {/* Enter Question box */}
                    <div className={styles.survey_manage_question_instruction}>Question</div>

                    {/* Enter question text in the input box */}
                    <textarea className={styles.input_question_text} value={question} onChange={handleQuestion} placeholder="Enter the question text here" row={3} colume={50}/>
                    <textarea className={styles.input_question_text} value={questionSecond} onChange={handleQuestionSecond} placeholder="Enter the second survey question text here if it is different" row={3} colume={50}/>

                    {/* Enter max and min rate representation */}
                    <div className={styles.rate_representation}>
                        <div className={styles.survey_manage_question_instruction}>Minimum rate representing</div>
                        <input className={styles.input_rate_representation}  type="text" value={min} onChange={handleMin} placeholder="Min"/>
                    </div>

                    <div className={styles.rate_representation}>
                        <div className={styles.survey_manage_question_instruction}>Maximum rate representing</div>
                        <input className={styles.input_rate_representation}  type="text" value={max} onChange={handleMax} placeholder="Max"/>
                    </div>

                    {/* Buttons down the bottom */}
                    <div className={styles.button_container}>
                        <Link to="/survey_management/type" className={styles.no_underline}>
                            <button className={styles.button}>Cancel</button>
                        </Link>

                        {/* Give user a reminder if none of the info is entered */}
                        {giveWarning && <div className={styles.warning}>Please fill in all the info before submit.</div>}

                        <button type="submit" onClick={handleSubmit} className={styles.button}>Submit</button>
                    </div>
                
                </div>

            </div>

        </div>
    );
}
export default SurveyRating;