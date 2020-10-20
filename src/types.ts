import { IUniform, Mesh, ShaderMaterial } from "three";

export type Coordinate = "x" | "y" | "z";

export interface CustomCarLightMesh extends Mesh {
  material: CustomCarLightMaterial;
}

export interface CustomCarLightMaterial extends ShaderMaterial {
  uniforms: { [uniform: string]: IUniform };
}

export interface Input {
  coordinate: Coordinate;
  initialValue: number;
  label: string;
}
