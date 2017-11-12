const electron = require('electron');

const ipc = electron.ipcRenderer;

document.getElementById('capture-btn').addEventListener('click', _ => {
    ipc.send('capture-start');
});

ipc.on('countdown', (evt, count, isDone) => {
    document.getElementById('countdown-msg').innerHTML = `Countdown: ${count}`;
    if (isDone) {
        document.getElementById('countdown-msg').innerHTML = 'Countdown ended, check screenshot directory.';
    }
})
