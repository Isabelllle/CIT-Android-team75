// Drop Down table component for data review summary

// Import library
import React from 'react';

// Import css file
import styles from '../stylesheets/data_review.module.css'

const DropDownTable = ({data}) =>{

    // Get the data according to data type
    const mappedTableData = data.map(item => ({
        volun_first_name: item.volun_first_name,
        volun_last_name: item.volun_last_name,
        group: item.group,
        time: item.time,
        dropdown_text_one: item.dropdown_text_one,
        dropdown_text_two: item.dropdown_text_two
    }));

    return (
        <div id={styles.dropdown_table}>

            {/* Table header */}
            <table className={styles.header_table}>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Group</th>
                    <th>Time</th>
                    <th>First survey response</th>
                    <th>Second survey response</th>
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
                            <td className={styles.content}>{item.dropdown_text_one}</td>
                            <td className={styles.content}>{item.dropdown_text_two}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default DropDownTable;