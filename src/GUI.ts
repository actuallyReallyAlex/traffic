import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import App from "./App";
import CarLights from "./objects/CarLights";
import settings from "./settings";

import { carLightColors } from "./constants";

import { CarLightColor } from "./types";

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

    // * Add color selects
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
