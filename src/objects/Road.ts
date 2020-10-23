import * as THREE from "three";
import { CatmullRomCurve3, Mesh } from "three";

import settings from "../settings";

import {
  CustomRoadWireframe,
  CustomRoadMaterial,
  CustomRoadMesh,
  GUIParams,
} from "../types";

const fragmentShader = `
uniform vec3 uColor;
void main(){
    gl_FragColor = vec4(uColor,1.);
}
`;

const vertexShader = `
uniform float uTravelLength;
#include <getDistortion_vertex>
  void main(){
        vec3 transformed = position.xyz;
        
    float progress = (transformed.y + uTravelLength / 2.) / uTravelLength;
    vec3 distortion  = getDistortion(progress);
    transformed.x += distortion.x;
    transformed.z += distortion.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);
  }
`;

class Road {
  constructor(params: GUIParams) {
    this.points = 4;
    this.positions = [];
    this.splineHelperObjects = [];
    this.splines = { uniform: null };
    this.createObject(params);
  }

  object!: CustomRoadMesh;
  splineHelperObjects: any[];
  points: number;
  positions: any[];
  splines: { uniform: any };
  curve!: CatmullRomCurve3;
  wireframe!: CustomRoadWireframe;

  addSplineObject(position: any, i: number): Mesh {
    const geometry = new THREE.BoxBufferGeometry(20, 20, 20);
    const material = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });
    const object = new THREE.Mesh(geometry, material);

    const objectPositions = [
      { x: 0, y: 25, z: 0 },
      { x: 25, y: 25, z: -125 },
      { x: 25, y: 25, z: -250 },
      { x: 0, y: 25, z: -375 },
    ];

    if (position) {
      object.position.copy(position);
    } else {
      object.position.set(
        objectPositions[i].x,
        objectPositions[i].y,
        objectPositions[i].z
      );
      // object.position.x = 0;
      // object.position.y = 25;
      // object.position.z = i * -125;
    }

    object.castShadow = true;
    object.receiveShadow = true;
    this.splineHelperObjects.push(object);
    return object;
  }

  createObject(params: GUIParams): void {
    for (let i = 0; i < this.points; i++) {
      this.addSplineObject(this.positions[i], i);
    }

    for (let j = 0; j < this.points; j++) {
      this.positions.push(this.splineHelperObjects[j].position);
    }

    console.log({ roadPositions: this.positions });

    const curve = new THREE.CatmullRomCurve3(
      this.positions,
      undefined,
      "catmullrom"
    );
    this.curve = curve;
    const points = curve.getPoints(50);

    const geometry = new THREE.PlaneBufferGeometry(
      settings.width,
      settings.length,
      20,
      200
    );

    const wireframegeo = new THREE.WireframeGeometry(geometry);
    const wireframemat: CustomRoadMaterial = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uColor: new THREE.Uniform(new THREE.Color("green")),
        uTime: new THREE.Uniform(0),
        uTravelLength: new THREE.Uniform(settings.length),
        uDistortionX: new THREE.Uniform(
          new THREE.Vector2(
            params.horizontalDistortionX,
            params.horizontalDistortionY
          )
        ),
        uDistortionY: new THREE.Uniform(
          new THREE.Vector2(
            params.verticalDistortionX,
            params.verticalDistortionY
          )
        ),
      },
    });
    const wireframe = new THREE.Line(wireframegeo, wireframemat);

    wireframe.rotation.x = -Math.PI / 2;
    wireframe.position.z = -settings.length / 2;
    this.wireframe = wireframe;

    const material: CustomRoadMaterial = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uColor: new THREE.Uniform(new THREE.Color("#101012")),
        uTime: new THREE.Uniform(0),
        uTravelLength: new THREE.Uniform(settings.length),
        uDistortionX: new THREE.Uniform(
          new THREE.Vector2(
            params.horizontalDistortionX,
            params.horizontalDistortionY
          )
        ),
        uDistortionY: new THREE.Uniform(
          new THREE.Vector2(
            params.verticalDistortionX,
            params.verticalDistortionY
          )
        ),
      },
    });

    wireframemat.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        `
      #define PI 3.14159265358979
        uniform vec2 uDistortionX;
        uniform vec2 uDistortionY;
      
          float nsin(float val){
          return sin(val) * 0.5+0.5;
          }
        vec3 getDistortion(float progress){
              progress = clamp(progress, 0.,1.);
              float xAmp = uDistortionX.r;
              float xFreq = uDistortionX.g;
              float yAmp = uDistortionY.r;
              float yFreq = uDistortionY.g;
              return vec3( 
                  xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,
                  yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,
                  0.
              );
          }
      `
      );
    };

    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <getDistortion_vertex>",
        `
      #define PI 3.14159265358979
        uniform vec2 uDistortionX;
        uniform vec2 uDistortionY;
      
          float nsin(float val){
          return sin(val) * 0.5+0.5;
          }
        vec3 getDistortion(float progress){
              progress = clamp(progress, 0.,1.);
              float xAmp = uDistortionX.r;
              float xFreq = uDistortionX.g;
              float yAmp = uDistortionY.r;
              float yFreq = uDistortionY.g;
              return vec3( 
                  xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,
                  yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,
                  0.
              );
          }
      `
      );
    };

    const object = new THREE.Mesh(geometry, material);

    object.rotation.x = -Math.PI / 2;
    object.position.z = -settings.length / 2;

    this.object = object;
  }
}

export default Road;
