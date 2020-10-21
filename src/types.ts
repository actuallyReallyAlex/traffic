import { IUniform, Mesh, ShaderMaterial } from "three";

export interface ApplicationInput {
  folder: any;
  name: string;
  onChange: (value: any) => void;
  paramKey: keyof GUIParams;
  value: any;
  value2?: any;
}

export type Coordinate = "x" | "y" | "z";

export interface CustomCarLightMesh extends Mesh {
  material: CustomCarLightMaterial;
}

export interface CustomRoadMesh extends Mesh {
  material: CustomRoadMaterial;
}

export interface CustomCarLightMaterial extends ShaderMaterial {
  uniforms: { [uniform: string]: IUniform };
}

export interface CustomRoadMaterial extends ShaderMaterial {
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
  horizontalDistortionX: number;
  horizontalDistortionY: number;
  leftLightsColor: CarLightColor;
  leftLightsDirection: CarLightsDirection;
  leftLightsSpeed: number;
  rightLightsColor: CarLightColor;
  rightLightsDirection: CarLightsDirection;
  rightLightsSpeed: number;
  verticalDistortionX: number;
  verticalDistortionY: number;
}

export interface Input {
  coordinate: Coordinate;
  initialValue: number;
  label: string;
}
