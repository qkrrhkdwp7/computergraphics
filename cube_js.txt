"use strict";

var canvas;
var gl;

var NumVertices  = 324;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;


var x = 0;


var flag = true;



var axis = 0;
//var theta = [ 30, -40, -20 ]; //wrb
//var theta = [ 150, -40, 200 ]; //wbo
//var theta = [ 150, 40, 160 ]; //wog
//var theta = [ 30, 40, 20 ]; //wgr
var theta = [ 0, 0, 0 ];


var thetaLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
//  gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

    //event listeners for buttons


/*
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
*/
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
for(x=0; x<10; x++) {
if(flag) theta[axis] += 1.0;
}
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
for(x=0; x<10; x++) {
if(flag) theta[axis] += 1.0;
}
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
for(x=0; x<10; x++) {
if(flag) theta[axis] += 1.0;
}
    };



    document.getElementById( "sButton" ).onclick = function () {
        flag = !flag;
    };




    render();
}

function colorCube()
{
    quad( 0, 6, 7, 1, 0 );
    quad( 2, 8, 9, 3, 0 );
    quad( 4, 10, 11, 5, 0 );
    quad( 12, 18, 19, 13, 0 );
    quad( 14, 20, 21, 15, 0 );
    quad( 16, 22, 23, 17, 0 );
    quad( 24, 30, 31, 25, 0 );
    quad( 26, 32, 33, 27, 0 );
    quad( 28, 34, 35, 29, 0 );
//red

    quad( 36, 42, 43, 37, 1 );
    quad( 38, 44, 45, 39, 1 );
    quad( 40, 46, 47, 41, 1 );
    quad( 48, 54, 55, 49, 1 );
    quad( 50, 56, 57, 51, 1 );
    quad( 52, 58, 59, 53, 1 );
    quad( 60, 66, 67, 61, 1 );
    quad( 62, 68, 69, 63, 1 );
    quad( 64, 70, 71, 65, 1 );
//blue

    quad( 72, 78, 79, 73, 2 );
    quad( 74, 80, 81, 75, 2 );
    quad( 76, 82, 83, 77, 2 );
    quad( 84, 90, 91, 85, 2 );
    quad( 86, 92, 93, 87, 2 );
    quad( 88, 94, 95, 89, 2 );
    quad( 96, 102, 103, 97, 2 );
    quad( 98, 104, 105, 99, 2 );
    quad( 100, 106, 107, 101, 2 );
//orange

    quad( 108, 114, 115, 109, 3 );
    quad( 110, 116, 117, 111, 3 );
    quad( 112, 118, 119, 113, 3 );
    quad( 120, 126, 127, 121, 3 );
    quad( 122, 128, 129, 123, 3 );
    quad( 124, 130, 131, 125, 3 );
    quad( 132, 138, 139, 133, 3 );
    quad( 134, 140, 141, 135, 3 );
    quad( 136, 142, 143, 137, 3 );
//green

    quad( 144, 150, 151, 145, 4 );
    quad( 146, 152, 153, 147, 4 );
    quad( 148, 154, 155, 149, 4 );
    quad( 156, 162, 163, 157, 4 );
    quad( 158, 164, 165, 159, 4 );
    quad( 160, 166, 167, 161, 4 );
    quad( 168, 174, 175, 169, 4 );
    quad( 170, 176, 177, 171, 4 );
    quad( 172, 178, 179, 173, 4 );
//white

    quad( 180, 186, 187, 181, 5 );
    quad( 182, 188, 189, 183, 5 );
    quad( 184, 190, 191, 185, 5 );
    quad( 192, 198, 199, 193, 5 );
    quad( 194, 200, 201, 195, 5 );
    quad( 196, 202, 203, 197, 5 );
    quad( 204, 210, 211, 205, 5 );
    quad( 206, 212, 213, 207, 5 );
    quad( 208, 214, 215, 209, 5 );
//yellow

}


function quad(a, b, c, d, e)
{
    var vertices = [
        vec4( -0.5,  0.5,  0.5,  1.0 ),
        vec4( -0.2,  0.5,  0.5,  1.0 ),
        vec4( -0.15,  0.5,  0.5,  1.0 ),
        vec4(  0.15,  0.5,  0.5,  1.0 ),
        vec4(  0.2,  0.5,  0.5,  1.0 ),
        vec4(  0.5,  0.5,  0.5,  1.0 ),
        
        vec4( -0.5,  0.2,  0.5,  1.0 ),
        vec4( -0.2,  0.2,  0.5,  1.0 ),
        vec4( -0.15,  0.2,  0.5,  1.0 ),
        vec4(  0.15,  0.2,  0.5,  1.0 ),
        vec4(  0.2,  0.2,  0.5,  1.0 ),
        vec4(  0.5,  0.2,  0.5,  1.0 ),

        vec4( -0.5,  0.15,  0.5,  1.0 ),
        vec4( -0.2,  0.15,  0.5,  1.0 ),
        vec4( -0.15,  0.15,  0.5,  1.0 ),
        vec4(  0.15,  0.15,  0.5,  1.0 ),
        vec4(  0.2,  0.15,  0.5,  1.0 ),
        vec4(  0.5,  0.15,  0.5,  1.0 ),

        vec4( -0.5, -0.15,  0.5,  1.0 ),
        vec4( -0.2, -0.15,  0.5,  1.0 ),
        vec4( -0.15, -0.15,  0.5,  1.0 ),
        vec4(  0.15, -0.15,  0.5,  1.0 ),
        vec4(  0.2, -0.15,  0.5,  1.0 ),
        vec4(  0.5, -0.15,  0.5,  1.0 ),

        vec4( -0.5, -0.2,  0.5,  1.0 ),
        vec4( -0.2, -0.2,  0.5,  1.0 ),
        vec4( -0.15, -0.2,  0.5,  1.0 ),
        vec4(  0.15, -0.2,  0.5,  1.0 ),
        vec4(  0.2, -0.2,  0.5,  1.0 ),
        vec4(  0.5, -0.2,  0.5,  1.0 ),

        vec4( -0.5, -0.5,  0.5,  1.0 ),
        vec4( -0.2, -0.5,  0.5,  1.0 ),
        vec4( -0.15, -0.5,  0.5,  1.0 ),
        vec4(  0.15, -0.5,  0.5,  1.0 ),
        vec4(  0.2, -0.5,  0.5,  1.0 ),
        vec4(  0.5, -0.5,  0.5,  1.0 ),
//red

        vec4(  0.5,  0.5,  0.5,  1.0 ),
        vec4(  0.5,  0.5,  0.2,  1.0 ),
        vec4(  0.5,  0.5,  0.15,  1.0 ),
        vec4(  0.5,  0.5, -0.15,  1.0 ),
        vec4(  0.5,  0.5, -0.2,  1.0 ),
        vec4(  0.5,  0.5, -0.5,  1.0 ),

        vec4(  0.5,  0.2,  0.5,  1.0 ),
        vec4(  0.5,  0.2,  0.2,  1.0 ),
        vec4(  0.5,  0.2,  0.15,  1.0 ),
        vec4(  0.5,  0.2, -0.15,  1.0 ),
        vec4(  0.5,  0.2, -0.2,  1.0 ),
        vec4(  0.5,  0.2, -0.5,  1.0 ),

        vec4(  0.5,  0.15,  0.5,  1.0 ),
        vec4(  0.5,  0.15,  0.2,  1.0 ),
        vec4(  0.5,  0.15,  0.15,  1.0 ),
        vec4(  0.5,  0.15, -0.15,  1.0 ),
        vec4(  0.5,  0.15, -0.2,  1.0 ),
        vec4(  0.5,  0.15, -0.5,  1.0 ),

        vec4(  0.5, -0.15,  0.5,  1.0 ),
        vec4(  0.5, -0.15,  0.2,  1.0 ),
        vec4(  0.5, -0.15,  0.15,  1.0 ),
        vec4(  0.5, -0.15, -0.15,  1.0 ),
        vec4(  0.5, -0.15, -0.2,  1.0 ),
        vec4(  0.5, -0.15, -0.5,  1.0 ),

        vec4(  0.5, -0.2,  0.5,  1.0 ),
        vec4(  0.5, -0.2,  0.2,  1.0 ),
        vec4(  0.5, -0.2,  0.15,  1.0 ),
        vec4(  0.5, -0.2, -0.15,  1.0 ),
        vec4(  0.5, -0.2, -0.2,  1.0 ),
        vec4(  0.5, -0.2, -0.5,  1.0 ),

        vec4(  0.5, -0.5,  0.5,  1.0 ),
        vec4(  0.5, -0.5,  0.2,  1.0 ),
        vec4(  0.5, -0.5,  0.15,  1.0 ),
        vec4(  0.5, -0.5, -0.15,  1.0 ),
        vec4(  0.5, -0.5, -0.2,  1.0 ),
        vec4(  0.5, -0.5, -0.5,  1.0 ),
//blue

        vec4(  0.5,  0.5, -0.5,  1.0 ),
        vec4(  0.2,  0.5, -0.5,  1.0 ),
        vec4(  0.15,  0.5, -0.5,  1.0 ),
        vec4( -0.15,  0.5, -0.5,  1.0 ),
        vec4( -0.2,  0.5, -0.5,  1.0 ),
        vec4( -0.5,  0.5, -0.5,  1.0 ),

        vec4(  0.5,  0.2, -0.5,  1.0 ),
        vec4(  0.2,  0.2, -0.5,  1.0 ),
        vec4(  0.15,  0.2, -0.5,  1.0 ),
        vec4( -0.15,  0.2, -0.5,  1.0 ),
        vec4( -0.2,  0.2, -0.5,  1.0 ),
        vec4( -0.5,  0.2, -0.5,  1.0 ),

        vec4(  0.5,  0.15, -0.5,  1.0 ),
        vec4(  0.2,  0.15, -0.5,  1.0 ),
        vec4(  0.15,  0.15, -0.5,  1.0 ),
        vec4( -0.15,  0.15, -0.5,  1.0 ),
        vec4( -0.2,  0.15, -0.5,  1.0 ),
        vec4( -0.5,  0.15, -0.5,  1.0 ),

        vec4(  0.5, -0.15, -0.5,  1.0 ),
        vec4(  0.2, -0.15, -0.5,  1.0 ),
        vec4(  0.15, -0.15, -0.5,  1.0 ),
        vec4( -0.15, -0.15, -0.5,  1.0 ),
        vec4( -0.2, -0.15, -0.5,  1.0 ),
        vec4( -0.5, -0.15, -0.5,  1.0 ),

        vec4(  0.5, -0.2, -0.5,  1.0 ),
        vec4(  0.2, -0.2, -0.5,  1.0 ),
        vec4(  0.15, -0.2, -0.5,  1.0 ),
        vec4( -0.15, -0.2, -0.5,  1.0 ),
        vec4( -0.2, -0.2, -0.5,  1.0 ),
        vec4( -0.5, -0.2, -0.5,  1.0 ),

        vec4(  0.5, -0.5, -0.5,  1.0 ),
        vec4(  0.2, -0.5, -0.5,  1.0 ),
        vec4(  0.15, -0.5, -0.5,  1.0 ),
        vec4( -0.15, -0.5, -0.5,  1.0 ),
        vec4( -0.2, -0.5, -0.5,  1.0 ),
        vec4( -0.5, -0.5, -0.5,  1.0 ),
//orange

        vec4( -0.5,  0.5, -0.5,  1.0 ),
        vec4( -0.5,  0.5, -0.2,  1.0 ),
        vec4( -0.5,  0.5, -0.15,  1.0 ),
        vec4( -0.5,  0.5,  0.15,  1.0 ),
        vec4( -0.5,  0.5,  0.2,  1.0 ),
        vec4( -0.5,  0.5,  0.5,  1.0 ),

        vec4( -0.5,  0.2, -0.5,  1.0 ),
        vec4( -0.5,  0.2, -0.2,  1.0 ),
        vec4( -0.5,  0.2, -0.15,  1.0 ),
        vec4( -0.5,  0.2,  0.15,  1.0 ),
        vec4( -0.5,  0.2,  0.2,  1.0 ),
        vec4( -0.5,  0.2,  0.5,  1.0 ),

        vec4( -0.5,  0.15, -0.5,  1.0 ),
        vec4( -0.5,  0.15, -0.2,  1.0 ),
        vec4( -0.5,  0.15, -0.15,  1.0 ),
        vec4( -0.5,  0.15,  0.15,  1.0 ),
        vec4( -0.5,  0.15,  0.2,  1.0 ),
        vec4( -0.5,  0.15,  0.5,  1.0 ),

        vec4( -0.5, -0.15, -0.5,  1.0 ),
        vec4( -0.5, -0.15, -0.2,  1.0 ),
        vec4( -0.5, -0.15, -0.15,  1.0 ),
        vec4( -0.5, -0.15,  0.15,  1.0 ),
        vec4( -0.5, -0.15,  0.2,  1.0 ),
        vec4( -0.5, -0.15,  0.5,  1.0 ),

        vec4( -0.5, -0.2, -0.5,  1.0 ),
        vec4( -0.5, -0.2, -0.2,  1.0 ),
        vec4( -0.5, -0.2, -0.15,  1.0 ),
        vec4( -0.5, -0.2,  0.15,  1.0 ),
        vec4( -0.5, -0.2,  0.2,  1.0 ),
        vec4( -0.5, -0.2,  0.5,  1.0 ),

        vec4( -0.5, -0.5, -0.5,  1.0 ),
        vec4( -0.5, -0.5, -0.2,  1.0 ),
        vec4( -0.5, -0.5, -0.15,  1.0 ),
        vec4( -0.5, -0.5,  0.15,  1.0 ),
        vec4( -0.5, -0.5,  0.2,  1.0 ),
        vec4( -0.5, -0.5,  0.5,  1.0 ),
//green

        vec4( -0.5,  0.5, -0.5,  1.0 ),
        vec4( -0.2,  0.5, -0.5,  1.0 ),
        vec4( -0.15,  0.5, -0.5,  1.0 ),
        vec4(  0.15,  0.5, -0.5,  1.0 ),
        vec4(  0.2,  0.5, -0.5,  1.0 ),
        vec4(  0.5,  0.5, -0.5,  1.0 ),

        vec4( -0.5,  0.5, -0.2,  1.0 ),
        vec4( -0.2,  0.5, -0.2,  1.0 ),
        vec4( -0.15,  0.5, -0.2,  1.0 ),
        vec4(  0.15,  0.5, -0.2,  1.0 ),
        vec4(  0.2,  0.5, -0.2,  1.0 ),
        vec4(  0.5,  0.5, -0.2,  1.0 ),

        vec4( -0.5,  0.5, -0.15,  1.0 ),
        vec4( -0.2,  0.5, -0.15,  1.0 ),
        vec4( -0.15,  0.5, -0.15,  1.0 ),
        vec4(  0.15,  0.5, -0.15,  1.0 ),
        vec4(  0.2,  0.5, -0.15,  1.0 ),
        vec4(  0.5,  0.5, -0.15,  1.0 ),

        vec4( -0.5,  0.5,  0.15,  1.0 ),
        vec4( -0.2,  0.5,  0.15,  1.0 ),
        vec4( -0.15,  0.5,  0.15,  1.0 ),
        vec4(  0.15,  0.5,  0.15,  1.0 ),
        vec4(  0.2,  0.5,  0.15,  1.0 ),
        vec4(  0.5,  0.5,  0.15,  1.0 ),

        vec4( -0.5,  0.5,  0.2,  1.0 ),
        vec4( -0.2,  0.5,  0.2,  1.0 ),
        vec4( -0.15,  0.5,  0.2,  1.0 ),
        vec4(  0.15,  0.5,  0.2,  1.0 ),
        vec4(  0.2,  0.5,  0.2,  1.0 ),
        vec4(  0.5,  0.5,  0.2,  1.0 ),

        vec4( -0.5,  0.5,  0.5,  1.0 ),
        vec4( -0.2,  0.5,  0.5,  1.0 ),
        vec4( -0.15,  0.5,  0.5,  1.0 ),
        vec4(  0.15,  0.5,  0.5,  1.0 ),
        vec4(  0.2,  0.5,  0.5,  1.0 ),
        vec4(  0.5,  0.5,  0.5,  1.0 ),
//white

        vec4( -0.5, -0.5,  0.5,  1.0 ),
        vec4( -0.2, -0.5,  0.5,  1.0 ),
        vec4( -0.15, -0.5,  0.5,  1.0 ),
        vec4(  0.15, -0.5,  0.5,  1.0 ),
        vec4(  0.2, -0.5,  0.5,  1.0 ),
        vec4(  0.5, -0.5,  0.5,  1.0 ),

        vec4( -0.5, -0.5,  0.2,  1.0 ),
        vec4( -0.2, -0.5,  0.2,  1.0 ),
        vec4( -0.15, -0.5,  0.2,  1.0 ),
        vec4(  0.15, -0.5,  0.2,  1.0 ),
        vec4(  0.2, -0.5,  0.2,  1.0 ),
        vec4(  0.5, -0.5,  0.2,  1.0 ),

        vec4( -0.5, -0.5,  0.15,  1.0 ),
        vec4( -0.2, -0.5,  0.15,  1.0 ),
        vec4( -0.15, -0.5,  0.15,  1.0 ),
        vec4(  0.15, -0.5,  0.15,  1.0 ),
        vec4(  0.2, -0.5,  0.15,  1.0 ),
        vec4(  0.5, -0.5,  0.15,  1.0 ),

        vec4( -0.5, -0.5, -0.15,  1.0 ),
        vec4( -0.2, -0.5, -0.15,  1.0 ),
        vec4( -0.15, -0.5, -0.15,  1.0 ),
        vec4(  0.15, -0.5, -0.15,  1.0 ),
        vec4(  0.2, -0.5, -0.15,  1.0 ),
        vec4(  0.5, -0.5, -0.15,  1.0 ),

        vec4( -0.5, -0.5, -0.2,  1.0 ),
        vec4( -0.2, -0.5, -0.2,  1.0 ),
        vec4( -0.15, -0.5, -0.2,  1.0 ),
        vec4(  0.15, -0.5, -0.2,  1.0 ),
        vec4(  0.2, -0.5, -0.2,  1.0 ),
        vec4(  0.5, -0.5, -0.2,  1.0 ),

        vec4( -0.5, -0.5, -0.5,  1.0 ),
        vec4( -0.2, -0.5, -0.5,  1.0 ),
        vec4( -0.15, -0.5, -0.5,  1.0 ),
        vec4(  0.15, -0.5, -0.5,  1.0 ),
        vec4(  0.2, -0.5, -0.5,  1.0 ),
        vec4(  0.5, -0.5, -0.5,  1.0 ),
//yellow
    ];





    var vertexColors = [
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.5, 0.0, 1.0 ],  // orange
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 1.0, 1.0, 1.0, 1.0 ],   // white
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 0.0, 1.0, 1.0, 1.0 ]   // cyan
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[e]);

    }
}





function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


/*
for(x=0; x<=90; x++) {
if(flag) theta[axis] += 1.0;
}
*/
//    theta[axis] += 1.0;
//    theta[axis] += 2.0;
//    theta[axis] += 0.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame( render );
}