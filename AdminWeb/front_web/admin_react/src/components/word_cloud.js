// Word Cloud component for data review summary

// Import library
import React from 'react';
import { TagCloud } from 'react-tagcloud';

// Import CSS
import styles from '../stylesheets/data_review.module.css';

const WordCloudComponent = ({ data }) => {

    const textOneArray = data.map(item => item.text_one);
        const textTwoArray = data.map(item => item.text_two);
        // console.log('textOneArray:', textOneArray);
        // console.log('textTwoArray:', textTwoArray);

        const textFrequencyOne = {};
        const textFrequencyTwo = {};

        textOneArray.forEach(item => {
            if (item) {
                textFrequencyOne[item] = (textFrequencyOne[item] || 0) + 1;
            }
        });

        textTwoArray.forEach(item => {
            if (item) {
                textFrequencyTwo[item] = (textFrequencyTwo[item] || 0) + 1;
            }
        });

        // console.log('textFrequencyOne:', textFrequencyOne);
        // console.log('textFrequencyTwo:', textFrequencyTwo);

        const formattedDataOne = Object.keys(textFrequencyOne).map(key => ({
            value: key,
            count: textFrequencyOne[key]
        }));

        const formattedDataTwo = Object.keys(textFrequencyTwo).map(key => ({
            value: key,
            count: textFrequencyTwo[key]
        }));

    return (
        <div className={styles.word_cloud_container}>
            <TagCloud minSize={10} maxSize={40} tags={formattedDataOne} className={styles.word_cloud} />
            <TagCloud minSize={10} maxSize={40} tags={formattedDataTwo} className={styles.word_cloud} />
        </div>
    );
};

export default WordCloudComponent;

