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
    client.query('SELECT * FROM responses', (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows.length > 0) {
            // console.log('answer list', results.rows);
            res.json(results.rows);
        }else {
            return res.json({});
        }
    });
}

  

module.exports = {
    getAnswerList,
};