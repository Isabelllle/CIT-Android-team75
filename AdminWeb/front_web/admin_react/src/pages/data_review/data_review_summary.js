// Sub page of data review - Summary
// Admin and manager can view data summary in this page

// Import library
import React, { useState, useEffect, useCallback } from 'react';

// Import CSS
import styles from '../../stylesheets/data_review.module.css'

// Import Component
import BarChart from '../../components/bar_chart';
import LineGraph from '../../components/line_graph';
import HorizontalBar from '../../components/horizontal_bar';
import PieChart from '../../components/pie_chart';
import WordCloudComponent from '../../components/word_cloud';

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
        fetch(`https://weconnect-admin-06193c688dcf.herokuapp.com/api/getAnswerData?year=${selectedYear}&group=${selectedGroup}`,{
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
                    console.log('Not Null', data);
                }
            })
            .catch(error => console.error('Error:', error));
        
    }, [selectedYear, selectedGroup]);
    
    // Apply different chart to different data type of question
    const chartTypeMap = {
        'Rating scales 1-5': BarChart, 
        'Rating scales 1-10': BarChart, 
        'Number': LineGraph,
        'dropdown': HorizontalBar,
        'Y/N': PieChart,
        'Text': WordCloudComponent
    };

    // eslint-disable-next-line
    const determineChartComponent = (question) => {
        const chartType = chartTypeMap[question.type];
        return chartType ? chartType : BarChart;  
    };
    
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.question_id]) {
            acc[item.question_id] = [];
        }
        acc[item.question_id].push(item);
        return acc;
    }, {});

    const [questionComponents, setQuestionComponents] = useState([]);

    const updateQuestionComponents = useCallback(() => {
        const updatedQuestionComponents = Object.keys(groupedData)
            .sort()
            .map(questionId => {
                const questionData = groupedData[questionId];
                const ChartComponent = determineChartComponent(questionData[0]);
                return (
                    <div className={styles.chart_container} key={questionId}>
                        <div className={styles.topic}>
                            <h2>{questionData[0].topic}</h2>
                        </div>
                        <div className={styles.question}>
                            <h4>{questionData[0].question_first}</h4>
                        </div>
                        <div className={styles.each_chart}>
                            <ChartComponent key={questionId} data={questionData} />
                        </div>
                    </div>
                );
            });
    
        setQuestionComponents(updatedQuestionComponents);
    }, [groupedData, determineChartComponent]);  

    useEffect(() => {
        updateQuestionComponents();
    // eslint-disable-next-line
    }, [data]);

    return (
        <div id={styles.data_review_summary}>

            {/* Select Group Box */}
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
                {questionComponents}
            </div>
        </div>
    );
}
export default DataReviewSummary;
