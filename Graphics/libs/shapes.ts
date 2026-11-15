/*
Function to create the vertex and color information for simple shapes
These can be used in multiple examples.

Gilberto Echeverria
2024-09-15
*/

import * as twgl from 'twgl-base.js';

// Create the data for the vertices of a polygon with the shape of the
// letter F. This is useful to view the transformations on the object.
function shapeF(): twgl.Arrays {
    const arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // Letter F
                0, 0,
                0, 200,
                40, 200,
                40, 0,
                40, 40,
                200, 40,
                200, 0,
                40, 120,
                150, 120,
                150, 80,
                40, 80,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
                3, 4, 5,
                5, 6, 3,
                7, 8, 9,
                9, 10, 7,
            ]
        }
    };

    return arrays;
}

function shapeF_centered() : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // Letter F
                0, 200,
                0, 0,
                40, 0,
                40, 200,
                40, 160,
                200, 160,
                200, 200,
                40, 80,
                150, 80,
                150, 120,
                40, 120,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
                3, 4, 5,
                5, 6, 3,
                7, 8, 9,
                9, 10, 7,
            ]
        }
    };

    return arrays;
}

function smiley(radius: number) : twgl.Arrays {
    // The arrays are initially empty
    const positionData: number[] = [];
    const colorData: number[] = [];
    const indexData: number[] = [];

    //Yellow circle
    let sides = 100
    const angleStep = 2 * Math.PI / sides;
    positionData.push(0,0)
    colorData.push(0.9, 0.8, 0, 1);
    

     for (let s = 0; s < sides; s++) {
        const angle = angleStep * s;
        const x = radius*Math.cos(angle);
        const y = radius*Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Color yellow
        colorData.push(0.9, 0.8, 0, 1);

        // Define the triangles, in counter clockwise order
        indexData.push(0);
        indexData.push(s + 1);
        indexData.push(((s + 2) <= sides) ? (s + 2) : 1);
    }

    //right eye black
    const start_eye_right = positionData.length/2;
    const eyeX_right = 60;
    const eyeY_right = 50;
    const radius_eye_x = radius/5;
    const radius_eye_y = radius/4;

    positionData.push(eyeX_right,eyeY_right)
    colorData.push(0, 0, 0, 1);

     for (let s = 0; s < sides; s++) {
        const angle = angleStep * s;
        const x = eyeX_right+(radius_eye_x)*Math.cos(angle);
        const y = eyeY_right+(radius_eye_y)*Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Color black
        colorData.push(0, 0, 0, 1);

        // Define the triangles, in counter clockwise order
        indexData.push(start_eye_right);
        indexData.push(start_eye_right+s + 1);
        indexData.push(((s + 2) <= sides) ? (start_eye_right+s + 2) : (start_eye_right+1));}

    
    //right eye color
    const start_c_right = positionData.length/2;
    const cX_right = 60;
    const cY_right = 40;
    const radius_c_x = radius_eye_x-4;
    const radius_c_y = radius_eye_y-5;

    positionData.push(cX_right,cY_right)
    colorData.push(0.5, 0.8, 1, 1);

     for (let s = 0; s < sides; s++) {
        const angle = angleStep * s;
        const x = cX_right+(radius_c_x)*Math.cos(angle);
        const y = cY_right+(radius_c_y)*Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Color black
        colorData.push(0.5, 0.8, 1, 1);

        // Define the triangles, in counter clockwise order
        indexData.push(start_c_right);
        indexData.push(start_c_right+s + 1);
        indexData.push(((s + 2) <= sides) ? (start_c_right+s + 2) : (start_c_right+1));}


    //left eye black
    const start_eye_left = positionData.length/2;
    const eyeX_left = -60;
    const eyeY_left = 50;

    positionData.push(eyeX_left,eyeY_left)
    colorData.push(0, 0, 0, 1);

     for (let s = 0; s < sides; s++) {
        const angle = angleStep * s;
        const x = eyeX_left+(radius_eye_x)*Math.cos(angle);
        const y = eyeY_left+(radius_eye_y)*Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Color black
        colorData.push(0, 0, 0, 1);

        // Define the triangles, in counter clockwise order
        indexData.push(start_eye_left);
        indexData.push(start_eye_left+s + 1);
        indexData.push(((s + 2) <= sides) ? (start_eye_left+s + 2) : (start_eye_left+1));}
        


    //left eye color
    const start_c_left = positionData.length/2;
    const cX_left = -60;
    const cY_left = 40;

    positionData.push(cX_left,cY_left)
    colorData.push(0.5, 0.8, 1, 1);

     for (let s = 0; s < sides; s++) {
        const angle = angleStep * s;
        const x = cX_left+(radius_c_x)*Math.cos(angle);
        const y = cY_left+(radius_c_y)*Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Color black
        colorData.push(0.5, 0.8, 1, 1);

        // Define the triangles, in counter clockwise order
        indexData.push(start_c_left);
        indexData.push(start_c_left+s + 1);
        indexData.push(((s + 2) <= sides) ? (start_c_left+s + 2) : (start_c_left+1));}


    
    //right star (shine)
    //creates 11 vertices and from there different triangles (10)
    const top_point_x_r = 80
    const top_point_y_r = 50
    const star_start = positionData.length / 2;   
    positionData.push(top_point_x_r, top_point_y_r-25);
    positionData.push(top_point_x_r, top_point_y_r);
    positionData.push(top_point_x_r-6, top_point_y_r-17);
    positionData.push(top_point_x_r-24, top_point_y_r-17.5);
    positionData.push(top_point_x_r-9.5, top_point_y_r-28);
    positionData.push(top_point_x_r-14.5, top_point_y_r-45); 
    positionData.push(top_point_x_r, top_point_y_r-35);
    positionData.push(top_point_x_r+14.5, top_point_y_r-45);
    positionData.push(top_point_x_r+9.5, top_point_y_r-28);
    positionData.push(top_point_x_r+24, top_point_y_r-17.5);
    positionData.push(top_point_x_r+6, top_point_y_r-17);

    for (let i = 0; i < 11; i++) {
        colorData.push(1, 1, 1, 1);
            }
    

    let star_sides = 10;

    for (let s = 0; s < star_sides; s++) {
        indexData.push(star_start);
        indexData.push(star_start + s + 1);
        indexData.push(((s + 2) <= star_sides) ? (star_start + s + 2) : (star_start + 1));
        };


    //left star (shine)
    const top_point_x = -40
    const top_point_y = 50
    const star_start2 = positionData.length / 2;   
    positionData.push(top_point_x, top_point_y-25);
    positionData.push(top_point_x, top_point_y);
    positionData.push(top_point_x-6, top_point_y-17);
    positionData.push(top_point_x-24, top_point_y-17.5);
    positionData.push(top_point_x-9.5, top_point_y-28);
    positionData.push(top_point_x-14.5, top_point_y-45); 
    positionData.push(top_point_x, top_point_y-35);
    positionData.push(top_point_x+14.5, top_point_y-45);
    positionData.push(top_point_x+9.5, top_point_y-28);
    positionData.push(top_point_x+24, top_point_y-17.5);
    positionData.push(top_point_x+6, top_point_y-17);
  
        
    for (let i = 0; i < 11; i++) {
        colorData.push(1, 1, 1, 1);
        }
    

    for (let s = 0; s < star_sides; s++) {
        indexData.push(star_start2);
        indexData.push(star_start2 + s + 1);
        indexData.push(((s + 2) <= star_sides) ? (star_start2 + s + 2) : (star_start2 + 1));
        };




    //Mouth
    const mouth_start = positionData.length/2;
    const mouthx = 0;
    const mouthy = -40;
    const sidesm = 100
    const radius_mouth = radius/2

    positionData.push (mouthx,mouthy) 
    colorData.push (0.8, 0.45, 0,1);

    for (let s = 0; s <=sidesm; s++) {
        const angle = Math.PI +(Math.PI/sidesm)*s;
        const x = mouthx +(radius_mouth)*Math.cos(angle);
        const y = mouthy +(radius_mouth)*Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        //color
        colorData.push (0.8, 0.45, 0,1);

        if (s<sidesm) {
            indexData.push (mouth_start);
            indexData.push (mouth_start+ s + 1);
            indexData.push (mouth_start+s+2);
        }
    }

    //Tongue
    const sidestongue = 100
    const tongue_bellow_start = positionData.length/2;
    const tongue_b_x = 0;
    const tongue_b_y = -90;
    const radius_tongue_b = radius/4

    positionData.push (tongue_b_x,tongue_b_y) 
    colorData.push (1, 0.6, 0.75,1);

    for (let s = 0; s <=sidestongue; s++) {
        const angle = Math.PI +(Math.PI/sidestongue)*s;
        const x = tongue_b_x +(radius_tongue_b)*Math.cos(angle);
        const y = tongue_b_y+(radius_tongue_b)*Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        //color
        colorData.push (1, 0.6, 0.75,1);

        if (s<sidestongue) {
            indexData.push (tongue_bellow_start);
            indexData.push (tongue_bellow_start+ s + 1);
            indexData.push (tongue_bellow_start+s+2);
        }
    }

    //shines 
    const shine_fill_1 = positionData.length/2;
    positionData.push(-120,-30);
    positionData.push(-150, -75);
    positionData.push(-90, -75);
    positionData.push(-120, -115);
        
    for (let i = 0; i < 4; i++) {
        colorData.push (0.8, 0.45, 0,1);
        }

    indexData.push(shine_fill_1, shine_fill_1 + 1, shine_fill_1 + 2);
    indexData.push(shine_fill_1 + 1, shine_fill_1 + 3, shine_fill_1 + 2);

       
    const shine_fill_2 = positionData.length/2;
    positionData.push(140,30);
    positionData.push(170, 75);
    positionData.push(110, 75);
    positionData.push(140, 115);
        
        
    for (let i = 0; i < 4; i++) {
        colorData.push (0.8, 0.45, 0,1);
        }

    indexData.push(shine_fill_2, shine_fill_2 + 1, shine_fill_2 + 2);
    indexData.push(shine_fill_2 + 1, shine_fill_2 + 3, shine_fill_2 + 2);


    




    

    // Build the final object with the arrays for positions, colors, and indices
    const arrays: twgl.Arrays = {
        a_position: { numComponents: 2, data: positionData },
        a_color:    { numComponents: 4, data: colorData },
        indices:    { numComponents: 3, data: indexData },
    };

    console.log(arrays);

    return arrays;
}

function diamond(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // A diamond shape
                size, 0,
                0, size,
                -size, 0,
                0, -size,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
            ]
        }
    };

    return arrays;
}



function car2D() : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                -100,  -40,
                 -40,  -40,
                  40,  -40,
                 100,  -40,
                 100,  -20,
                  40,   10,
                 -40,   10,
                -100,   20,
                 -30,   40,
                  24,   30,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 6,      0, 6, 7,    // Car back
                1, 2, 5,      1, 5, 6,    // Car middle
                2, 3, 4,      2, 4, 5,    // Car front
                6, 5, 9,      6, 9, 8     // Car top
            ]
        }
    }

    return arrays;
}


// Create the data for a cube where each face has a different color
function cubeFaceColors(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                // Front Face
                -1.0, -1.0,  1.0,
                 1.0, -1.0,  1.0,
                 1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0,  1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0, -1.0, -1.0,

                // Top face
                -1.0,  1.0, -1.0,
                -1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0,  1.0,
                -1.0, -1.0,  1.0,

                // Right face
                 1.0, -1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0,  1.0,  1.0,
                 1.0, -1.0,  1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0,  1.0, -1.0
            ].map(e => size * e)
        },
        a_normal: {
            numComponents: 3,
            data: [
                // Front Face
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,

                // Back face
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,

                // Top face
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,

                // Bottom face
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,

                // Right face
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,

                // Left face
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                // Front face
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                // Back Face
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                // Top Face
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                // Bottom Face
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                // Right Face
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                // Left Face
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 2,      0, 2, 3,    // Front face
                4, 5, 6,      4, 6, 7,    // Back face
                8, 9, 10,     8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15, // Bottom face
                16, 17, 18,   16, 18, 19, // Right face
                20, 21, 22,   20, 22, 23  // Left face
            ]
        }
    };

    return arrays;
}

// Create the data for a cube with each vertex in a different color
function cubeVertexColors(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                 1,  1,  1, // v_0
                 1, -1,  1, // v_1
                -1, -1,  1, // v_2
                -1,  1,  1, // v_3
                 1,  1, -1, // v_4
                 1, -1, -1, // v_5
                -1, -1, -1, // v_6
                -1,  1, -1, // v_7
            ].map(e => size * e)
        },
        a_color: {
            numComponents: 4,
            data: [
                1, 1, 1, 1, // v_0
                1, 0, 0, 1, // v_1
                0, 1, 0, 1, // v_2
                0, 0, 1, 1, // v_3
                0, 0, 0, 1, // v_4
                1, 1, 0, 1, // v_5
                0, 1, 1, 1, // v_6
                1, 0, 1, 1, // v_7
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 2, 1,
                2, 0, 3,
                // Top face
                0, 5, 4,
                5, 0, 1,
                // Left face
                1, 6, 5,
                6, 1, 2,
                // Right face
                0, 7, 3,
                7, 0, 4,
                // Bottom face
                2, 7, 6,
                7, 2, 3,
                // Back face
                4, 6, 7,
                6, 4, 5,
            ]
        }
    };

    return arrays;
}

// Create the data for a cube with vertex coordinates
function cubeTextured(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                // Front Face
                -1.0, -1.0,  1.0,
                 1.0, -1.0,  1.0,
                 1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0,  1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0, -1.0, -1.0,

                // Top face
                -1.0,  1.0, -1.0,
                -1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0,  1.0,
                -1.0, -1.0,  1.0,

                // Right face
                 1.0, -1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0,  1.0,  1.0,
                 1.0, -1.0,  1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0,  1.0, -1.0
            ].map(e => size * e)
        },
        a_normal: {
            numComponents: 3,
            data: [
                // Front Face
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,

                // Back face
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,

                // Top face
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,

                // Bottom face
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,

                // Right face
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,

                // Left face
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                // Front face
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                // Back Face
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                // Top Face
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                // Bottom Face
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                // Right Face
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                // Left Face
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
            ]
        },
        a_texCoord: {
            numComponents: 2,
            data: [
                // Front Face
                0.0, 0.0,
                1.0, 0.0,
                1.0,  1.0,
                0.0, 1.0,

                // Back face
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,

                // Top face
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,

                // Bottom face
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,

                // Right face
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0,
                0.0, 0.0,

                // Left face
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 2,      0, 2, 3,    // Front face (triangles)
                4, 5, 6,      4, 6, 7,    // Back face
                8, 9, 10,     8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15, // Bottom face
                16, 17, 18,   16, 18, 19, // Right face
                20, 21, 22,   20, 22, 23  // Left face
            ]
        }
    };

    return arrays;
}

export { shapeF, diamond, cubeFaceColors, cubeVertexColors, cubeTextured,
         car2D, smiley, shapeF_centered };
