// Number table component for data review summary

// Import library
import React from 'react';

// Import css file
import styles from '../stylesheets/data_review.module.css'

const NumberTable = ({data}) =>{

    // Get the data according to data type
    const mappedTableData = data.map(item => ({
        volun_first_name: item.volun_first_name,
        volun_last_name: item.volun_last_name,
        group: item.group,
        time: item.time,
        number: item.number
    }));

    return (
        <div id={styles.number_table}>

            {/* Table header */}
            <table className={styles.header_table}>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Group</th>
                    <th>Time</th>
                    <th>Number Difference</th>
                </tr>
                </thead>
            </table>

            {/* Table Body */}
            <div className={styles.content_container}>
                <table className={styles.content_table}>
                    <tbody>
                    {mappedTableData.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.content}>{item.volun_first_name}</td>
                            <td className={styles.content}>{item.volun_last_name}</td>
                            <td className={styles.content}>{item.group}</td>
                            <td className={styles.content}>{item.time}</td>
                            <td className={styles.content}>{item.number}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default NumberTable;