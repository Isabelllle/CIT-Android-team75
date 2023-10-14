// Bar chart component for data review summary

// Import library
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Import css file
import styles from '../stylesheets/data_review.module.css'

const BarChart = ({data}) =>{
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const labels = [];
        const nums = {};

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        data.forEach(item => {
            const rating = item.rating.toString();
            labels.push(rating);
            nums[rating] = (nums[rating] || 0) + 1;
        });

        const chartData = {
            labels: Object.keys(nums),
            datasets: [{
            label: 'Rating Difference',
            data: Object.values(nums),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            }],
        };

        const chartOptions = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Rating Difference'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of answers'
                    }
                }
            }
        };

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
        });
    }, [data]);

    return <canvas className={styles.bar_chart} ref={chartRef} />;
}

export default BarChart;