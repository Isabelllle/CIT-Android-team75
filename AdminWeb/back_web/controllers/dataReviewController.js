/**
 * <Description> This is the controller about reminder lists' functions
 * @author {YIJUN GUO}
 * @version 1.0
 * @date {2023}/{Oct}/{3}
 * 
 */

// PostgreSQL client from PostgreSQL library.
const { client } = require('../db'); 

/**
 * GET /api/getAnswerData
 * Search reminder lists of all volunteers from database
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

const getAnswerList = (req, res) => {
    const selectedYear = req.query.year;
    // console.log(selectedYear);

    if (selectedYear && (/^\d{4}$/.test(selectedYear))) {
        const checkYearQuery = `
            SELECT COUNT(*) AS count 
            FROM responses r2 
            WHERE EXTRACT(year FROM r2.sub_time) = ${selectedYear}
        `;

        client.query(checkYearQuery, (checkError, checkResults) => {
            if (checkError) {
                throw checkError;
            }
            if (checkResults.rows[0].count > 0) {
                executeQuery(selectedYear, res);
            } else {
                // console.log('there is no teat');
                res.json([]);
            }
        });
    } else {
        executeQuery(selectedYear, res);
    }
};

function executeQuery(selectedYear, res) {

    let query = `
    SELECT 
        r1.response_id as response_id_1,
        r1.question_id as question_id_1,
        r1.vol_email as vol_email,
        r1.first_response as first_response_1,
        r1.text as text_1,
        r1.number as number_1,
        r1.rating as rating_1,
        r1.yes_or_no as yes_or_no_1,
        r1.dropdown_id as dropdown_id_1,
        r2.response_id as response_id_2,
        r2.question_id as question_id_2,
        r2.first_response as first_response_2,
        r2.text as text_2,
        r2.number as number_2,
        r2.rating as rating_2,
        r2.yes_or_no as yes_or_no_2,
        r2.dropdown_id as dropdown_id_2,
        r2.sub_time,
        d1.option_value as dropdown_text_one,
        d2.option_value as dropdown_text_two,
        q.question_first,
        q.topic,
        q.type,
        q.rate_min,
        q.rate_max
    FROM 
        responses r1
    JOIN 
        responses r2 ON r1.vol_email = r2.vol_email AND r1.question_id = r2.question_id
    JOIN 
        questions q ON r1.question_id = q.id
    LEFT JOIN 
        dropdown_options d1 ON r1.dropdown_id = d1.option_id
    LEFT JOIN 
        dropdown_options d2 ON r2.dropdown_id = d2.option_id
    WHERE
        r1.first_response = true AND r2.first_response = false
    `;

    if (selectedYear && (/^\d{4}$/.test(selectedYear))) {
        query += ` AND EXTRACT(year FROM r2.sub_time) = ${selectedYear}`;
    }

    client.query(query, (error, results) => {
        if (error) {
            throw error;
        }

        const processedResults = results.rows.map(row => {
            return {
                question_id: row.question_id_1,
                question_first: row.question_first,
                topic: row.topic,
                rate_min: row.rate_min,
                rate_max: row.rate_max,
                type: row.type,
                text_one: row.text_1,
                text_two: row.text_2,
                number: row.number_2 - row.number_1,
                rating: row.rating_2 - row.rating_1,
                yes_or_no_one: row.yes_or_no_1,
                yes_or_no_two: row.yes_or_no_2,
                dropdown_text_one: row.dropdown_text_one,
                dropdown_text_two: row.dropdown_text_two,
            };
        });
        res.json(processedResults);
    });
}

// const getAnswerList = (req, res) => {
//     const selectedYear = req.query.year;
//     console.log(selectedYear);

//     let query = `
//     SELECT 
//         r1.response_id as response_id_1,
//         r1.question_id as question_id_1,
//         r1.vol_email as vol_email,
//         r1.first_response as first_response_1,
//         r1.text as text_1,
//         r1.number as number_1,
//         r1.rating as rating_1,
//         r1.yes_or_no as yes_or_no_1,
//         r1.dropdown_id as dropdown_id_1,
//         r2.response_id as response_id_2,
//         r2.question_id as question_id_2,
//         r2.first_response as first_response_2,
//         r2.text as text_2,
//         r2.number as number_2,
//         r2.rating as rating_2,
//         r2.yes_or_no as yes_or_no_2,
//         r2.dropdown_id as dropdown_id_2,
//         r2.sub_time,
//         d1.option_value as dropdown_text_one,
//         d2.option_value as dropdown_text_two,
//         q.question_first,
//         q.topic,
//         q.type,
//         q.rate_min,
//         q.rate_max
//     FROM 
//         responses r1
//     JOIN 
//         responses r2 ON r1.vol_email = r2.vol_email AND r1.question_id = r2.question_id
//     JOIN 
//         questions q ON r1.question_id = q.id
//     LEFT JOIN 
//         dropdown_options d1 ON r1.dropdown_id = d1.option_id
//     LEFT JOIN 
//         dropdown_options d2 ON r2.dropdown_id = d2.option_id
//     WHERE
//         r1.first_response = true AND r2.first_response = false
//     `;
    
//     if (selectedYear && selectedYear !== 'undefined' && selectedYear !== 'All') {
//         const checkYearQuery = `
//             SELECT COUNT(*) AS count 
//             FROM responses r2 
//             WHERE EXTRACT(year FROM r2.sub_time) = ${selectedYear}
//         `;

//         client.query(checkYearQuery, (checkError, checkResults) => {
//             if (checkError) {
//                 throw checkError;
//             }
//             if (checkResults.rows[0].count > 0) {
//                 // if there exist the teat
//                 query += ` AND EXTRACT(year FROM r2.sub_time) = ${selectedYear}`;

//                 client.query(query, (error, results) => {
//                     if (error) {
//                         throw error;
//                     }
              
//                     // Process the results here
//                     const processedResults = results.rows.map(row => {
//                         return {
//                             question_id: row.question_id_1,
//                             question_first: row.question_first,
//                             topic: row.topic,
//                             rate_min: row.rate_min,
//                             rate_max: row.rate_max,
//                             type: row.type,
//                             text_one: row.text_1,
//                             text_two: row.text_2,
//                             number: row.number_2 - row.number_1,
//                             rating: row.rating_2 - row.rating_1,
//                             yes_or_no_one: row.yes_or_no_1,
//                             yes_or_no_two: row.yes_or_no_2,
//                             dropdown_text_one: row.dropdown_text_one,
//                             dropdown_text_two: row.dropdown_text_two,
//                         };
//                     });
//                   res.json(processedResults);
//                 });

//             } else {
//                 // if(selectedYear === 'All'){

//                 //     client.query(query, (error, results) => {
//                 //         if (error) {
//                 //             throw error;
//                 //         }
                  
//                 //         // Process the results here
//                 //         const processedResults = results.rows.map(row => {
//                 //             return {
//                 //                 question_id: row.question_id_1,
//                 //                 question_first: row.question_first,
//                 //                 topic: row.topic,
//                 //                 rate_min: row.rate_min,
//                 //                 rate_max: row.rate_max,
//                 //                 type: row.type,
//                 //                 text_one: row.text_1,
//                 //                 text_two: row.text_2,
//                 //                 number: row.number_2 - row.number_1,
//                 //                 rating: row.rating_2 - row.rating_1,
//                 //                 yes_or_no_one: row.yes_or_no_1,
//                 //                 yes_or_no_two: row.yes_or_no_2,
//                 //                 dropdown_text_one: row.dropdown_text_one,
//                 //                 dropdown_text_two: row.dropdown_text_two,
//                 //             };
//                 //         });
//                 //       res.json(processedResults);
//                 //     });

//                 // }else{
//                     // if the year does not exist
//                     res.json([]);
//                 // }
//             }
//         });
//     } else{
//         // when selectedYear = All/undefined
//         client.query(query, (error, results) => {
//         if (error) {
//             throw error;
//         }
  
//         // Process the results here
//         const processedResults = results.rows.map(row => {
//             return {
//                 question_id: row.question_id_1,
//                 question_first: row.question_first,
//                 topic: row.topic,
//                 rate_min: row.rate_min,
//                 rate_max: row.rate_max,
//                 type: row.type,
//                 text_one: row.text_1,
//                 text_two: row.text_2,
//                 number: row.number_2 - row.number_1,
//                 rating: row.rating_2 - row.rating_1,
//                 yes_or_no_one: row.yes_or_no_1,
//                 yes_or_no_two: row.yes_or_no_2,
//                 dropdown_text_one: row.dropdown_text_one,
//                 dropdown_text_two: row.dropdown_text_two,
//             };
//         });
//       res.json(processedResults);
//     });

//     }
  
//     // client.query(query, (error, results) => {
//     //     if (error) {
//     //         throw error;
//     //     }
  
//     //     // Process the results here
//     //     const processedResults = results.rows.map(row => {
//     //         return {
//     //             question_id: row.question_id_1,
//     //             question_first: row.question_first,
//     //             topic: row.topic,
//     //             rate_min: row.rate_min,
//     //             rate_max: row.rate_max,
//     //             type: row.type,
//     //             text_one: row.text_1,
//     //             text_two: row.text_2,
//     //             number: row.number_2 - row.number_1,
//     //             rating: row.rating_2 - row.rating_1,
//     //             yes_or_no_one: row.yes_or_no_1,
//     //             yes_or_no_two: row.yes_or_no_2,
//     //             dropdown_text_one: row.dropdown_text_one,
//     //             dropdown_text_two: row.dropdown_text_two,
//     //         };
//     //     });
//     //   res.json(processedResults);
//     // });
// };
  
module.exports = {
    getAnswerList,
};