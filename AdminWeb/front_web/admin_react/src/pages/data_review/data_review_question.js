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

    const [selectedGroup, setSelectedGroup] = useState('All');
    const handleSelecteGroup = (event) => {
        setSelectedGroup(event.target.value);
    };



     // Data Variable
     const [data, setData] =  useState([]);

    const [groupList, setGroupList] = useState([]);
    const [yearList, setYearList] = useState([]);

    useEffect(() => {
        // get group data from back end
        fetch('https://weconnect-admin-06193c688dcf.herokuapp.com/api/getGroups', {
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
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

// get corresponding year
    useEffect(() => {
    // get group data from back end
    fetch('https://weconnect-admin-06193c688dcf.herokuapp.com/api/getYear', {
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
        fetch(`https://weconnect-admin-06193c688dcf.herokuapp.com/api/getQuestionsAnswer?year=${selectedYear}&group=${selectedGroup}`,{
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
