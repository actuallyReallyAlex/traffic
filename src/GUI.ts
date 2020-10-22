import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import App from "./App";
import CarLights from "./objects/CarLights";
import settings from "./settings";

import { carLightColors } from "./constants";

import { ApplicationInput, CarLightColor, CarLightsDirection } from "./types";

class ApplicationGUI {
  constructor(application: App) {
    this.application = application;
    this.gui = new GUI();
    // * Create Folders
    const leftLightsFolder = this.gui.addFolder("Left Lights");
    const rightLightsFolder = this.gui.addFolder("Right Lights");
    const horizontalDistortionFolder = this.gui.addFolder(
      "Horizontal Distortion"
    );
    const verticalDistortionFolder = this.gui.addFolder(
      "Vertical Distortion"
    );
    // * Open folders
    leftLightsFolder.open();
    rightLightsFolder.open();
    horizontalDistortionFolder.open();
    verticalDistortionFolder.open();

    this.inputs = [
      // * Left Car Lights
      {
        folder: leftLightsFolder,
        name: "color",
        onChange: (colorValue: CarLightColor) => {
          this.application.leftLights.object.material.uniforms.uColor = new THREE.Uniform(
            new THREE.Color(colorValue)
          );
        },
        paramKey: "leftLightsColor",
        value: carLightColors,
      },
      {
        folder: leftLightsFolder,
        name: "direction",
        onChange: (direction: CarLightsDirection) => {
          this.application.leftLights.object.material.uniforms.uSpeed = new THREE.Uniform(
            direction === "away"
              ? this.application.params.leftLightsSpeed
              : -this.application.params.leftLightsSpeed
          );
        },
        paramKey: "leftLightsDirection",
        value: { away: "away", toward: "toward" },
      },
      {
        folder: leftLightsFolder,
        name: "speed",
        onChange: (speedValue: number) => {
          this.application.leftLights.object.material.uniforms.uSpeed = new THREE.Uniform(
            this.application.params.leftLightsDirection === "away"
              ? speedValue
              : -speedValue
          );
        },
        paramKey: "leftLightsSpeed",
        value: 0,
        value2: 100,
      },
      // * Right Car Lights
      {
        folder: rightLightsFolder,
        name: "color",
        onChange: (colorValue: CarLightColor) => {
          this.application.rightLights.object.material.uniforms.uColor = new THREE.Uniform(
            new THREE.Color(colorValue)
          );
        },
        paramKey: "rightLightsColor",
        value: carLightColors,
      },
      {
        folder: rightLightsFolder,
        name: "direction",
        onChange: (direction: CarLightsDirection) => {
          this.application.rightLights.object.material.uniforms.uSpeed = new THREE.Uniform(
            direction === "away"
              ? this.application.params.rightLightsSpeed
              : -this.application.params.rightLightsSpeed
          );
        },
        paramKey: "rightLightsDirection",
        value: { away: "away", toward: "toward" },
      },
      {
        folder: rightLightsFolder,
        name: "speed",
        onChange: (speedValue: number) => {
          this.application.rightLights.object.material.uniforms.uSpeed = new THREE.Uniform(
            this.application.params.rightLightsDirection === "away"
              ? speedValue
              : -speedValue
          );
        },
        paramKey: "rightLightsSpeed",
        value: 0,
        value2: 100,
      },
      // * Horizontal Distortion
      {
        folder: horizontalDistortionFolder,
        name: "x",
        onChange: (xValue: number) => {
          this.application.leftLights.object.material.uniforms.uDistortionX = new THREE.Uniform(
            new THREE.Vector2(
              xValue,
              this.application.params.horizontalDistortionY
            )
          );
          this.application.rightLights.object.material.uniforms.uDistortionX = new THREE.Uniform(
            new THREE.Vector2(
              xValue,
              this.application.params.horizontalDistortionY
            )
          );
          this.application.road.object.material.uniforms.uDistortionX = new THREE.Uniform(
            new THREE.Vector2(
              xValue,
              this.application.params.horizontalDistortionY
            )
          );
        },
        paramKey: "horizontalDistortionX",
        value: -100,
        value2: 100,
      },
      {
        folder: horizontalDistortionFolder,
        name: "y",
        onChange: (yValue: number) => {
          this.application.leftLights.object.material.uniforms.uDistortionX = new THREE.Uniform(
            new THREE.Vector2(
              this.application.params.horizontalDistortionX,
              yValue
            )
          );
          this.application.rightLights.object.material.uniforms.uDistortionX = new THREE.Uniform(
            new THREE.Vector2(
              this.application.params.horizontalDistortionX,
              yValue
            )
          );
          this.application.road.object.material.uniforms.uDistortionX = new THREE.Uniform(
            new THREE.Vector2(
              this.application.params.horizontalDistortionX,
              yValue
            )
          );
        },
        paramKey: "horizontalDistortionY",
        value: 1,
        value2: 5,
      },
      // * Vertical Distortion
      {
        folder: verticalDistortionFolder,
        name: "x",
        onChange: (xValue: number) => {
          this.application.leftLights.object.material.uniforms.uDistortionY = new THREE.Uniform(
            new THREE.Vector2(
              xValue,
              this.application.params.verticalDistortionY
            )
          );
          this.application.rightLights.object.material.uniforms.uDistortionY = new THREE.Uniform(
            new THREE.Vector2(
              xValue,
              this.application.params.verticalDistortionY
            )
          );
          this.application.road.object.material.uniforms.uDistortionY = new THREE.Uniform(
            new THREE.Vector2(
              xValue,
              this.application.params.verticalDistortionY
            )
          );
        },
        paramKey: "verticalDistortionX",
        value: -100,
        value2: 100,
      },
      {
        folder: verticalDistortionFolder,
        name: "y",
        onChange: (yValue: number) => {
          this.application.leftLights.object.material.uniforms.uDistortionY = new THREE.Uniform(
            new THREE.Vector2(
              this.application.params.verticalDistortionX,
              yValue
            )
          );
          this.application.rightLights.object.material.uniforms.uDistortionY = new THREE.Uniform(
            new THREE.Vector2(
              this.application.params.verticalDistortionX,
              yValue
            )
          );
          this.application.road.object.material.uniforms.uDistortionY = new THREE.Uniform(
            new THREE.Vector2(
              this.application.params.verticalDistortionX,
              yValue
            )
          );
        },
        paramKey: "verticalDistortionY",
        value: 1,
        value2: 5,
      },
    ];
    this.initializeGUI();
  }

  application: App;
  gui: any;
  inputs: ApplicationInput[];

  initializeGUI() {
    this.inputs.forEach((input) => {
      const inputElement = input.folder.add(
        this.application.params,
        input.paramKey,
        input.value,
        input.value2
      );
      inputElement.name(input.name);
      inputElement.onChange(input.onChange);
    });
  }
}

export default ApplicationGUI;
