/**
 * <Description> This is the controller about reminder lists' functions
 * @author {YIJUN GUO, ZIXIAN LI}
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
    const email = req.email;
    client.query('SELECT is_manager FROM admin WHERE email = $1',
        [email], (error, results) => {
        if (error) {
            console.error('Error in find status of manager', error);
            return;
        }
        
        const isManager = results.rows[0].is_manager;

        if(!isManager) {
            client.query('SELECT * FROM reminder_list', (error, result) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).send('Internal Server Error');
                    return;
                }
            
                const tableData = result.rows;
                res.json(tableData);
            });
        } else {
            client.query('SELECT email FROM volunteers where manager_email = $1',
            [email], (error, result) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).send('Internal Server Error');
                    return;
                }
            
                const emails = result.rows.map(row => row.email);

                if (emails.length === 0) {
                  res.json([]);
                  return;
                }
                client.query('SELECT * FROM reminder_list WHERE email = ANY($1)', [emails], (error, result) => {
                    if (error) {
                      console.error('Error executing query:', error);
                      res.status(500).send('Internal Server Error');
                      return;
                    }
                
                    const reminders = result.rows;
                    res.json(reminders);
                });
            });
        }
    });
}


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
    searchReminderByEmail,
    deleteItem,
};