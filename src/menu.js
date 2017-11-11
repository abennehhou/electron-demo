const electron = require('electron')
const screenshots = require('./screenshots')
const path = require('path')

const { app, BrowserWindow } = electron
const name = app.getName()

function openAboutWindow() {
    let aboutWindow = new BrowserWindow({
        height: 400,
        resizable: false,
        width: 600,
        title: "About",
        minimizable: false,
        fullscreenable: false
    });

    aboutWindow.setMenu(null);

    aboutWindow.loadURL('file://' + __dirname + '/about.html');

    aboutWindow.on('closed', function () {
        aboutWindow = null;
    });
};

module.exports = mainWindow => {
    const template = [
        {
            label: name,
            submenu: [
                {
                    label: 'Screenshots Directory',
                    click: _ => screenshots.openDir(screenshots.getScreenshotsDir(app))
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Minimize',
                    role: 'minimize'
                },
                {
                    label: 'Quit',
                    accelerator: 'Ctrl+Q',
                    click: function () { app.quit() }
                }]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: `About ${name}`,
                    click: () => openAboutWindow()
                }
            ]
        }
    ]


    return template
}
