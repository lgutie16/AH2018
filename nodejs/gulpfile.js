const { exit } = require('./gulp-tasks/utility');
require('gulp-require-tasks')();

process.on('SIGINT', exit);
