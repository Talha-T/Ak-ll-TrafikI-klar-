/*
Talha Talip Açıkgöz 
AkilliTrafikIsiklari ® 2017
See https://github.com/Talha-T/AkilliTrafikIsiklari/blob/master/LICENSE before using this code.
*/

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

function calculateLeft(widthOrHeight, windowWidthOrHeight) { // Calculates center of a width
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

const roadX = calculateLeft(roadWidth, windowWidth); // Center X of the road
const roadY = calculateLeft(roadHeight, windowHeight);


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

const red = "red";
const green = "green";
const yellow = "yellow";

const offset = 45;

var bottomRightLight = createRect(roadHalf + roadWidth + offset, roadY + roadHeight + offset / 3, lightWidth, lightHeight, red, lightLayer);
var bottomLeftLight = createRect(roadHalf - lightWidth - offset, roadY + roadHeight + offset / 3, lightWidth, lightHeight, red, lightLayer);
// / 3 is for less offset on Y
var topLeftLight = createRect(roadHalf - lightWidth - offset, roadHalfVertical - lightHeight - offset / 3, lightWidth, lightHeight, red, lightLayer);
var topRightLight = createRect(roadHalf + roadWidth + offset, roadHalfVertical - lightHeight - offset / 3, lightWidth, lightHeight, red, lightLayer);

stage.add(lightLayer);

// Graphics ends here.
// Light logic

var timeouts = {
    green: 4,
    red: 5,
    yellow: 1
}

var lights = [bottomLeftLight, topRightLight, topLeftLight, bottomRightLight];

function setupLight(light, isVertical) {

    const RG = isVertical ? red : green;

    light.value = isVertical ? timeouts[red] : timeouts[green]; // Pre-arrange lights

    light.lastPrimary = RG;


    light.changeLight = function (color) {
        this.fill(color);
        if (color != yellow)
            this.lastPrimary = color;
        lightLayer.draw();
        value = timeouts[color];
    };

    light.changeLight(RG);

    light.getNextColor = function () {
        var fill = this.attrs.fill;
        if (fill == yellow) {
            return this.lastPrimary == red ? green : red;
        }
        return yellow;
    };
}

for (var i = 0; i < lights.length; i++) {
    var light = lights[i];

    setupLight(light, i < 2); // Opposite colors for opposite sides at the beginning.
}

setInterval(function () {
    lights.forEach(light => {
        if (--light.value <= 0) {
            var color = light.getNextColor();
            light.changeLight(color);
            light.value = timeouts[color];
        }
        console.log("Işığın değişmesine " + light.value + " saniye");
    });
}, 1000);

// Print out stuff to help out

console.log("Işık sürelerini değiştirmek için: timeouts.red=20 yazıp enter'a basın. Sarı ışığın süresini değiştirmek için timeouts.yellow=3 vs.");
console.log("Bu kodu kullanmak istiyorsanız, lisansına göz atın: https://github.com/Talha-T/AkilliTrafikIsiklari/blob/master/LICENSE");
console.log("Talha Talip Açıkgöz 2017, AkilliTrafikIsiklari ®");
