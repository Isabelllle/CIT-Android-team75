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
 * Search responses of all volunteers from database
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const getAnswerList = (req, res) => {
    const selectedYear = req.query.year;
    const selectedGroup = req.query.group;
    const email = req.email;

    client.query('SELECT is_manager FROM admin WHERE email = $1',
    [email], (error, results) => {
        if (error) {
            console.error('Error in find status of manager', error);
            return;
        }
        
        const isManager = results.rows[0].is_manager;
        if(!isManager) {
            //admin
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
                        executeQuery(selectedYear,selectedGroup, res);
                    } else {
                        res.json([]);
                    }
                });
            } else {
                executeQuery(selectedYear,selectedGroup, res);
            }
        } else {


                client.query('SELECT email FROM volunteers WHERE manager_email = $1', [email], (volunteerError, volunteerResult) => {
                if (volunteerError) {
                    console.error('Error executing query:', volunteerError);
                    res.status(500).send('Internal Server Error');
                    return;
                }
    
                const volunteerEmails = volunteerResult.rows.map(row => row.email);
                
                if (selectedYear && (/^\d{4}$/.test(selectedYear))) {
                    client.query(
                        'SELECT COUNT(*) AS count FROM responses r WHERE r.vol_email IN (SELECT unnest($1::text[])) AND EXTRACT(year FROM r.sub_time) = $2',
                        [volunteerEmails, selectedYear],
                        (error, result) => {
                            if (error) {
                                console.error('Error executing query:', error);
                                res.status(500).send('Internal Server Error');
                                return;
                            }
                            const count = result.rows[0].count;
                            if (count > 0) {
                                executeQuerys(selectedYear,selectedGroup, volunteerEmails, res);
                            } else {
                                res.json([]);
                            }
                        }
                    );
                } else {
                    executeQuerys(selectedYear,selectedGroup, volunteerEmails, res);
                }
            });
        }
    });
};

/**
 * The function needed in getAnswerList
 * according to select year to find corresponding data
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
function executeQuerys(selectedYear, selectedGroup, volunteerEmails, res) {

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
        q.rate_max,
        v.group_name
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
    LEFT JOIN 
        volunteers v ON r1.vol_email = v.email
    WHERE
        r1.first_response = true AND r2.first_response = false
    `;

    if (selectedYear && (/^\d{4}$/.test(selectedYear))) {
        query += ` AND EXTRACT(year FROM r2.sub_time) = ${selectedYear}`;
    }

    if (selectedGroup && /^[a-zA-Z0-9]+$/.test(selectedGroup) && selectedGroup != 'All') {
        query += ` AND v.group_name = '${selectedGroup}'`;
    }

    query += ` AND r1.vol_email IN (SELECT unnest($1::text[]))`;

    client.query(query,[volunteerEmails], (error, results) => {
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


/**
 * The function needed in getAnswerList
 * according to select year to find corresponding data
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
function executeQuery(selectedYear, selectedGroup, res) {
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
        q.rate_max,
        v.group_name
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
    LEFT JOIN 
        volunteers v ON r1.vol_email = v.email
    WHERE
        r1.first_response = true AND r2.first_response = false
    `;

    if (selectedYear && (/^\d{4}$/.test(selectedYear))) {
        query += ` AND EXTRACT(year FROM r2.sub_time) = ${selectedYear}`;
    }

    if (selectedGroup && /^[a-zA-Z0-9]+$/.test(selectedGroup) && selectedGroup != 'All') {
        query += ` AND v.group_name = '${selectedGroup}'`;
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


/**
 * GET /api/getAnswerData
 * Search responses of all volunteers from database
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const getQuestionsAnswer = (req, res) => {
    const selectedYear = req.query.year;
    const selectedGroup = req.query.group;
    const email = req.email;

    client.query('SELECT is_manager FROM admin WHERE email = $1',
    [email], (error, results) => {
        if (error) {
            console.error('Error in find status of manager', error);
            return;
        }
        
        const isManager = results.rows[0].is_manager;
        if(!isManager) {
            //admin
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
                        newExecuteQuery(selectedYear,selectedGroup, res);
                    } else {
                        res.json([]);
                    }
                });
            } else {
                newExecuteQuery(selectedYear,selectedGroup, res);
            }
        } else {
                client.query('SELECT email FROM volunteers WHERE manager_email = $1', [email], (volunteerError, volunteerResult) => {
                if (volunteerError) {
                    console.error('Error executing query:', volunteerError);
                    res.status(500).send('Internal Server Error');
                    return;
                }
    
                const volunteerEmails = volunteerResult.rows.map(row => row.email);
                
                if (selectedYear && (/^\d{4}$/.test(selectedYear))) {
                    client.query(
                        'SELECT COUNT(*) AS count FROM responses r WHERE r.vol_email IN (SELECT unnest($1::text[])) AND EXTRACT(year FROM r.sub_time) = $2',
                        [volunteerEmails, selectedYear],
                        (error, result) => {
                            if (error) {
                                console.error('Error executing query:', error);
                                res.status(500).send('Internal Server Error');
                                return;
                            }
                            const count = result.rows[0].count;
                            if (count > 0) {
                                newExecuteQuerys(selectedYear,selectedGroup, volunteerEmails, res);
                            } else {
                                res.json([]);
                            }
                        }
                    );
                } else {
                    newExecuteQuerys(selectedYear,selectedGroup, volunteerEmails, res);
                }
            });
        }
    });
};

/**
 * The function needed in getAnswerList
 * according to select year to find corresponding data
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

function newExecuteQuery(selectedYear,selectedGroup, res) {

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
        q.rate_max,
        v.first_name,
        v.last_name,  
        v.group_name
        

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
    LEFT JOIN 
        volunteers v ON r1.vol_email = v.email
    WHERE
        r1.first_response = true AND r2.first_response = false
    `;

    if (selectedYear && (/^\d{4}$/.test(selectedYear))) {
        query += ` AND EXTRACT(year FROM r2.sub_time) = ${selectedYear}`;
    }

    if (selectedGroup && /^[a-zA-Z0-9]+$/.test(selectedGroup) && selectedGroup != 'All') {
        query += ` AND v.group_name = '${selectedGroup}'`;
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
                volun_first_name: row.first_name,
                volun_last_name: row.last_name,
                group:row.group_name, 
                time: new Date(row.sub_time).toISOString().split('T')[0],
            };
        });
        res.json(processedResults);
    });
}


/**
 * The function needed in getAnswerList
 * according to select year to find corresponding data
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

function newExecuteQuerys(selectedYear,selectedGroup, volunteerEmails, res) {

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
        q.rate_max,
        v.first_name,
        v.last_name,  
        v.group_name
        

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
    LEFT JOIN 
        volunteers v ON r1.vol_email = v.email
    WHERE
        r1.first_response = true AND r2.first_response = false
    `;

    if (selectedYear && (/^\d{4}$/.test(selectedYear))) {
        query += ` AND EXTRACT(year FROM r2.sub_time) = ${selectedYear}`;
    }

    if (selectedGroup && /^[a-zA-Z0-9]+$/.test(selectedGroup) && selectedGroup != 'All') {
        query += ` AND v.group_name = '${selectedGroup}'`;
    }

    query += ` AND r1.vol_email IN (SELECT unnest($1::text[]))`;


    client.query(query, [volunteerEmails],(error, results) => {
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
                volun_first_name: row.first_name,
                volun_last_name: row.last_name,
                group:row.group_name, 
                time: new Date(row.sub_time).toISOString().split('T')[0],
            };
        });
        res.json(processedResults);
    });
}

module.exports = {
    getAnswerList,
    getQuestionsAnswer,
};