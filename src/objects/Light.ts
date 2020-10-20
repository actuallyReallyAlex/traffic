import * as THREE from "three";
import { DirectionalLight } from "three";

class Light {
  constructor() {
    const object = this.creratObject();
    this.object = object;
  }

  object: DirectionalLight;

  creratObject() {
    const color = 0xffffff;
    const intensity = 1;
    const object = new THREE.DirectionalLight(color, intensity);
    object.position.set(-1, 2, 4);
    return object;
  }
}

export default Light;
