import { IUniform, Mesh, ShaderMaterial } from "three";

export type Coordinate = "x" | "y" | "z";

export interface CustomCarLightMesh extends Mesh {
  material: CustomCarLightMaterial;
}

export interface CustomCarLightMaterial extends ShaderMaterial {
  uniforms: { [uniform: string]: IUniform };
}

export type CarLightColor =
  | "black"
  | "blue"
  | "green"
  | "red"
  | "white"
  | "yellow";

export interface CarLightColors {
  black: "black";
  blue: "blue";
  green: "green";
  red: "red";
  white: "white";
  yellow: "yellow";
}

export type CarLightsDirection = "away" | "toward";

export interface GUIParams {
  leftLightsColor: CarLightColor;
  leftLightsDirection: CarLightsDirection;
  leftLightsSpeed: number;
  rightLightsColor: CarLightColor;
  rightLightsDirection: CarLightsDirection;
  rightLightsSpeed: number;
}

export interface Input {
  coordinate: Coordinate;
  initialValue: number;
  label: string;
}
