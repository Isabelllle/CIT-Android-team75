// Sub page of data review - Summary
// Admin and manager can view data summary in this page

// Import library
import React, { useState, useEffect } from 'react';

// Import CSS
import styles from '../../stylesheets/data_review.module.css'

const DataReviewSummary = () =>{

     // Data Variable
     const [data, setData] =  useState([
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no:'', dropdown_text:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Tutor', number:'', rating:'', yes_or_no:'', dropdown_text:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no:'', dropdown_text:'' },
        { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'35', rating:'', yes_or_no:'', dropdown_text:'' },
        { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'24', rating:'', yes_or_no:'', dropdown_text:'' },
        { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'18', rating:'', yes_or_no:'', dropdown_text:'' },
        { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'1', yes_or_no:'', dropdown_text:'' },
        { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'0', yes_or_no:'', dropdown_text:'' },
        { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'2', yes_or_no:'', dropdown_text:'' },
        { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'true', dropdown_text:'' },
        { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: 'Fantastic', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'true', dropdown_text:'' },
        { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: '', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-2', yes_or_no:'', dropdown_text:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Supervious', text_two:'Supervious', number:'', rating:'', yes_or_no:'', dropdown_text:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Vet', text_two:'Nursing', number:'', rating:'', yes_or_no:'', dropdown_text:'' },
        { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'false', dropdown_text:'' },
        { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'true', dropdown_text:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'3', yes_or_no:'', dropdown_text:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'0', yes_or_no:'', dropdown_text:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'3', yes_or_no:'', dropdown_text:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no:'', dropdown_text:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no:'', dropdown_text:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no:'', dropdown_text:'' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'', dropdown_text:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'', dropdown_text:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'', dropdown_text:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'', dropdown_text:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'', dropdown_text:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no:'', dropdown_text:'English' },
    ]);

    return (
        <div id={styles.data_review_summary}>
            This is data review summary page
        </div>
    );
}
export default DataReviewSummary;
