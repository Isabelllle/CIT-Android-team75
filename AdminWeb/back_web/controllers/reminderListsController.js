/**
 * <Description> This is the controller about reminder lists' functions
 * @author {YIJUN GUO}
 * @version 1.0
 * @date {2023}/{Sep}/{24}
 * 
 */


// PostgreSQL client from PostgreSQL library.
const { client } = require('../db'); 

/**
 * GET /api/getReminderList
 * Search reminder lists of all volunteers from database (Admin)
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const getReminderList = (req, res) => {
    client.query('SELECT * FROM reminder_list', (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        const tableData = result.rows;
        res.json(tableData);
    });
}

/**
 * GET /api/getReminderList
 * Search reminder lists of all volunteers from database in the same organization (Manager)
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
// const getMangerReminderList = (req, res) => {
//   client.query('SELECT * FROM reminder_list', (error, result) => {
//       if (error) {
//           console.error('Error executing query:', error);
//           res.status(500).send('Internal Server Error');
//           return;
//       }
      
//       const tableData = result.rows;
//       res.json(tableData);
//   });
// }

/**
 * GET /api/searchReminderByEmail
 * search exact email of volunteer from database
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const searchReminderByEmail = (req, res) => {

    const { email } = req.query;
  
    client.query('SELECT * FROM reminder_list WHERE email = $1', [email], (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      const searchData = result.rows;
      res.json(searchData);
    });
  };
  
/**
 * DELETE /api/deleteEmail/: email'
 * Deletes an item (question) with id from the database.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const deleteItem = (req, res) => {
    const itemEmail = req.params.email;

    client.query('DELETE FROM reminder_list WHERE email = $1', [itemEmail], (error, result) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        if (result.rowCount === 0) {
          res.status(404).send('Item not found');
          return;
        }
    
        res.send('Reminder List Item deleted successfully');
      });

}

module.exports = {
    getReminderList,
    // getMangerReminderList,
    searchReminderByEmail,
    deleteItem,
};