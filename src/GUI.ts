import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import App from "./App";
import CarLights from "./objects/CarLights";
import settings from "./settings";

import { carLightColors } from "./constants";

import { CarLightColor, CarLightsDirection } from "./types";

class ApplicationGUI {
  constructor(application: App) {
    this.application = application;
    this.gui = new GUI();
    this.initializeGUI();
  }

  application: App;
  gui: any;

  initializeGUI() {
    // * Create Folders
    const leftLightsFolder = this.gui.addFolder("Left Lights");
    const rightLightsFolder = this.gui.addFolder("Right Lights");

    // * Left Lights Color Select
    const leftLightsColorSelect = leftLightsFolder.add(
      this.application.params,
      "leftLightsColor",
      carLightColors
    );
    leftLightsColorSelect.name("color");
    leftLightsColorSelect.onChange((colorValue: CarLightColor) => {
      this.application.scene.remove(this.application.leftLights.object);
      this.application.leftLights = new CarLights(colorValue, -60);
      this.application.leftLights.object.position.setX(
        -settings.roadWidth / 2 - settings.islandWidth / 2
      );
      this.application.scene.add(this.application.leftLights.object);
    });

    // * Left Lights Direction
    const leftLightsDirection = leftLightsFolder.add(
      this.application.params,
      "leftLightsDirection",
      { away: "away", toward: "toward" }
    );
    leftLightsDirection.name("direction");
    leftLightsDirection.onChange((direction: CarLightsDirection) => {
      this.application.leftLights.object.material.uniforms.uSpeed = new THREE.Uniform(
        direction === "away"
          ? this.application.params.leftLightsSpeed
          : -this.application.params.leftLightsSpeed
      );
    });

    // * Left Lights Speed
    const leftLightsSpeed = leftLightsFolder.add(
      this.application.params,
      "leftLightsSpeed",
      0,
      100
    );
    leftLightsSpeed.name("speed");
    leftLightsSpeed.onChange((speedValue: number) => {
      this.application.leftLights.object.material.uniforms.uSpeed = new THREE.Uniform(
        this.application.params.leftLightsDirection === "away"
          ? speedValue
          : -speedValue
      );
    });

    // * Right Lights Direction
    const rightLightsDirection = rightLightsFolder.add(
      this.application.params,
      "rightLightsDirection",
      { away: "away", toward: "toward" }
    );
    rightLightsDirection.name("direction");
    rightLightsDirection.onChange((direction: CarLightsDirection) => {
      this.application.rightLights.object.material.uniforms.uSpeed = new THREE.Uniform(
        direction === "away"
          ? this.application.params.rightLightsSpeed
          : -this.application.params.rightLightsSpeed
      );
    });

    // * Right Lights Speed
    const rightLightsSpeed = rightLightsFolder.add(
      this.application.params,
      "rightLightsSpeed",
      0,
      100
    );
    rightLightsSpeed.name("speed");
    rightLightsSpeed.onChange((speedValue: number) => {
      this.application.rightLights.object.material.uniforms.uSpeed = new THREE.Uniform(
        this.application.params.rightLightsDirection === "away"
          ? speedValue
          : -speedValue
      );
    });

    // * Right Lights Color Select
    const rightLightsColorSelect = rightLightsFolder.add(
      this.application.params,
      "rightLightsColor",
      carLightColors
    );
    rightLightsColorSelect.name("color");
    rightLightsColorSelect.onChange((colorValue: CarLightColor) => {
      this.application.scene.remove(this.application.rightLights.object);
      this.application.rightLights = new CarLights(colorValue, 60);
      this.application.rightLights.object.position.setX(
        settings.roadWidth / 2 + settings.islandWidth / 2
      );
      this.application.scene.add(this.application.rightLights.object);
    });

    // * Open folders
    leftLightsFolder.open();
    rightLightsFolder.open();
  }
}

export default ApplicationGUI;
