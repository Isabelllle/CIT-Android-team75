// Sub page of data review - Summary
// Admin and manager can view data summary in this page

// Import library
import React from 'react';

// Import CSS
import styles from '../../stylesheets/data_review.module.css'

const DataReviewSummary = () =>{

    //  // Data Variable
    //  const [data, setData] =  useState([
    //     { question_id: 'Story', question_first: 'Text', topic: '12345@gmail.com', type: 'unimelb',  },
    //     { question_id: 'Wellbeing', question_first: 'Rating', topic: '23456@gmail.com', group: 'unimelb'},
    //     { question_id: 'Story', question_first: 'Drop down', topic: '34567@gmail.com', group: 'unimelb' },
    //     { question_id: 'Employability', question_first: 'Text', topic: '45678@gmail.com', group: 'Volunteering Victoria' },
    //     { question_id: 'Wellbeing', question_first: 'Number', email: '56789@gmail.com', group: 'Volunteering Victoria' },
    //     { question_id: 'Story', question_first: 'Rating', email: '67890@gmail.com', group: 'Volunteering Victoria' },
    //     { question_id: 'Story', question_first: 'Text', email: 'abcde@gmail.com', group: 'Volunteering Victoria' },
    //     { question_id: 'Wellbeing', question_first: 'Rating', email: 'bcdef@gmail.com', group: 'unimelb' },
    //     { question_id: 'Story', question_first: 'Drop down', email: 'cdefg@gmail.com', group: 'unimelb' },
    //     { question_id: 'Employability', question_first: 'Text', email: 'defga@gmail.com', group: 'unimelb' },
    //     { question_id: 'Wellbeing', question_first: 'Number', email: 'efgab@gmail.com', group: 'unimelb' },
    //     { question_id: 'Story', question_first: 'Rating', email: 'fgabc@gmail.com', group: 'Volunteer West' },
    //     { question_id: 'Story', question_first: 'Text', email: 'gabcd@gmail.com', group: 'Volunteer West' },
    // ]);

    return (
        <div id={styles.data_review_summary}>
            This is data review summary page
        </div>
    );
}
export default DataReviewSummary;
