const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const screenshots = require('./screenshots');
const menuTemplate = require('./menu');

const name = app.getName();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 725,
    resizable: false
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  screenshots.mkdir(screenshots.getScreenshotsDir(app));

  // Open the DevTools.
  //win.webContents.openDevTools();

  // Add menu
  const menu = Menu.buildFromTemplate(menuTemplate(win));
  Menu.setApplicationMenu(menu);

  // Add systray
  const tray = new Tray(`${__dirname}/trayIcon.png`);
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: function () { app.quit() }
    }
  ]);
  tray.setToolTip(name);
  tray.setContextMenu(trayMenu);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('capture-start', _ => {
  let count = 3;

  let timer = setInterval(_ => {
    let current = count--;
    let isDone = count === -1;
    win.webContents.send('countdown', current, isDone);
    if (isDone) {
      clearInterval(timer);
      win.webContents.send('capture', screenshots.getScreenshotsDir(app));
    }
  }, 1000);
});