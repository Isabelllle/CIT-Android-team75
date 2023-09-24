/**
 * <Description>  This files handle the functions of different types of survey questions to the database.
 * @author {YIJUN GUO}
 * @version 1.0
 * @date {2023}/{Sep}/{23}
 * 
 */

// Importing the PostgreSQL client and mapping objects for titles and types.
const { client } = require('../db'); 
const { titleMap, typeMap } = require('./map');

/**
 * PUT /api/addTextQuestion
 * Insert a text-based question to the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const addTextQuestion = (req, res) => {
    const { selectedTitle, question, questionSecond } = req.body;
    const topic = titleMap.get(parseInt(selectedTitle)); // integer map the title name

    let in_second_survey;
    if(questionSecond !=  null) {
        // if the question in second survey is different to the first survery
        in_second_survey = true;
    } else{
        // if the question in second survey is same with the first survery
        in_second_survey = false;
    }

    client.query(
        'INSERT INTO questions (type, topic, question_first, in_second_survey, \
            question_second, rate_min, rate_max) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        ['Text', topic, question, in_second_survey, questionSecond, null, null],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'Question added successfully' });
        }
    );
}

/**
 * PUT /api/addYesNoQuestion
 * Insert a yes/no question to the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const addYesNoQuestion = (req, res) => {
    const { selectedTitle, question, questionSecond } = req.body;
    const topic = titleMap.get(parseInt(selectedTitle)); // integer map the title name

    let in_second_survey; 
    if(questionSecond !=  null) {
        // if the question in second survey is different to the first survery
        in_second_survey = true;
    } else{
        // if the question in second survey is same with the first survery
        in_second_survey = false;
    }

    client.query(
        'INSERT INTO questions (type, topic, question_first, in_second_survey, \
            question_second, rate_min, rate_max) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        ['Y/N', topic, question, in_second_survey, questionSecond, null, null],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'Question added successfully' });
        }
    );

}

/**
 * PUT /api/addNumQuestion
 * Insert a yes/no question to the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const addNumQuestion = (req, res) => {
    const { selectedTitle, question, questionSecond } = req.body;
    const topic = titleMap.get(parseInt(selectedTitle)); // integer map the title name

    let in_second_survey;
    if(questionSecond !=  null) {
        // if the question in second survey is different to the first survery
        in_second_survey = true;
    } else{
        // if the question in second survey is same with the first survery
        in_second_survey = false;
    }

    client.query(
        'INSERT INTO questions (type, topic, question_first, in_second_survey, \
            question_second, rate_min, rate_max) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        ['Number', topic, question, in_second_survey, questionSecond, null, null],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'Question added successfully' });
        }
    );
}


/**
 * PUT /api/addRatingQuestion
 * Adds a rating scale question to the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const addRatingQuestion = (req, res) => {
    const { selectedTitle, selectedType, question, questionSecond, rate_min, rate_max } = req.body;
    const topic = titleMap.get(parseInt(selectedTitle)); // integer map the title name
    const type = typeMap.get(parseInt(selectedType)); // integer map the type name

    let in_second_survey;
    if(questionSecond !=  null) {
        // if the question in second survey is different to the first survery
        in_second_survey = true;
    } else{
        // if the question in second survey is same with the first survery
        in_second_survey = false;
    }

    client.query(
        'INSERT INTO questions (type, topic, question_first, in_second_survey, \
            question_second, rate_min, rate_max) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [type, topic, question, in_second_survey, questionSecond, rate_min, rate_max],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.json({ success: true, message: 'Question added successfully' });
        }
    );
}

/**
 * PUT /api/addDropDownQuestion
 * Adds a dropdown selection question to the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If an error occurs while inserting the question.
 */
const addDropDownQuestion = (req, res) => {
    const { selectedTitle, question, questionSecond, items } = req.body;

    const topic = titleMap.get(parseInt(selectedTitle));

    let in_second_survey;


    if(questionSecond !=  null) {
        // if the question in second survey is different to the first survery
        in_second_survey = true;
    } else{
         // if the question in second survey is same with the first survery
        in_second_survey = false;
    }

    // insert text of question into question table
    client.query(
        'INSERT INTO questions (type, topic, question_first, in_second_survey, \
            question_second, rate_min, rate_max) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        ['dropdown', topic, question, in_second_survey, questionSecond, null, null],
        (error, results) => {
            if (error) {
                throw error;
            }

            //get question id to insert it in dropdown_options table
            client.query(
                'SELECT id FROM questions ORDER BY id DESC LIMIT 1',
                (error2, results2) => {
                    if (error) {
                        throw error;
                    }
                    const questionId = results2.rows[0].id;
                    for (const item of items) { 
                        // insert options in dropdown_options table
                        client.query(
                            'INSERT INTO dropdown_options (question_id, option_value) VALUES ($1, $2)',
                            [questionId, item],
                            (error, results) => {
                                if (error) {
                                    throw error;
                                }
                            }
                        );
                    }
                }
            );

            res.json({ success: true, message: 'Question added successfully' });
        }
    );
}


module.exports = {
    addTextQuestion,
    addYesNoQuestion,
    addNumQuestion,
    addRatingQuestion,
    addDropDownQuestion,
};