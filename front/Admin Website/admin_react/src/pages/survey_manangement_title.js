// Sub page of survey management - Choose Title
// Let admin choose the title for new survey question

// Import library
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import CSS
import styles from '../stylesheets/survey_management.module.css'

// Import Assets
import StoryIcon from '../Assets/Icon/story.png'
import WellbeingIcon from '../Assets/Icon/wellbeing.png'
import EmployabilityIcon from '../Assets/Icon/employability.png'
import VolunteerConfidenceIcon from '../Assets/Icon/volunteer_confidence.png'
import DemographicQuestionsIcon from '../Assets/Icon/demographic_questions.png'
import ServiceIcon from '../Assets/Icon/service.png'

const SurveyTitle = () =>{
    const [selectedTitle, setSelectedTitle] = useState(null);

    const handleTitleSelect = (title) => {
        setSelectedTitle(title);
    };

    return (
        <div>
            <h3 className={styles.sub_heading}>Add New Survey Question</h3>

            {/* {Line} */}
            <div className={styles.line}></div>

            <div id={styles.survey_title}>

                <h2>Choose the topic of question you want to add</h2>

                {/* Container in the middle */}
                <div className={styles.container}>

                    {/* First Row */}
                    <div className={styles.row_box}>
                        <button className={selectedTitle === 1 ? styles.selectedButton : styles.button_box}  onClick={() => handleTitleSelect(1)}>
                            <img src={StoryIcon} alt="Story" />
                            <h4>Story</h4>
                        </button>

                        <button className={selectedTitle === 2 ? styles.selectedButton : styles.button_box} onClick={() => handleTitleSelect(2)}>
                            <img src={WellbeingIcon} alt="Wellbeing" />
                            <h4>Wellbeing</h4>
                        </button>

                        <button className={selectedTitle === 3 ? styles.selectedButton : styles.button_box} onClick={() => handleTitleSelect(3)}>
                            <img src={EmployabilityIcon} alt="Employability" />
                            <h4>Employability</h4>
                        </button>
                    </div>

                    {/* Second Row */}
                    <div className={styles.row_box}>
                        <button className={selectedTitle === 4 ? styles.selectedButton : styles.button_box} onClick={() => handleTitleSelect(4)}>
                            <img src={VolunteerConfidenceIcon} alt="Volunteer Confidence" />
                            <h4>Volunteer Confidence</h4>
                        </button>

                        <button className={selectedTitle === 5 ? styles.selectedButton : styles.button_box} onClick={() => handleTitleSelect(5)}>
                            <img src={DemographicQuestionsIcon} alt="Demographic Questions" />
                            <h4>Demographic Questions</h4>
                        </button>

                        <button className={selectedTitle === 6 ? styles.selectedButton : styles.button_box} onClick={() => handleTitleSelect(6)}>
                            <img src={ServiceIcon} alt="Service" />
                            <h4>Service</h4>
                        </button>
                    </div>
                </div>

                {/* Buttons down the bottom */}
                <div className={styles.button_container}>
                    <Link to="/survey_management" className={styles.no_underline}>
                        <button className={styles.button}>Back</button>
                    </Link>

                    <Link to="/survey_management/type" className={styles.no_underline}>
                        <button className={styles.button}>Next</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
export default SurveyTitle;
