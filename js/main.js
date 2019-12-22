const painter = {};
painter.colors = ['blue', 'red', 'green', 'yellow', 'black', 'pink'];
painter.tools = ['new', 'pencil', 'brush', 'fillColor', 'eraser', 'circle', 'square'];
painter.isDraw = false;

painter.start = () => {
    painter.createTools();
    painter.addColors();
}
painter.createCanvas = () => {
    var newCanvas = document.createElement('div');
    newCanvas.id = 'canvas';
    newCanvas.className = 'canvas';
    var userWidth = prompt('Your width size?');
    var useHeight = prompt('Your height size?');
    newCanvas.style.width = `${userWidth}px`
    newCanvas.style.height = `${useHeight}px`
    document.querySelector('.right-side').appendChild(newCanvas);
    painter.canvas = document.querySelector('#canvas');
}

painter.addColors = () => {
    for (const color of painter.colors) {
        const aColor = document.createElement('div');
        aColor.className = 'color';
        aColor.id = color;
        if (aColor.id == 'black') {
            aColor.classList.add('selected')
        };
        aColor.style.backgroundColor = color;
        aColor.onclick = function () { painter.changColor() }
        document.querySelector('.menu-colors').appendChild(aColor);
    }
}

painter.createTools = () => {
    for (const tool of painter.tools) {
        const aTool = document.createElement('div');
        aTool.className = 'tools';
        aTool.id = tool;
        aTool.style.backgroundImage = `url('./images/${tool}.png')`
        document.querySelector('.menu-side').appendChild(aTool);
    }
    document.querySelector("#new").onclick = function () { painter.new() };
    document.querySelector("#pencil").onclick = function () { painter.pencil() };
    document.querySelector("#brush").onclick = function () { painter.brush() };
    document.querySelector("#fillColor").onclick = function () { painter.fillColor() };
    document.querySelector("#eraser").onclick = function () { painter.eraser() };
}

painter.changColor = () => {
    var allColor = document.querySelectorAll('.color')
    for (const color of allColor) {
        if (color.className == 'color selected') {
            color.classList.remove('selected')
        }
    }
    event.target.classList.add('selected');
}

painter.new = () => {
    if (painter.canvas != undefined) {
        painter.canvas.remove()
        var removeColors = document.querySelectorAll('.newColors');
        for (const color of removeColors) {
            color.remove();
        }
        document.body.style.cursor = "default";
    }
    painter.painterName = prompt('Your painter name:')
    document.querySelector('#title').innerHTML = painter.painterName;
    painter.createCanvas();
    painter.canvas.addEventListener('mousedown', () => {
        painter.canvas.addEventListener('mousemove', painter.draw);
    });
}
painter.pencil = () => {
    var allTools = document.querySelectorAll('.tools')
    for (const tool of allTools) {
        if (tool.className == 'tools selectedTool') {
            tool.classList.remove('selectedTool')
        }
    }
    
    event.target.classList.add('selectedTool');
    document.body.style.cursor = "url('./images/pencil.png'), auto";
    window.addEventListener('mouseup', () => painter.isDraw = false);
    painter.canvas.addEventListener('mousedown', () => painter.isDraw = true);
}

painter.brush = () => {
    var allTools = document.querySelectorAll('.tools')
    for (const tool of allTools) {
        if (tool.className == 'tools selectedTool') {
            tool.classList.remove('selectedTool');
        }
    }
    event.target.classList.add('selectedTool');
    document.body.style.cursor = "url('./images/brush.png'), auto";
    window.addEventListener('mouseup', () => painter.isDraw = false);
    painter.canvas.addEventListener('mousedown', () => painter.isDraw = true);
}
painter.eraser = () => {
    var allTools = document.querySelectorAll('.tools')
    for (const tool of allTools) {
        if (tool.className == 'tools selectedTool') {
            tool.classList.remove('selectedTool');
        }
    }
    event.target.classList.add('selectedTool');
    document.body.style.cursor = "url('./images/eraser.png'), auto";
}
painter.fillColor = () =>{
            document.querySelector('#canvas').backgroundColor = 'blue';

}


painter.draw = () => {
    if (painter.isDraw) {
        const newDiv = document.createElement('div');
        document.body.appendChild(newDiv);
        newDiv.className = 'newColors';
        newDiv.style.position = 'absolute';
        newDiv.style.left = `${event.pageX}px`;
        newDiv.style.top = `${event.pageY + 50}px`;
        var selectColor = document.querySelector(".selected");
        var selectTool = document.querySelector(".selectedTool");
        // console.log(document.querySelector("#pencil").classList);
        
        if (document.querySelector("#pencil").className == 'tools selectedTool') {
            newDiv.style.backgroundColor = `${selectColor.id}`;
            newDiv.style.width = '4px'
            newDiv.style.height = '4px'
        }
        else if(document.querySelector("#brush").className == 'tools selectedTool'){
            newDiv.style.backgroundColor = `${selectColor.id}`;
            newDiv.style.width = '10px'
            newDiv.style.height = '10px'
        }
        else if(document.querySelector("#eraser").className == 'tools selectedTool'){
            newDiv.style.backgroundColor = 'white';
            newDiv.style.width = '30px'
            newDiv.style.height = '30px'
            // document.querySelector('#canvas').backgroundColor = `${selectColor.id}`;
        }
    }
}


painter.start();