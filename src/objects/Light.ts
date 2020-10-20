import * as THREE from "three";
import { DirectionalLight } from "three";

class Light {
  constructor() {
    this.creratObject();
  }

  object!: DirectionalLight;

  creratObject() {
    const color = 0xffffff;
    const intensity = 1;
    const object = new THREE.DirectionalLight(color, intensity);
    object.position.set(-1, 2, 4);

    this.object = object;
  }
}

export default Light;
