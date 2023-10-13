// Entry page of data review
// Set up the basic layout of data review pages

// Import library
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

// Import CSS
import styles from '../../stylesheets/data_review.module.css'
//import data review summary page 
import DataReviewSummary from './data_review_summary'; 


const DataReview = () =>{

    const location = useLocation();

    const [selectedYear, setSelectedYear] = useState('');

    var selectedGroup;
    // var selectedYear;

    return (
        
        <main>
            <div className={styles.data_review}>

                {/* Heading */}
                <h1 class={styles.page_heading}>Data Review</h1>

                {/* Select Group Box */}
                <div className={styles.selected_box_container}>
                    <select id={styles.selected_box} value={selectedGroup}>
                        <option value="group1">group1</option>
                        <option value="group2">group2</option>
                        <option value="group3">group3</option>
                    </select>

                    {/* Select Year Box */}
                    <select id={styles.selected_box} value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="All">All</option>
                    </select>
                </div>

                {/* View data method page */}
                <div className={styles.method_container}>
                    <div className={styles.method_selected_box}>
                        <li>
                            <Link to="/data_review/summary" className={styles.no_underline}>
                                <div className={location.pathname.startsWith('/data_review/summary') ? styles.selectedText : styles.unselectedText}>
                                    <h2>Summary</h2>
                                    <div className={styles.line}></div>
                                </div>
                            </Link>
                        </li>

                        <li>
                            <Link to="/data_review/question" className={styles.no_underline}>
                                <div className={location.pathname.startsWith('/data_review/question') ?  styles.selectedText : styles.unselectedText}>
                                    <h2>Question</h2>
                                    <div className={styles.line}></div>
                                </div>
                            </Link>
                        </li>
                    </div>
                </div>

                <Outlet />
                <DataReviewSummary selectedYear={selectedYear} />
            </div>
        </main>
    );
}
export default DataReview;
