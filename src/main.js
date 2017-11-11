const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron')

const path = require('path')
const url = require('url')

const name = app.getName()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

let menuTemplate = [
  {
    label: name,
    submenu: [
      {
        label: `About ${name}`,
        role: 'about'
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
    label: 'Another',
    submenu: [{
      label: 'Sub-Menu'
    }]
  }
]

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 725,
    resizable: false
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Add menu
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  // Add systray
  const tray = new Tray(`${__dirname}/trayIcon.png`);
  //const tray = new Tray(path.join('src', 'trayIcon.png'))
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Menu button1',
      click: _ => console.log('Menu button1')
    },
    {
      label: 'Menu button2',
      click: _ => console.log('Menu button2')
    }
  ])
  tray.setToolTip(name)
  tray.setContextMenu(trayMenu)

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
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('capture-start', _ => {
  console.log('starting!')

  let count = 3

  let timer = setInterval(_ => {
    let current = count--
    console.log("count", current)
    win.webContents.send('countdown', current)
    if (count === -1) {
      clearInterval(timer)
      win.webContents.send('capture', app.getPath('pictures'))
    }
  }, 1000)
})