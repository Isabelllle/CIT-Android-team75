// Sub page of data review - Question
// Admin and manager can view data by question in this page

// Import library
import React, { useState, useEffect } from 'react';

// Import CSS
import styles from '../../stylesheets/data_review.module.css'

// Import Component
import RatingTable from '../../components/rating_table';
import TextTable from '../../components/text_table';
import DropDownTable from '../../components/dropdown_table';
import YesNoTable from '../../components/yesno_table';
import NumberTable from '../../components/number_table';

const token = localStorage.getItem('token');

const DataReviewSummary = () =>{

    const [selectedYear, setSelectedYear] = useState('All');
    const handleSelectedYear = (event) => {
        setSelectedYear(event.target.value);
    };

    const [selectedGroup, setSelectedGroup] = useState('group 1');
    const handleSelecteGroup = (event) => {
        setSelectedGroup(event.target.value);
    };



     // Data Variable
     const [data, setData] =  useState([
        // { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'35', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'24', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'18', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'1', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'0', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'2', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'true', yes_or_no_two:'true', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'true', yes_or_no_two:'true', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-2', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Supervious', text_two:'Supervious', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Vet', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'false', yes_or_no_two:'false', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'true', yes_or_no_two:'false', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'3', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'0', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'3', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03'},
        // { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Italian', dropdown_text_two:'Chinese', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'English', dropdown_text_two:'English', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'English', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
        // { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'English', dropdown_text_two:'English', volun_first_name:'Apple', volun_last_name:'banana', group:'Unimelb', time:'2023-03' },
    ]);

    const [groupList, setGroupList] = useState([]);
    const [yearList, setYearList] = useState([]);

    useEffect(() => {
        // get group data from back end
        fetch('http://localhost:3001/api/getGroups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        }) 
        .then(response => response.json())
        .then(data => {
            const newGroupList = data.map(group => group);
            setGroupList(newGroupList); 
            console.log('new group list data_review_questions',newGroupList);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

// get corresponding year
    useEffect(() => {
    // get group data from back end
    fetch('http://localhost:3001/api/getYear', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
            },
        }) 
        .then(response => response.json())
        .then(data => {
            const newYearList = data.map(group => group);
            setYearList(newYearList); 
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    

    useEffect(() => {
        setData([]);
        fetch(`http://localhost:3001/api/getQuestionsAnswer?year=${selectedYear}&group=${selectedGroup}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data !== null && data !== undefined) {
                    setData(data);
                    console.log(data);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [selectedYear, selectedGroup]);
    

    // Apply different table to different data type of question
    const tableTypeMap = {
        'Rating scales 1-5': RatingTable, 
        'Rating scales 1-10': RatingTable, 
        'Number': NumberTable,
        'dropdown': DropDownTable,
        'Y/N': YesNoTable,
        'Text': TextTable
    };

    const determineTableComponent = (question) => {
        const tableType = tableTypeMap[question.type];
        return tableType ? tableType : RatingTable;  
    };
    
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.question_id]) {
            acc[item.question_id] = [];
        }
        acc[item.question_id].push(item);
        return acc;
    }, {});


    return (
        <div id={styles.data_review_question}>

            <div className={styles.selected_box_container}>
                <select id={styles.selected_box} value={selectedGroup} onChange={handleSelecteGroup}>
                    {groupList.map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                    <option value="All">All</option>
                </select>

                {/* Select Year Box */}
                <select id={styles.selected_box} value={selectedYear} onChange={handleSelectedYear}>
                    {yearList.map(extract => (
                        <option key={extract} value={extract}>{extract}</option>
                    ))}
                    <option value="All">All</option>
                </select>
            </div>

            {/* Render chart components based on data type */}
            <div className={styles.data_container} key={data}>
                {Object.keys(groupedData).sort().map(questionId => {
                    const questionData = groupedData[questionId];
                    const TableComponent = determineTableComponent(questionData[0]);
                    return (
                        <div className={styles.chart_container}>
                            <div className={styles.topic}>
                                <h2>{questionData[0].topic}</h2>
                            </div>

                            <div className={styles.question}>
                                <h4>{questionData[0].question_first}</h4>
                            </div>

                            <div className={styles.each_chart}>
                                <TableComponent key={questionId} data={questionData} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default DataReviewSummary;
