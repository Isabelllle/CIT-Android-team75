/**
 * <Description> This is the router lists of all routes
 * @author {YIJUN GUO}
 * @version 3.0
 * @date {2023}/{Sep}/{24}
 * 
 */

// load other routing files
const staticRouter = require('./staticRouter');
const reactRouter = require('./reactRouter');

module.exports = {
    staticRouter,
    reactRouter,
}