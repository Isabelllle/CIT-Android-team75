import React from 'react';
import React, { useState, useEffect } from 'react';

const dashboard = () =>{
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data'); // 替换为实际的API端点
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    return (
        <main>
            {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
            This is a dashboard!
        </main>
    );
}
export default dashboard;