import * as THREE from "three";
import { CameraHelper, Mesh, Object3D, PerspectiveCamera } from "three";

class FollowCamera {
  constructor() {
    this.createCamera();
  }

  camera!: PerspectiveCamera;
  cameraEye!: Mesh;
  cameraHelper!: CameraHelper;
  parentObject!: Object3D;

  createCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      84,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    this.cameraEye = new THREE.Mesh(
      new THREE.SphereBufferGeometry(5),
      new THREE.MeshBasicMaterial({ color: 0xdddddd })
    );
    this.cameraHelper = new THREE.CameraHelper(this.camera);
    this.parentObject = new THREE.Object3D();
    this.parentObject.add(this.cameraEye);
    this.parentObject.add(this.camera);
  }
}

export default FollowCamera;
