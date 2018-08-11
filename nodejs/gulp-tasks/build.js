const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const WEBPACK_CONFIG = require('../webpack.config');
const nodemon = require('nodemon');
const { onBuild } = require('./utility');

let firedDone = false;

gulp.task('build', done => {
    webpack(WEBPACK_CONFIG).run(onBuild(done));
});

gulp.task('build:watch', done => {
    webpack(WEBPACK_CONFIG).watch(
        { aggregateTimeout: 300, poll: undefined },
        (err, stats) => {
            if (!firedDone) {
                firedDone = true;
                done();
            }

            nodemon.restart();
        }
    );
});

gulp.task('run', ['build:watch'], () => {
    nodemon({
        execMap: {
            js: 'node',
        },
        script: path.join(__dirname, '../build/backend'),
        nodeArgs: ['--inspect'],
        ignore: ['*'],
    }).on('restart', () => {
        console.log('Patched!');
    });
});
