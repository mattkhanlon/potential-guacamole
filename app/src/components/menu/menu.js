import React from 'react';
import ScriptTag from 'react-script-tag';
import '../../assets/css/menu/menu.css';
import MenuBar from '../../assets/views/menu/menu.js';

function Menu() {
    return ( 
        <>
            <MenuBar /> 
            <ScriptTag type="text/javascript" src="../../renderer/menu/menu.js" />
        </>);
}

export default Menu;

function DebugInfo(filename) {
    console.log("Loading: " + filename)
}
DebugInfo("Component - Menu");