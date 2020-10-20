import * as THREE from "three";

import settings from "./settings";

const init = () => {
  // * Setup Clock
  const clock = new THREE.Clock();

  // * Setup scene
  const scene = new THREE.Scene();

  // * Setup camera
  const camera = new THREE.PerspectiveCamera(
    settings.fov,
    settings.aspect,
    settings.near,
    settings.far
  );
  camera.position.set(settings.initialX, settings.initialY, settings.initialZ);

  // * Setup renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const canvasContainer = document.getElementById("canvas-container");

  if (!canvasContainer) {
    throw new Error("No canvas container!");
  }

  renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

  return { camera, clock, renderer, scene };
};

export default init;
