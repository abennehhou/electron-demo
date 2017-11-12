const exec = require('child_process').exec
const fs = require('fs')
const os = require('os')

function setStatus(status) {
    document.getElementById('git-status').innerHTML = `Git status: ${status}`;
}

function isDir(dir) {
    try {
        return fs.lstatSync(dir).isDirectory();
    } catch (e) {
        console.log('dir check error', e);
        return false;
    }
}

function checkGitStatus(dir) {
    exec('git status', {
        cwd: dir
    }, (err, stdout, stderr) => {
        if (err) return setStatus('unknown');

        if (/nothing to commit/.test(stdout)) return setStatus('clean');

        return setStatus('dirty');
    });
}

document.getElementById('check-git-status-btn').addEventListener('click', _ => {
    let dir = document.getElementById('git-dir').value;
    if (isDir(dir)) {
        checkGitStatus(dir);
    }
    else {
        setStatus('unknown');
    }
});
