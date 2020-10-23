import * as THREE from "three";
import { CatmullRomCurve3, Mesh } from "three";

class CameraTrack {
  constructor() {
    this.points = 4;
    this.positions = [];
    this.splineHelperObjects = [];
    this.splines = { uniform: null };

    this.creratObject();
  }

  curve!: CatmullRomCurve3;
  object!: any;
  points: number;
  positions: any[];
  splineHelperObjects: any[];
  splines: { uniform: any };

  addSplineObject(position: any, i: number): Mesh {
    const geometry = new THREE.BoxBufferGeometry(20, 20, 20);
    const material = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });
    const object = new THREE.Mesh(geometry, material);

    if (position) {
      object.position.copy(position);
    } else {
      object.position.x = 0;
      object.position.y = 25;
      object.position.z = i * -125;
    }

    object.castShadow = true;
    object.receiveShadow = true;
    this.splineHelperObjects.push(object);
    return object;
  }

  creratObject(): void {
    for (let i = 0; i < this.points; i++) {
      this.addSplineObject(this.positions[i], i);
    }

    for (let j = 0; j < this.points; j++) {
      this.positions.push(this.splineHelperObjects[j].position);
    }

    const curve = new THREE.CatmullRomCurve3(
      this.positions,
      undefined,
      "catmullrom"
    );
    this.curve = curve;
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "red" });
    const curveObject = new THREE.Line(geometry, material);
    this.object = curveObject;
    this.splines.uniform = curve;
  }
}

export default CameraTrack;
