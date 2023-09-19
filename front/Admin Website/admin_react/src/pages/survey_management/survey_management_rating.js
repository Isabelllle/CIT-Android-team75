// Sub page of survey management - Rating Question
// Let admin add/edit rating survey question

// Import library
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css';

const SurveyRating = () =>{
    // Submit survey question information
    const [valueOne, setValueOne] = useState('');
    const [valueTwo, setValueTwo] = useState('');
    const [valueThree, setValueThree] = useState('');
    const navigate = useNavigate();

    const handleChangeOne = event => {
        setValueOne(event.target.value);
    };

    const handleChangeTwo = event => {
        setValueTwo(event.target.value);
    };

    const handleChangeThree = event => {
        setValueThree(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        // ---------------- Add post request

        console.log('Submitted with value:', valueOne, valueTwo, valueThree);
        navigate('/survey_management'); 
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
                    <textarea className={styles.input_question_text} value={valueOne} onChange={handleChangeOne} placeholder="Enter the question text here" row={4} colume={50}/>

                    {/* Enter max and min rate representation */}
                    <div className={styles.rate_representation}>
                        <div className={styles.survey_manage_question_instruction}>Minimum rate representing</div>
                        <input className={styles.input_rate_representation}  type="text" value={valueTwo} onChange={handleChangeTwo} placeholder="Min"/>
                    </div>

                    <div className={styles.rate_representation}>
                        <div className={styles.survey_manage_question_instruction}>Maximum rate representing</div>
                        <input className={styles.input_rate_representation}  type="text" value={valueThree} onChange={handleChangeThree} placeholder="Max"/>
                    </div>

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
export default SurveyRating;