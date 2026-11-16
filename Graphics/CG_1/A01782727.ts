//Aixa Elenka Mendoza Filisola
//This code implements a 2d WebGl scene where a smiley face can be translated (Around a pivot point(diamond)), rotated and scaled.
//It also provides a UI menu to allow the user to modify this values

//imports and libraries:
'use strict';
import * as twgl from 'twgl-base.js';
import GUI from 'lil-gui';
import { diamond, smiley } from '../libs/shapes.js';
import { V2, M3, type Vec2, type Mat3 } from '../libs/2d-lib.js'; 
import { Scene } from '../libs/scene.js';
import { type Color } from '../libs/color.js';

//Shaders
import vsGLSL from './vs_matrices_vcolores.glsl?raw';
import fsGLSL from './fs_vertex_colores.glsl?raw';


class RotationScene extends Scene {
    constructor(gl: WebGL2RenderingContext) {
        super(gl, vsGLSL, fsGLSL);

        // Creates the main object, smiley face
        const model = this.addObject('model', smiley(150),
            [ Math.random(), Math.random(), Math.random(), 1 ]);
        model.transforms.t.x = gl.canvas.width / 2;
        model.transforms.t.y = gl.canvas.height / 2;
        //Creates the pivot point
        const pivot = this.addObject('pivot', diamond(5),
            [ 0.6, 0.6, 0.6, 1]);
        pivot.transforms.t.x = gl.canvas.width / 2;
        pivot.transforms.t.y = gl.canvas.height / 2;
    }

    //Dropdown options

    setting = { transformOrder: 's->t->r'};
    objstrings = { 
        's->r->t':'srt',
        's->t->r':'str',
        't->s->r':'tsr',
        'r->t->s':'rts',
        'r->s->t':'rst'


    }
    // Method to render the scene on the canvas.
    protected render(): void {
        const { gl, programInfo } = this;
        const model = this.getObject('model');
        const pivot = this.getObject('pivot');

        // Vectors to the position of the model
        const v2_trans: Vec2 = V2.create(model.transforms.t.x, model.transforms.t.y);
        const v2_scale: Vec2 = V2.create(model.transforms.s.x, model.transforms.s.y);

        // Vector to translate the pivot to the center of the world
        const v2_pivot_to_center: Vec2 = V2.create(-pivot.transforms.t.x,
                                                   -pivot.transforms.t.y);
        // Vector to translate the pivot back to its original position
        const v2_center_to_pivot: Vec2 = V2.create(pivot.transforms.t.x,
                                                   pivot.transforms.t.y);

        gl.useProgram(programInfo.program);

        // Transform matrices for the model
        //Translates the model to its original position
        const translateMatrixmodel: Mat3 = M3.translation(v2_trans);
        //changes its size
        const scaleMatrixmodel: Mat3 = M3.scale(v2_scale);
        //moves pivot to origin
        const firstTrans: Mat3 =M3.translation (v2_pivot_to_center);
        //rotates the model around the origin
        const rotateMatrixmodel: Mat3 = M3.rotation(model.transforms.rr.z);
        //moves the pivot back to its position
        const rotate2: Mat3 =M3.translation(v2_center_to_pivot);

        //combine matrices 
        let modelRotate: Mat3 =M3.multiply(rotateMatrixmodel, firstTrans);
        modelRotate =M3.multiply (rotate2, modelRotate);
        let modelTransforms: Mat3 = M3.identity();

        if (this.setting.transformOrder === 's->r->t'){
            modelTransforms = M3.multiply(scaleMatrixmodel, modelTransforms); 
            modelTransforms = M3.multiply(modelRotate, modelTransforms);
            modelTransforms = M3.multiply(translateMatrixmodel, modelTransforms);

        }

        else if (this.setting.transformOrder === 's->t->r'){
            modelTransforms = M3.multiply(scaleMatrixmodel, modelTransforms); 
            modelTransforms = M3.multiply(translateMatrixmodel, modelTransforms);
            modelTransforms = M3.multiply(modelRotate, modelTransforms);
        }

        else if (this.setting.transformOrder === 't->s->r'){
            modelTransforms = M3.multiply(translateMatrixmodel, modelTransforms);
            modelTransforms = M3.multiply(scaleMatrixmodel, modelTransforms); 
            modelTransforms = M3.multiply(modelRotate, modelTransforms);
        }

        else if (this.setting.transformOrder === 'r->t->s'){
            modelTransforms = M3.multiply(modelRotate, modelTransforms);
            modelTransforms = M3.multiply(translateMatrixmodel, modelTransforms);
            modelTransforms = M3.multiply(scaleMatrixmodel, modelTransforms);  
        }

        else if (this.setting.transformOrder === 'r->s->t'){
            modelTransforms = M3.multiply(modelRotate, modelTransforms);
            modelTransforms = M3.multiply(scaleMatrixmodel, modelTransforms);  
            modelTransforms = M3.multiply(translateMatrixmodel, modelTransforms);
        }

    
        //Sends to the shader
        let uniforms = {
            u_resolution: [gl.canvas.width, gl.canvas.height],
            u_transforms: modelTransforms,
            u_color: model.color,
        };
        twgl.setUniforms(programInfo, uniforms);
        gl.bindVertexArray(model.vao);
        twgl.drawBufferInfo(gl, model.bufferInfo);

        // Transform matrices for the pivot
        const translateMatrixPivot: Mat3 = M3.translation(v2_center_to_pivot);

        // Composite transform matrix for the pivot (only translation)
        let pivotTransforms: Mat3 = M3.identity();
        pivotTransforms = M3.multiply(translateMatrixPivot, pivotTransforms);

        uniforms = {
            u_resolution: [gl.canvas.width, gl.canvas.height],
            u_transforms: pivotTransforms,
            u_color: pivot.color,
        };
        twgl.setUniforms(programInfo, uniforms);
        gl.bindVertexArray(pivot.vao);
        twgl.drawBufferInfo(gl, pivot.bufferInfo);
    }

    //UI menu set up
    setupUI(): void {
        const { gl } = this;
        const model = this.getObject('model');
        const pivot = this.getObject('pivot');

        const gui = new GUI();

        const modelFolder = gui.addFolder('Model');
        const opFolder = modelFolder.addFolder('Op');
        opFolder.add(this.setting, 'transformOrder', Object.keys(this.objstrings)).name('Transformation Order').onChange ((value:string)=> {this.setting.transformOrder= value;})


        const traFolder = modelFolder.addFolder('Translation');
        traFolder.add(model.transforms.t, 'x', 0, gl.canvas.width)
            .onChange((value: number) => {
                model.transforms.t.x = value;
            });
        traFolder.add(model.transforms.t, 'y', 0, gl.canvas.height)
            .onChange((value: number) => {
                model.transforms.t.y = value;
            });

        const rotFolder = modelFolder.addFolder('Rotation');
        rotFolder.add(model.transforms.rr, 'z', 0, Math.PI * 2)
            .onChange((value: number) => {
                model.transforms.rr.z = value;
            });

        const scaFolder = modelFolder.addFolder('Scale');
        scaFolder.add(model.transforms.s, 'x', -5, 5)
            .onChange((value: number) => {
                model.transforms.s.x = value;
            });
        scaFolder.add(model.transforms.s, 'y', -5, 5)
            .onChange((value: number) => {
                model.transforms.s.y = value;
            });


        const pivotFolder = gui.addFolder('Pivot');
        const pivotTraFolder = pivotFolder.addFolder('Translation');
        pivotTraFolder.add(pivot.transforms.t, 'x', 0, gl.canvas.width)
            .onChange((value: number) => {
                pivot.transforms.t.x = value;
            });
        pivotTraFolder.add(pivot.transforms.t, 'y', 0, gl.canvas.height)
            .onChange((value: number) => {
                pivot.transforms.t.y = value;
            });
    }
}

/*
 * Main function to initialize the WebGL context, create the scene, and set up the UI.
 */
function main(): void {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
        throw new Error('No canvas element found in the document');
    }

    const gl = canvas.getContext('webgl2');
    if (!gl) {
        throw new Error('WebGL2 is not supported by this browser');
    }

    const scene = new RotationScene(gl);
    scene.setupUI();
    scene.draw(0);
}

main()
