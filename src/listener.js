const electron = require('electron')

const ipc = electron.ipcRenderer

document.getElementById('capture-btn').addEventListener('click', _ => {
    ipc.send('capture-start')
})

ipc.on('countdown', (evt, count) => {
    document.getElementById('count').innerHTML = 'screenshot countdown: ' + count
})
