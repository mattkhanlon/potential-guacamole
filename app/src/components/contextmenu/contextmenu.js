import React from 'react';



function Menu() {
    return (<>
        <div id="app-test">
            <button id="context-menu">File</button>
        </div>
        
        <script type="text/javascript">
            require('../components/contextmenu/renderer')
        </script>
    </>);
}

export default Menu;
