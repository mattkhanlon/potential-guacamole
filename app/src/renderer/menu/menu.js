//###########################################################
//###########################################################
const ipcRend = etron.ipcRenderer()

// Tell main process to show the menu when demo button is clicked
const menuBtn = document.getElementById("file-button");
menuBtn.addEventListener('click', () => {
    console.log("clicked");
    ipcRend.send('menu-clicked');
})


//  DEBUG  ###################################################################
//############################################################################
//############################################################################
//############################################################################
//############################################################################
function DebugInfo(filename) {
    console.log("Loading: " + filename)
}
DebugInfo("Renderer - Menu");