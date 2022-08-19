const { format } = require('date-fns');

const t = new Date();
console.log(t);
const n = format(t, 'yyyy-MM-dd hh:mm:ss');
console.log(typeof t, n);
