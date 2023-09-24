/**
 * <Description> This is the Map correspondings to survey topic/type
 * @author {YIJUN GUO}
 * @version 1.0
 * @date {2023}/{Sep}/{23}
 * 
 */

// The title of the questions corresponding to integer 1, 2, 3, 4, 5, 6
const titleMap = new Map([
    [1, 'Story'],
    [2, 'Wellbeing'],
    [3, 'Employability'],
    [4, 'Volunteer confidence'],
    [5, 'Demographic Questions'],
    [6, 'Service']
]);

// The type of the Rating questions corresponding to integer 4,5
const typeMap = new Map([
    [4, 'Rating scales 1-5'],
    [5, 'Rating scales 1-10'],
]);


module.exports = {
    titleMap,
    typeMap,
};
