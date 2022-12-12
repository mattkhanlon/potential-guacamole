import React from 'react';
import '../../assets/css/menu/menu.css';

function Menu() {
    return (
        <>
            <div id="app-menu">
                <button id="file-button">File</button>
            </div>
        </>
    );
}

export default Menu;

function DebugInfo(filename) {
    console.log("Loading: " + filename)
}
DebugInfo("Component - Menu");