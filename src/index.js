const path = require('path')
const { createWindow } = require('./main')
const { app } = require('electron')

require('./database')
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.allowRendererProcessReuse = true
app.whenReady().then(createWindow)
