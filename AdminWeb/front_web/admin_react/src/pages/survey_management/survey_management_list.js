// Sub page of survey management - Survey Question list
// Let admin see all the survey question and able to edit/delete questions

// Import library
import React from 'react';
import { Link } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css';

// Import Component
import QuestionTable from '../../components/survey_question_table'

const SurveyList = () =>{
    return (
        <div>
            <h3 className={styles.sub_heading}>Edit Exist Survey Question</h3>

            {/* {Line} */}
            <div className={styles.line}></div>

            <div id={styles.survey_list}>
                {/* Back to main page button */}
                <Link to="/survey_management" className={styles.no_underline}>
                    <button className={styles.button}>Back</button>
                </Link>

                <QuestionTable />
            </div>

        </div>
    );
}
export default SurveyList;
