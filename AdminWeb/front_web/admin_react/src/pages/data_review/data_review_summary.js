// Sub page of data review - Summary
// Admin and manager can view data summary in this page

// Import library
import React, { useState, useEffect } from 'react';

// Import CSS
import styles from '../../stylesheets/data_review.module.css'

// Import Component
import BarChart from '../../components/bar_chart';
import LineGraph from '../../components/line_graph';
import HorizontalBar from '../../components/horizontal_bar';
import PieChart from '../../components/pie_chart';
import WordCloudComponent from '../../components/word_cloud';

const DataReviewSummary = () =>{

     // Data Variable
     const [data, setData] =  useState([
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'35', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'24', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '2', question_first: 'How many hours do you volunteer?', topic: 'Story', rate_min: '', rate_max: '', type: 'Number', text_one: '', text_two:'', number:'18', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'1', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'0', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'2', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'true', yes_or_no_two:'true', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'true', yes_or_no_two:'true', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '3', question_first: 'How would you rate your wellbeing status?', topic: 'Wellbeing', rate_min: 'Terrible', rate_max: 'Fantastic', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-2', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Supervious', text_two:'Supervious', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Vet', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'false', yes_or_no_two:'false', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '4', question_first: 'Are you looking to change your work in some ways at some point?', topic: 'Employability', rate_min: '', rate_max: '', type: 'Y/N', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'true', yes_or_no_two:'false', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'3', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'0', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'3', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:''},
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '5', question_first: 'How often do you practice 5 ways of wellbeing? - Connect', topic: 'Wellbeing', rate_min: 'Never', rate_max: 'Always', type: 'Rating scales 1-5', text_one: '', text_two:'', number:'', rating:'-1', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Italian', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'English', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'English', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Japanese', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Japanese', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'English', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Japanese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'German', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Japanese', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Italian', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Japanese', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Japanese', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Polish', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Japanese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Chinese', dropdown_text_two:'Chinese' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Polish', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Japanese', dropdown_text_two:'English' },
        { question_id: '6', question_first: 'What lanague do you spoke at home?', topic: 'Demographic Questions', rate_min: '', rate_max: '', type: 'dropdown', text_one: '', text_two:'', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'Italian', dropdown_text_two:'English' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Police', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Libarian', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'6u7hj', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'jyr6u', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Public Health', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'dfgs', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Libarian', text_two:'thghe5', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'ert4', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'serg', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Forstry', text_two:'rtt', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'srf', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Finance', text_two:'grergs', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Road Repairing', text_two:'fghrth', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Public Health', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Libarian', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Nursing', text_two:'hghf', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Libarian', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Forstry', text_two:'hfbfgnfg', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Forstry', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'bcd', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'cde Repairing', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'def Health', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'efg', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'fga', text_two:'wg4t4t', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'fga', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'fga', text_two:'wrggg', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'wrgr', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'fgs', text_two:'wrg', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'wrtg', text_two:'wgwrg', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'bcd', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'cde aff', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'def fafa', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'sgfg', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'gsg', text_two:'wrgw', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'srgs', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'srgs', text_two:'w4ttr', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'sregsr', text_two:'rg', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'aef', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'wregw', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'gwrg', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'rgwrg', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'cde aff', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'def fafa', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'Tutor', text_two:'wrg', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'wrgfgs', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'Nursing', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'dfe', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'Tutor', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
        { question_id: '1', question_first: 'What was your role?', topic: 'Story', rate_min: '', rate_max: '', type: 'Text', text_one: 'abc', text_two:'abc', number:'', rating:'', yes_or_no_one:'', yes_or_no_two:'', dropdown_text_one:'', dropdown_text_two:'' },
    ]);

    // Apply different chart to different data type of question
    const chartTypeMap = {
        'Rating scales 1-5': BarChart, 
        'Rating scales 1-10': BarChart, 
        'Number': LineGraph,
        'dropdown': HorizontalBar,
        'Y/N': PieChart,
        'Text': WordCloudComponent
    };

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

    return (
        <div id={styles.data_review_summary}>

            {/* Render chart components based on data type */}
            <div>
                {Object.keys(groupedData).sort().map(questionId => {
                    const questionData = groupedData[questionId];
                    const ChartComponent = determineChartComponent(questionData[0]);
                    return (
                        <div className={styles.chart_container}>
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
                })}
            </div>
        </div>
    );
}
export default DataReviewSummary;
