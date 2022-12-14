const { ipcMain, Notification } = require('electron')

const NOTIFICATION_TITLE = 'Notification'
const NOTIFICATION_BODY = 'We heard you.'

ipcMain.on('menu-clicked', (event) => {
    console.log("Recieved")
    showNotification();
})


function showNotification() {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

//  DEBUG  ###################################################################
//############################################################################
//############################################################################
//############################################################################
//############################################################################
function DebugInfo(filename) {
    console.log("Loading: " + filename)
}
DebugInfo("Module - Menu");