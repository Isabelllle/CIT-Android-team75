
const { client } = require('../db'); 

const { titleMap, typeMap } = require('./map');

const addRatingQuestion = (req, res) => {
    const { selectedTitle, selectedType, question, questionSecond, rate_min, rate_max } = req.body;

    const topic = titleMap.get(parseInt(selectedTitle));
    const type = typeMap.get(parseInt(selectedType));

    let in_second_survey;


    if(questionSecond !=  null) {
        in_second_survey = true;
    } else{
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


const addDropDownQuestion = (req, res) => {
    const { selectedTitle, question, questionSecond, items } = req.body;

    const topic = titleMap.get(parseInt(selectedTitle));

    let in_second_survey;


    if(questionSecond !=  null) {
        in_second_survey = true;
    } else{
        in_second_survey = false;
    }

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
    addRatingQuestion,
    addDropDownQuestion,
};