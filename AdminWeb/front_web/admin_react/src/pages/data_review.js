// Import library
import React, { useState, useEffect } from 'react';

const DataReview = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/getAnswerData')
            .then(response => response.json())
            .then(data => setTableData(data))
            .catch(error => console.error('Error:', error));
    }, []); 
    
    console.log(tableData);
    
    return (
        <main>
            This is a data_review page!
        </main>
    );
}

export default DataReview;
