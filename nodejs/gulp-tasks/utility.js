function logFiles(files) {
    files.forEach(file => console.log(file));
}

function exit() {
    return process.exit(0);
}

function onBuild(done) {
    return function(err, stats) {
        if (err) {
            console.log('Error', err);
        } else {
            console.log(stats.toString());
        }
        if (done) {
            done();
        }
    };
}

module.exports = {
    exit,
    logFiles,
    onBuild,
};
