const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('etron', {
    ipcRenderer: () => ipcRenderer
})