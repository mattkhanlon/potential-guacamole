// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, contentTracing } = require("electron");
const glob = require('glob')
const path = require("path");
const url = require("url");


let win = null

function initialize() {

    loadModules()
    makeSingleInstance()

    // Create the native browser window.
    function createWindow() {
        const win = new BrowserWindow({
            width: 1200,
            height: 900,
            show: false,
            backgroundColor: '#282c34',
            x: -1620,
            y: 200,
            frame: false,
            // Set the path of an additional "preload" script that can be used to
            // communicate between node-land and browser-land.
            webPreferences: {
                preload: path.join(__dirname, "preload.js")
            },
        });

        // In production, set the initial browser path to the local bundle generated
        // by the Create React App build process.
        // In development, set it to localhost to allow live/hot-reloading.
        const appURL = app.isPackaged
            ? url.format({
                pathname: path.join(__dirname, "index.html"),
                protocol: "file:",
                slashes: true,
            })
            : "http://localhost:3000";
        win.loadURL(appURL);

        win.webContents.openDevTools();

        // Waits for the page to load before showing the window
        win.once('ready-to-show', () => {
            win.show()
        })
    }

    // Setup a local proxy to adjust the paths of requested files when loading
    // them from the local production bundle (e.g.: local fonts, etc...).
    function setupLocalFilesNormalizerProxy() {
        protocol.registerHttpProtocol(
            "file",
            (request, callback) => {
                const url = request.url.substr(8);
                callback({ path: path.normalize(`${__dirname}/${url}`) });
            },
            (error) => {
                if (error) console.error("Failed to register protocol");
            }
        );
    }

    // This method will be called when Electron has finished its initialization and
    // is ready to create the browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(() => {

        (async () => {
            await contentTracing.startRecording({
                included_categories: ['*']
            })
            console.log('Tracing started')
            await new Promise(resolve => setTimeout(resolve, 5000))
            const path = await contentTracing.stopRecording()
            console.log('Tracing data recorded to ' + path)
        })()

        createWindow();
        setupLocalFilesNormalizerProxy();

        app.on("activate", function () {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });

    // Quit when all windows are closed, except on macOS.
    // There, it's common for applications and their menu bar to stay active until
    // the user quits  explicitly with Cmd + Q.
    app.on("window-all-closed", function () {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return

    app.requestSingleInstanceLock()

    app.on('second-instance', () => {
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        }
    })
}

// Require each JS file in the modules dir
function loadModules() {
    console.log("Loading Modules")
    const files = glob.sync(path.join(__dirname, '../modules/**/*.js'))

    console.log(files);
    files.forEach((file) => { require(file) })
}

initialize()