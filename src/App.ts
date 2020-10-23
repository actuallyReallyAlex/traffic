import {
  Clock,
  GridHelper,
  Line,
  PerspectiveCamera,
  Renderer,
  Scene,
} from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

import FollowCamera from "./cameras/FollowCamera";

import CameraTrack from "./objects/CameraTrack";
import CarLights from "./objects/CarLights";
import Light from "./objects/Light";
import Road from "./objects/Road";

import ApplicationGUI from "./GUI";
import init from "./init";
import { lerp } from "./util";
import settings from "./settings";

import { GUIParams } from "./types";

class App {
  constructor() {
    const { camera, clock, renderer, scene } = init();
    this.params = {
      follow: false,
      // horizontalDistortionX: 80,
      horizontalDistortionX: 0,
      // horizontalDistortionY: 3,
      horizontalDistortionY: 1,
      leftLightsColor: "white",
      leftLightsDirection: "toward",
      leftLightsSpeed: 50,
      rightLightsColor: "red",
      rightLightsDirection: "away",
      rightLightsSpeed: 50,
      verticalDistortionX: 0,
      verticalDistortionY: 1,
      // verticalDistortionX: -40,
      // verticalDistortionY: 2.5,
    };

    this.camera = camera;
    this.cameraTrack = new CameraTrack();
    this.canvasContainer = document.getElementById("canvas-container");
    this.clock = clock;
    this.followCamera = new FollowCamera();
    this.fovTarget = 90;
    this.gui = new ApplicationGUI(this);
    this.helper = new THREE.GridHelper(2000, 100);
    this.leftLights = new CarLights(this.params, "left");
    this.light = new Light();
    this.renderer = renderer;
    this.rightLights = new CarLights(this.params, "right");
    this.road = new Road(this.params);
    this.rootContainer = document.getElementById("root");
    this.scene = scene;
    this.speedUpTarget = 0;
    this.speedUp = 0;
    this.stats = Stats();
    this.timeOffset = 0;

    // this.onMouseDown = this.onMouseDown.bind(this);
    // this.onMouseUp = this.onMouseUp.bind(this);

    // this.rootContainer.addEventListener("mousedown", this.onMouseDown);
    // this.rootContainer.addEventListener("mouseup", this.onMouseUp);
    // this.rootContainer.addEventListener("mouseout", this.onMouseUp);

    // TODO - Really understand what the heck is happening here
    // * Bindings
    this.tick = this.tick.bind(this);
    this.initApplication = this.initApplication.bind(this);
  }

  camera: PerspectiveCamera;
  cameraTrack: CameraTrack;
  canvasContainer: HTMLElement | null;
  clock: Clock;
  controls!: OrbitControls;
  curveObject!: Line;
  followCamera: FollowCamera;
  fovTarget: number;
  gui: ApplicationGUI;
  helper: GridHelper;
  leftLights: CarLights;
  light: Light;
  params: GUIParams;
  renderer: Renderer;
  rightLights: CarLights;
  road: Road;
  rootContainer: HTMLElement | null;
  scene: Scene;
  speedUp: number;
  speedUpTarget: number;
  stats: Stats;
  timeOffset: number;

  initApplication(): void {
    if (!this.canvasContainer) {
      throw new Error("No canvas container!");
    }
    if (!this.rootContainer) {
      throw new Error("No root container!");
    }

    // * Add objects to scene
    this.scene.add(this.cameraTrack.object);
    this.scene.add(this.followCamera.cameraHelper);
    this.scene.add(this.followCamera.parentObject);
    this.scene.add(this.helper);
    this.scene.add(this.leftLights.object);
    this.scene.add(this.light.object);
    this.scene.add(this.road.object);
    this.scene.add(this.rightLights.object);
    // * Individual points on the Camera Tack curve
    this.cameraTrack.splineHelperObjects.forEach((splineHelperObject) =>
      this.scene.add(splineHelperObject)
    );

    // TODO - Move this into CarLights.ts
    // * Move left lights to the left of center
    this.leftLights.object.position.setX(
      -settings.roadWidth / 2 - settings.islandWidth / 2
    );
    // * Move right lights to the right of center
    this.rightLights.object.position.setX(
      settings.roadWidth / 2 + settings.islandWidth / 2
    );

    // * Shift helper to lower space
    this.helper.position.y = -199;

    // * Scene background color
    this.scene.background = new THREE.Color(0xf0f0f0);

    // * Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // * Place Stats in Document
    this.rootContainer.appendChild(this.stats.dom);
    // * Place Canvas in Document
    this.canvasContainer.append(this.renderer.domElement);

    this.tick();
  }

  render(delta: number): void {
    this.renderer.render(
      this.scene,
      this.params.follow ? this.followCamera.camera : this.camera
    );
  }

  // onMouseDown() {
  // this.speedUpTarget = 0.1;
  // this.fovTarget = 140;
  // }

  // onMouseUp() {
  // this.speedUpTarget = 0;
  // this.fovTarget = 90;
  // }

  tick(): void {
    if (!this) return;
    const canvas = this.renderer.domElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();

    const delta = this.clock.getDelta();

    this.stats.update();

    // * Animate Camera along CameraTrack
    const time = Date.now();
    const looptime = 20 * 1000;
    const t = (time % looptime) / looptime;

    const curvePosition = this.cameraTrack.curve.getPointAt(t);

    this.followCamera.camera.position.set(
      curvePosition.x,
      curvePosition.y,
      curvePosition.z
    );
    this.followCamera.cameraEye.position.set(
      curvePosition.x,
      curvePosition.y,
      curvePosition.z
    );

    this.render(delta);
    this.update(delta);
    requestAnimationFrame(this.tick);
  }

  update(delta: number): void {
    const coefficient = -60 * Math.log2(1 - 0.1);
    const lerpT = Math.exp(-coefficient * delta);
    this.speedUp += lerp(
      this.speedUp,
      this.speedUpTarget,
      // 10% each frame
      lerpT,
      0.00001
    );
    // Also frame-dependent
    this.timeOffset += this.speedUp * delta;

    const time = this.clock.elapsedTime + this.timeOffset;
    this.leftLights.update(time);
    this.rightLights.update(time);

    const fovChange = lerp(this.camera.fov, this.fovTarget, lerpT);
    if (fovChange !== 0) {
      this.camera.fov += fovChange * delta * 6;
      this.camera.updateProjectionMatrix();
    }
  }
}

export default App;
