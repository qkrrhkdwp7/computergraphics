"use strict";

var canvas;
var gl;

var NumVertices  = 24;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

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

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

    render();
}

function colorCube()
{
    quad( 3, 4, 1, 0, 5 );
    quad( 4, 5, 2, 1, 5 );
    quad( 6, 7, 4, 3, 5 );
    quad( 7, 8, 5, 4, 5 );
}

function quad(a, b, c, d, e)
{
    var vertices = [
        vec4( -1.0,  1.0, 1.0, 1.0 ),
        vec4(    0,  1.0, 1.0, 1.0 ),
        vec4(  1.0,  1.0, 1.0, 1.0 ),
        vec4( -1.0,    0, 1.0, 1.0 ),
        vec4(    0,    0, 1.0, 1.0 ),
        vec4(  1.0,    0, 1.0, 1.0 ),
        vec4( -1.0, -1.0, 1.0, 1.0 ),
        vec4(    0, -1.0, 1.0, 1.0 ),
        vec4(  1.0, -1.0, 1.0, 1.0 ),
    ];

    var vertexColors = [
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.5, 0.0, 1.0 ],  // orange
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.9, 0.9, 0.9, 1.0 ],   // white
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

//    theta[axis] += 2.0;
    theta[axis] += 0.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame( render );
}