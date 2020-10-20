import * as THREE from "three";

import init from "./init";

import Light from "./objects/Light";
import Road from "./objects/Road";
import CarLights from "./objects/CarLights";
import settings from "./settings";
import { Clock, PerspectiveCamera, Renderer, Scene } from "three";

function lerp(current: number, target: number, speed = 0.1, limit = 0.001) {
  let change = (target - current) * speed;
  if (Math.abs(change) < limit) {
    change = target - current;
  }
  return change;
}

class App {
  constructor() {
    this.fovTarget = 90;
    this.speedUpTarget = 0;
    this.speedUp = 0;
    this.timeOffset = 0;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.clock = new THREE.Clock();
    this.canvasContainer = document.createElement("div");
    this.canvasContainer.id = "canvas-container";
    this.rootContainer = document.getElementById("root");

    if (!this.rootContainer) {
      throw new Error("No root container!");
    }
    this.rootContainer.appendChild(this.canvasContainer);
    this.rootContainer.addEventListener("mousedown", this.onMouseDown);
    this.rootContainer.addEventListener("mouseup", this.onMouseUp);
    this.rootContainer.addEventListener("mouseout", this.onMouseUp);

    const { camera, renderer, scene } = init();
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;

    // setupCameraInput(camera);

    this.light = new Light();
    this.road = new Road();
    this.leftLights = new CarLights("#fafafa", -60);
    this.rightLights = new CarLights("#ff102a", 60);

    scene.add(this.light.object);
    scene.add(this.road.object);
    scene.add(this.leftLights.object);
    scene.add(this.rightLights.object);

    // TODO - Really understand what the heck is happening here
    this.tick = this.tick.bind(this);
    this.initApplication = this.initApplication.bind(this);

    // ! Won't work this wayu
    // this.tick.bind(this)
    // this.initApplication.bind(this)
  }

  camera: PerspectiveCamera;

  clock: Clock;

  canvasContainer: HTMLElement;

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

  onMouseDown() {
    this.speedUpTarget = 0.1;
    this.fovTarget = 140;
  }

  onMouseUp() {
    this.speedUpTarget = 0;
    this.fovTarget = 90;
  }

  tick() {
    if (!this) return;
    const canvas = this.renderer.domElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    // cube.object.rotation.x += 0.01;
    // cube.object.rotation.y += 0.01;

    const delta = this.clock.getDelta();

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
