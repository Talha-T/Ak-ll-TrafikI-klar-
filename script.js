const windowWidth = window.innerWidth; // Window width
const windowHeight = window.innerHeight; // Window height

const stage = new Konva.Stage({
    container: 'container',
    width: windowWidth,
    height: windowHeight
}); // Main stage

const aspectRatio = windowWidth / windowHeight;

const roadLayer = new Konva.Layer(); // Very bottom layer
const multiplier = 7 / 1366 * 768 / windowHeight * windowWidth; // Better responsiveness
const roadWidth = windowWidth / multiplier; // Road width, responsive
const roadHeight = windowHeight / multiplier * aspectRatio; // Multiplied with aspectRatio for responsiveness

function calculateCenter(widthOrHeight, windowWidthOrHeight) { // Calculates center of a width
    return windowWidthOrHeight / 2 - widthOrHeight / 2;
}

function createImage(x, y, width, height, src, layer) { // Creates a road
    var imageObj = new Image();
    imageObj.onload = function () {

        var yoda = new Konva.Image({
            x: x,
            y: y,
            image: imageObj,
            width: width,
            height: height
        });

        // add the shape to the layer
        layer.add(yoda);

        // add the layer to the stage
        stage.add(layer);
    };
    imageObj.src = src;

    return imageObj;
}

function createRect(x, y, width, height, fill, layer) {
    var rect = new Konva.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: fill,
        stroke: 'black',
        strokeWidth: 1
    });

    layer.add(rect);

    return rect;
}

const roadX = calculateCenter(roadWidth, windowWidth); // Center X of the road
const roadY = calculateCenter(roadHeight, windowHeight);


const roadHalfVertical = windowHeight / 2 - roadHeight / 2;
var verticalRoad1 = createImage(roadX, 0, roadWidth, roadHalfVertical, "road_.png", roadLayer);
var verticalRoad2 = createImage(roadX, roadHalfVertical + roadHeight, roadWidth, roadHalfVertical, "road_.png", roadLayer);

const roadHalf = windowWidth / 2 - roadWidth / 2; // Width of the half of road
var horizontalRoad1 = createImage(0, roadY, roadHalf, roadHeight, "road.png", roadLayer); // Left part
var horizontalRoad2 = createImage(roadHalf + roadWidth, roadY, windowWidth - roadHalf, roadHeight, "road.png", roadLayer);

var intersect = createImage(roadHalf, roadHalfVertical, roadWidth, roadHeight, "roadsquare.png", roadLayer);
stage.add(roadLayer);

const lightWidth = 60;
const lightHeight = lightWidth;

var lightLayer = new Konva.Layer();

var bottomRightLight = createRect(roadHalf + roadWidth + 2, roadY + roadHeight, lightWidth, lightHeight, "red", lightLayer);
var bottomLeftLight = createRect(roadHalf - lightWidth, roadY + roadHeight, lightWidth, lightHeight, "red", lightLayer);

var topLeftLight = createRect(roadHalf - lightWidth, roadHalfVertical - lightHeight, lightWidth, lightHeight, "red", lightLayer);
var topRightLight = createRect(roadHalf + roadWidth + 2, roadHalfVertical - lightHeight, lightWidth, lightHeight, "red", lightLayer);

stage.add(lightLayer);
