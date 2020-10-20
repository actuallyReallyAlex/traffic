import * as THREE from "three";
import { Mesh } from "three";

import settings from "../settings";

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
  constructor() {
    this.createObject();
  }

  object!: Mesh;

  createObject() {
    const geometry = new THREE.PlaneBufferGeometry(
      settings.width,
      settings.length,
      20,
      200
    );

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uColor: new THREE.Uniform(new THREE.Color("#101012")),
        uTime: new THREE.Uniform(0),
        uTravelLength: new THREE.Uniform(settings.length),
        uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
        uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5)),
      },
    });

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
