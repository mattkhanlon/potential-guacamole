const { ipcRenderer } = require('electron')

// Tell main process to show the menu when demo button is clicked
const contextMenuBtn = document.getElementById('context-menu')

contextMenuBtn.addEventListener('click', () => {
    console.log("clicked")
    ipcRenderer.send('show-context-menu')
})

console.log("Loaded: Context Menu Renderers")