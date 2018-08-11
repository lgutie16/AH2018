const path = require('path');
const gulp = require('gulp');
const argv = require('yargs').argv;
const knex = require('knex');
const { exit, logFiles } = require('./utility');

// Generic connection to create database
const pg = knex({
    client: 'postgres',
    connection: 'postgres://linda:postgres@localhost:5432/postgres',
});

// Connection to proyect database
const datastore = knex({
    client: 'postgres',
    connection: `postgres://linda:postgres@localhost:5432/ah_2018`,
});

const knexConfig = {
    directory: path.join(__dirname, '../datastore/migrations'),
};

gulp.task('db:create', () => {
    return pg
        .raw(`CREATE DATABASE ah_2018`)
        .then(() => console.log('Database created successfully'))
        .then(exit);
});

gulp.task('db:migrate', () => {
    return datastore.migrate
        .latest(knexConfig)
        .then(([status, files]) => logFiles(files))
        .then(() => console.log('Migrations ran successfully'))
        .then(exit);
});

gulp.task('db:rollback', () => {
    return datastore.migrate
        .rollback(knexConfig)
        .then(([status, files]) => logFiles(files))
        .then(() => console.log('Rollback ran successfully'))
        .then(exit);
});

gulp.task('db:make', () => {
    return datastore.migrate
        .make(argv.name, knexConfig)
        .then(result => console.log(result))
        .then(() => console.log('Migration created successfully'))
        .then(exit);
});
