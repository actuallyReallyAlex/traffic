import { Clock, PerspectiveCamera, Renderer, Scene } from "three";

import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import init from "./init";

import CarLights from "./objects/CarLights";
import Light from "./objects/Light";
import Road from "./objects/Road";

import settings from "./settings";
import { lerp } from "./util";

import { CarLightColor, CarLightColors, GUIParams } from "./types";

class App {
  constructor() {
    const { camera, clock, renderer, scene } = init();

    this.camera = camera;
    this.canvasContainer = document.getElementById("canvas-container");
    this.clock = clock;
    this.fovTarget = 90;
    this.leftLights = new CarLights("#fafafa", -60);
    this.light = new Light();
    this.speedUpTarget = 0;
    this.speedUp = 0;
    // this.onMouseDown = this.onMouseDown.bind(this);
    // this.onMouseUp = this.onMouseUp.bind(this);
    this.renderer = renderer;
    this.rightLights = new CarLights("#ff102a", 60);
    this.road = new Road();
    this.rootContainer = document.getElementById("root");
    this.scene = scene;
    this.timeOffset = 0;

    if (!this.rootContainer) {
      throw new Error("No root container!");
    }
    // this.rootContainer.addEventListener("mousedown", this.onMouseDown);
    // this.rootContainer.addEventListener("mouseup", this.onMouseUp);
    // this.rootContainer.addEventListener("mouseout", this.onMouseUp);

    this.stats = Stats();
    this.gui = new GUI();

    this.params = {
      leftLightsColor: "white",
      rightLightsColor: "red",
    };

    const guiFolderLeftLights = this.gui.addFolder("Left Lights");
    const guiFolderRightLights = this.gui.addFolder("Right Lights");
    // const guiFolderRoad = this.gui.addFolder("Road");

    const carLightColors: CarLightColors = {
      black: "black",
      blue: "blue",
      green: "green",
      red: "red",
      white: "white",
      yellow: "yellow",
    };

    guiFolderLeftLights
      .add(this.params, "leftLightsColor", carLightColors)
      .name("color")
      .onChange((val: CarLightColor) => {
        this.scene.remove(this.leftLights.object);
        this.leftLights = new CarLights(val, -60);
        this.leftLights.object.position.setX(
          -settings.roadWidth / 2 - settings.islandWidth / 2
        );
        this.scene.add(this.leftLights.object);
      });
    guiFolderRightLights
      .add(this.params, "rightLightsColor", carLightColors)
      .name("color")
      .onChange((val: CarLightColor) => {
        this.scene.remove(this.rightLights.object);
        this.rightLights = new CarLights(val, 60);
        this.rightLights.object.position.setX(
          settings.roadWidth / 2 + settings.islandWidth / 2
        );
        this.scene.add(this.rightLights.object);
      });

    guiFolderLeftLights.open();
    guiFolderRightLights.open();

    this.rootContainer.appendChild(this.stats.dom);

    // TODO - Really understand what the heck is happening here
    this.tick = this.tick.bind(this);
    this.initApplication = this.initApplication.bind(this);
  }

  stats: Stats;
  gui: any;
  params: GUIParams;

  camera: PerspectiveCamera;
  clock: Clock;
  canvasContainer: HTMLElement | null;
  fovTarget: number;
  leftLights: CarLights;
  light: Light;
  renderer: Renderer;
  rightLights: CarLights;
  road: Road;
  rootContainer: HTMLElement | null;
  scene: Scene;
  speedUp: number;
  speedUpTarget: number;
  timeOffset: number;

  initApplication() {
    if (!this.canvasContainer) {
      throw new Error("No canvas container!");
    }

    this.scene.add(this.light.object);
    this.scene.add(this.road.object);
    this.scene.add(this.leftLights.object);
    this.scene.add(this.rightLights.object);

    // * Move left lights to the left of center
    this.leftLights.object.position.setX(
      -settings.roadWidth / 2 - settings.islandWidth / 2
    );
    // * Move right lights to the right of center
    this.rightLights.object.position.setX(
      settings.roadWidth / 2 + settings.islandWidth / 2
    );

    this.canvasContainer.append(this.renderer.domElement);

    this.tick();
  }

  render(delta: number) {
    this.renderer.render(this.scene, this.camera);
  }

  // onMouseDown() {
  // this.speedUpTarget = 0.1;
  // this.fovTarget = 140;
  // }

  // onMouseUp() {
  // this.speedUpTarget = 0;
  // this.fovTarget = 90;
  // }

  tick() {
    if (!this) return;
    const canvas = this.renderer.domElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();

    const delta = this.clock.getDelta();

    this.stats.update();

    this.render(delta);
    this.update(delta);
    requestAnimationFrame(this.tick);
  }

  update(delta: number) {
    let coefficient = -60 * Math.log2(1 - 0.1);
    let lerpT = Math.exp(-coefficient * delta);
    this.speedUp += lerp(
      this.speedUp,
      this.speedUpTarget,
      // 10% each frame
      lerpT,
      0.00001
    );
    // Also frame-dependent
    this.timeOffset += this.speedUp * delta;

    let time = this.clock.elapsedTime + this.timeOffset;
    this.leftLights.update(time);
    this.rightLights.update(time);

    let fovChange = lerp(this.camera.fov, this.fovTarget, lerpT);
    if (fovChange !== 0) {
      this.camera.fov += fovChange * delta * 6;
      this.camera.updateProjectionMatrix();
    }
  }
}

export default App;
