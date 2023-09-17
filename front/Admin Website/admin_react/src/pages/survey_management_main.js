// Sub page of survey management - Main
// Let admin choose to add or exist survey question

// Import library
import React from 'react'
import { Link } from 'react-router-dom';

// Import CSS
import styles from '../stylesheets/survey_management.module.css'

// Import Assets
import AddImg from '../Assets/Image/add_new_survey.png'
import EditImg from '../Assets/Image/edit_exist_survey.png'

const survey_main = () =>{
    return (

        <div>
            <div class={styles.space}></div>

            {/* {Line} */}
            <div class={styles.line}></div>

            <div id={styles.survey_main}>

                {/* Container in the middle */}
                <div className={styles.container}>
                    <Link to="/survey_management/title" className={styles.no_underline}>
                        <div className={styles.innerbox}>
                            <img src={AddImg} alt="Add question" />
                            <h2 >Add New Survey Question</h2>
                        </div>
                    </Link>

                    <Link to="/survey_management/list" className={styles.no_underline}>
                        <div className={styles.innerbox}>
                            <img src={EditImg} alt="Edit question" />
                            <h2>Edit Exist Survey Question</h2>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
        
    );
}
export default survey_main;