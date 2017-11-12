const fs = require('fs');
const path = require('path');
const shell = require('electron').shell;
const spawn = require('child_process').spawn;

const logError = err => err && console.error(err);

let screenshotPaths = [];

exports.getScreenshotsDir = app => {
    return path.join(app.getPath('pictures'), 'demo-screenshots');
}

exports.mkdir = path => {
    fs.stat(path, (err, stats) => {
        if (err && err.code !== 'ENOENT')
            return logError(err)
        else if (err || !stats.isDirectory())
            fs.mkdir(path, logError)
    });
};

const openCmds = {
    darwin: 'open',
    win32: 'explorer',
    linux: 'nautilus'
};

exports.openDir = dirPath => {
    const cmd = openCmds[process.platform];
    if (cmd)
        spawn(cmd, [dirPath]);
    else
        shell.showItemInFolder(dirPath);
};
