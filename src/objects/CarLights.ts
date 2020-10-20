import * as THREE from "three";

import settings from "../settings";

import { CustomCarLightMaterial, CustomCarLightMesh } from "../types";

const fragmentShader = `
uniform vec3 uColor;
  void main() {
      vec3 color = vec3(uColor);
      gl_FragColor = vec4(color,1.);
  }
`;

const vertexShader = `
attribute vec3 aOffset;
attribute vec2 aMetrics;
uniform float uTime;
uniform float uSpeed;
uniform float uTravelLength;
#include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    
    float radius = aMetrics.r;
    float len = aMetrics.g;
    transformed.xy *= radius; 
    transformed.z *= len;

    float zOffset = uTime * uSpeed + aOffset.z;
    zOffset = len - mod(zOffset, uTravelLength);

    // transformed.z +=uTime * uSpeed;


    // Keep them separated to make the next step easier!
     transformed.z = transformed.z +zOffset ;
        transformed.xy += aOffset.xy;

        
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

  
        vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
        gl_Position = projectionMatrix * mvPosition;
  }
`;

class CarLights {
  constructor(color: string, speed: number) {
    this.createObject(color, speed);
  }

  object!: CustomCarLightMesh;

  createObject(color: string, speed: number) {
    const curve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    );
    const baseGeometry = new THREE.TubeBufferGeometry(curve, 25, 1, 8, false);
    const instanced = new THREE.InstancedBufferGeometry().copy(baseGeometry);
    instanced.instanceCount = settings.nPairs * 2;

    const aOffset = [];

    const sectionWidth = settings.roadWidth / settings.roadSections;

    for (let i = 0; i < settings.nPairs; i++) {
      const radius = 1;
      // 1a. Get it's lane index
      // Instead of random, keep lights per lane consistent
      const section = i % 3;

      // 1b. Get its lane's centered position
      const sectionX =
        section * sectionWidth - settings.roadWidth / 2 + sectionWidth / 2;
      const carWidth = 0.5 * sectionWidth;
      const offsetX = 0.5 * Math.random();

      const offsetY = radius * 1.3;

      const offsetZ = Math.random() * settings.length;

      aOffset.push(sectionX - carWidth / 2 + offsetX);
      aOffset.push(offsetY);
      aOffset.push(-offsetZ);

      aOffset.push(sectionX + carWidth / 2 + offsetX);
      aOffset.push(offsetY);
      aOffset.push(-offsetZ);
    }
    // Add the offset to the instanced geometry.
    instanced.setAttribute(
      "aOffset",
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
    );

    const aMetrics = [];
    for (let i = 0; i < settings.nPairs; i++) {
      // We give it a minimum value to make sure the lights aren't too thin or short.
      // Give it some randomness but keep it over 0.1
      const radius = Math.random() * 0.1 + 0.1;
      // Give it some randomness but keep it over length *0.02
      const length =
        Math.random() * settings.length * 0.08 + settings.length * 0.02;

      aMetrics.push(radius);
      aMetrics.push(length);

      aMetrics.push(radius);
      aMetrics.push(length);
    }
    instanced.setAttribute(
      "aMetrics",
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false)
    );

    const material: CustomCarLightMaterial = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uColor: new THREE.Uniform(new THREE.Color(color)),
        uTime: new THREE.Uniform(0),
        uTravelLength: new THREE.Uniform(settings.length),
        uSpeed: new THREE.Uniform(speed),
        uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
        uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5)),
      },
    });
    // ? Wonder how this changes the final render
    // material.side = THREE.DoubleSide;

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

    const object: CustomCarLightMesh = new THREE.Mesh(instanced, material);
    object.frustumCulled = false;

    this.object = object;
  }

  update(t: number) {
    // * t = time (delta)
    this.object.material.uniforms.uTime.value = t;
  }
}

export default CarLights;
