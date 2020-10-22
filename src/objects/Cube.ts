import * as THREE from "three";
import { Mesh } from "three";

class Cube {
  constructor() {
    const object = this.createObject();
    this.object = object;
  }

  object: Mesh;

  createObject(): Mesh {
    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ color: "red" });
    const object = new THREE.Mesh(geometry, material);
    return object;
  }
}

export default Cube;
