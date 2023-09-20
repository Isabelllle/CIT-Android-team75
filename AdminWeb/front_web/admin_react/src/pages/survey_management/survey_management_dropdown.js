// Sub page of survey management - Drop down box Question
// Let admin add/edit drop down box survey question
// Citation: OpenAI. (2023). ChatGPT (August 3 Version) [Large language model]. https://chat.openai.com 

// Import library
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/survey_management.module.css';

// Import Assets
import AddIcon from '../../Assets/Icon/icon_add.png'
import DeleteIcon from '../../Assets/Icon/icon_delete.png'

const SurveyDropDown = () =>{

    // Variables
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const selectedTitle = queryParams.get('selectedTitle');
    const selectedType = queryParams.get('selectedType');
    const [question, setQuestion] = useState('');
    const [items, setItems] = useState([]);
    const [addItem, setAddItem] = useState('');
    const [giveWarning, setWarning] = useState(false);

    // Handle question input
    const handleQuestion = event => {
        setQuestion(event.target.value);
    };

    // Handle drop down list input
    const handleItem = (item) => {
        setAddItem(item.target.value);
    };
    
    const handleAddItem = () => {
        if (addItem.trim() !== '') {
            setItems([...items, addItem]);
            setAddItem('');
        }
    };

    const handleDeleteItem = (delete_item) => {
        const updatedItems = items.filter((_, i) => i !== delete_item);
        setItems(updatedItems);
    };

    // Submit survey question information
    const handleSubmit = event => {
        event.preventDefault();

        if (question !== '' && items !== null) {
            // ---------------- Add post request (selectedTitle, selectedType, question)

            console.log('Submitted with value:', selectedTitle, selectedType, question, items);
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

            <div id={styles.survey_drop_down}>

                <h2 className={styles.survey_manage_instruction}>Drop Down Box</h2>

                {/* Container in the middle */}
                <div className={styles.question_container}>

                    {/* Enter Question box */}
                    <div className={styles.survey_manage_question_instruction}>Question</div>

                    {/* Enter question text in the input box */}
                    <textarea className={styles.input_question_text} value={question} onChange={handleQuestion} onBlur={handleQuestion} placeholder="Enter the question text here" rows={4} cols={50}/>

                    {/* Edit the drop down choices */}
                    <div className={styles.input_drop_down}>
                        <div className={styles.survey_manage_question_instruction}>Drow Down Menu</div>
                        <ul className={styles.drop_down_list}>
                            {items.map((item, delete_item) => (
                                <li className={styles.item_box} key={delete_item}>
                                    <div className={styles.each_item}>{item}</div>
                                    <button onClick={() => handleDeleteItem(delete_item)}>
                                        <img src={DeleteIcon} alt="Delete item" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        
                        <div className={styles.add_item_box}>
                            <input className={styles.input_add_item} type="text" value={addItem} onChange={handleItem} placeholder="Enter item"/>
                            <button onClick={handleAddItem}>
                                <img src={AddIcon} alt="Add item" />
                            </button>
                        </div>
                    </div>

                    {/* Buttons down the bottom */}
                    <div className={styles.button_container}>
                        <Link to="/survey_management/type" className={styles.no_underline}>
                            <button className={styles.button}>Cancel</button>
                        </Link>

                        {/* Give user a reminder if none of the text is entered */}
                        {giveWarning && <div className={styles.warning}>Please fill in all the info before submit.</div>}

                        <button type="submit" onClick={handleSubmit} className={styles.button}>Submit</button>
                    </div>
                
                </div>

            </div>

        </div>
    );
}
export default SurveyDropDown;