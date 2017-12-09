// Jan 1st 1970 00:00:00 am UTC
var moment = require('moment');

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
// date.add(2, 'years').subtract(3, 'months');
// console.log(date.format('MMM Do YYYY'));

console.log(date.format('h:mm a'));