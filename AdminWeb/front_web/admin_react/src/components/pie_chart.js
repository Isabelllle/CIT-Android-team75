// Pie chart component for data review summary

// Import library
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Import css file
import styles from '../stylesheets/data_review.module.css'

const PieChart = ({data}) =>{
    const chartRef_one = useRef(null);
    const chartInstance_one = useRef(null);
    const chartRef_two = useRef(null);
    const chartInstance_two = useRef(null);

    useEffect(() => {
        const labels_one = [];
        const nums_one = {};
        const labels_two = [];
        const nums_two = {};

        if (chartInstance_one.current) {
            chartInstance_one.current.destroy();
        } 
        
        if (chartInstance_two.current) {
            chartInstance_two.current.destroy();
        }

        data.forEach(item => {
            const choice_one = item.yes_or_no_one.toString();
            labels_one.push(choice_one);
            nums_one[choice_one] = (nums_one[choice_one] || 0) + 1;

            const choice_two = item.yes_or_no_two.toString();
            labels_two.push(choice_two);
            nums_two[choice_two] = (nums_two[choice_two] || 0) + 1;
        });

        const chartData_one = {
            labels: Object.keys(nums_one),
            datasets: [{
            data: Object.values(nums_one),
            backgroundColor: ['rgba(255, 200, 221, 0.5)', 'rgba(189, 224, 254, 0.5)'],
            borderWidth: 1,
            }],
        };

        const chartData_two = {
            labels: Object.keys(nums_two),
            datasets: [{
            data: Object.values(nums_two),
            backgroundColor: ['rgba(255, 200, 221, 0.5)', 'rgba(189, 224, 254, 0.5)'],
            borderWidth: 1,
            }],
        };

        const chartOptionsOne = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'First Survey Response'
              }
            }
        };

        const chartOptionsTwo = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Second Survey Response'
              }
            }
        };

        const ctx_one = chartRef_one.current.getContext('2d');
        chartInstance_one.current = new Chart(ctx_one, {
            type: 'pie',
            data: chartData_one,
            options: chartOptionsOne,
        });

        const ctx_two = chartRef_two.current.getContext('2d');
        chartInstance_two.current = new Chart(ctx_two, {
            type: 'pie',
            data: chartData_two,
            options: chartOptionsTwo,
        });
    }, [data]);

    return (
        <div className={styles.pie_chart_container}>
            <canvas className={styles.pie_chart} ref={chartRef_one} />
            <canvas className={styles.pie_chart} ref={chartRef_two} />
        </div>
    );
}

export default PieChart;