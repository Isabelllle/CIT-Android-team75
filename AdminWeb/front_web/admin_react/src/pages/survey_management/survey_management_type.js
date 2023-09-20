// Sub page of survey management - Choose Type
// Let admin choose the type for new survey question

// Import library
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css'

// Import Assets
import TextIcon from '../../Assets/Icon/text.png'
import NumberIcon from '../../Assets/Icon/number.png'
import YesNoIcon from '../../Assets/Icon/yes_or_no.png'
import RatingIcon from '../../Assets/Icon/rating.png'
import DropDownIcon from '../../Assets/Icon/drop_down.png'

const SurveyType = () =>{

    // Selection functions
    const [selectedType, setSelectedType] = useState(null);
    const [giveWarning, setWarning] = useState(false);
    const navigate = useNavigate();

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const handleNextClick = () => {
        if (selectedType !== null) {

            // Navigate to different pages according to user selection
            switch (selectedType) {
                case 1:
                  navigate('/survey_management/text');
                  break;
                case 2:
                  navigate('/survey_management/number');
                  break;
                case 3:
                  navigate('/survey_management/yesno');
                  break;
                case 4:
                  navigate('/survey_management/rating');
                  break;
                case 5:
                  navigate('/survey_management/rating');
                  break;
                case 6:
                  navigate('/survey_management/dropdown');
                  break;
                default:
                  break;
            }
        } else {
            setWarning(true);
        }
    };

    return (
        <div>
            <h3 className={styles.sub_heading}>Add New Survey Question</h3>

            {/* {Line} */}
            <div className={styles.line}></div>

            <div id={styles.survey_type}>

                <h2>Choose the type of question you want to add</h2>

                {/* Container in the middle */}
                <div className={styles.container}>

                    {/* First Row */}
                    <div className={styles.row_box}>
                        <button className={selectedType === 1 ? styles.selectedButton : styles.button_box}  onClick={() => handleTypeSelect(1)}>
                            <img src={TextIcon} alt="Text" />
                            <h4>Text</h4>
                        </button>

                        <button className={selectedType === 2 ? styles.selectedButton : styles.button_box} onClick={() => handleTypeSelect(2)}>
                            <img src={NumberIcon} alt="Number" />
                            <h4>Number</h4>
                        </button>

                        <button className={selectedType === 3 ? styles.selectedButton : styles.button_box} onClick={() => handleTypeSelect(3)}>
                            <img src={YesNoIcon} alt="Yes/No" />
                            <h4>Yes/No</h4>
                        </button>
                    </div>

                    {/* Second Row */}
                    <div className={styles.row_box}>
                        <button className={selectedType === 4 ? styles.selectedButton : styles.button_box} onClick={() => handleTypeSelect(4)}>
                            <img src={RatingIcon} alt="Rating 1-5" />
                            <h4>Rating 1-5</h4>
                        </button>

                        <button className={selectedType === 5 ? styles.selectedButton : styles.button_box} onClick={() => handleTypeSelect(5)}>
                            <img src={RatingIcon} alt="Rating 1-10" />
                            <h4>Rating 1-10</h4>
                        </button>

                        <button className={selectedType === 6 ? styles.selectedButton : styles.button_box} onClick={() => handleTypeSelect(6)}>
                            <img src={DropDownIcon} alt="Drop Down Box" />
                            <h4>Drop Down Box</h4>
                        </button>
                    </div>
                </div>

                {/* Buttons down the bottom */}
                <div className={styles.button_container}>
                    <Link to="/survey_management/title" className={styles.no_underline}>
                        <button className={styles.button}>Back</button>
                    </Link>

                    <button onClick={handleNextClick} className={styles.button}>Next</button>
                </div>

                {/* Give user a reminder if none of the option is selected */}
                {giveWarning && <div className={styles.warning}>Please select an option before proceeding.</div>}
            </div>

        </div>
    );
}
export default SurveyType;
