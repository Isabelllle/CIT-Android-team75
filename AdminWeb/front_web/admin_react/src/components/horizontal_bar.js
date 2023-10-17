// Horizontal bar chart component for data review summary

// Import library
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Import css file
import styles from '../stylesheets/data_review.module.css'

const HorizontalBar = ({data}) =>{
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
            const choice_one = item.dropdown_text_one.toString();
            labels_one.push(choice_one);
            nums_one[choice_one] = (nums_one[choice_one] || 0) + 1;

            const choice_two = item.dropdown_text_two.toString();
            labels_two.push(choice_two);
            nums_two[choice_two] = (nums_two[choice_two] || 0) + 1;
        });

        const chartData_one = {
            labels: Object.keys(nums_one),
            datasets: [{
            label: 'Drop Down Choice First',
            data: Object.values(nums_one),
            backgroundColor: 'rgba(189, 224, 254, 0.5)',
            borderColor: 'rgba(162, 210, 255, 1)',
            borderWidth: 1,
            }],
        };

        const chartData_two = {
            labels: Object.keys(nums_two),
            datasets: [{
            label: 'Drop Down Choice Second',
            data: Object.values(nums_two),
            backgroundColor: 'rgba(255, 200, 221, 0.5)',
            borderColor: 'rgba(255, 175, 204, 1)',
            borderWidth: 1,
            }],
        };

        const chartOptions = {
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of answers'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Different Choices'
                    }
                }
            }
        };

        const ctx_one = chartRef_one.current.getContext('2d');
        chartInstance_one.current = new Chart(ctx_one, {
            type: 'bar',
            data: chartData_one,
            options: chartOptions,
        });

        const ctx_two = chartRef_two.current.getContext('2d');
        chartInstance_two.current = new Chart(ctx_two, {
            type: 'bar',
            data: chartData_two,
            options: chartOptions,
        });
    }, [data]);

    return (
        <div className={styles.horizontal_bar_container}>
            <canvas className={styles.horizontal_bar} ref={chartRef_one} />
            <canvas className={styles.horizontal_bar} ref={chartRef_two} />
        </div>
    );
}

export default HorizontalBar;