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

    return (
        
        <main>
            <div className={styles.data_review}>

                {/* Heading */}
                <h1 class={styles.page_heading}>Data Review</h1>

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
            </div>
        </main>
    );
}
export default DataReview;
