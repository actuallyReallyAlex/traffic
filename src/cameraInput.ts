import { Camera } from "three";

import settings from "./settings";

import { Input } from "./types";

export const setupCameraInput = (camera: Camera) => {
  const rootContainer = document.getElementById("root");
  if (!rootContainer) {
    throw new Error("No root container!");
  }
  const inputContainer = document.createElement("div");
  inputContainer.id = "input-container";
  rootContainer.appendChild(inputContainer);

  const inputs: Input[] = [
    { coordinate: "x", initialValue: settings.initialX, label: "X" },
    { coordinate: "y", initialValue: settings.initialY, label: "Y" },
    { coordinate: "z", initialValue: settings.initialZ, label: "Z" },
  ];

  inputs.forEach((input, i) => {
    const labelElement = document.createElement("label");
    labelElement.innerText = input.label;
    labelElement.setAttribute("for", input.coordinate);
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.value = input.initialValue.toString();
    inputElement.onchange = (e) => {
      const ele = e.currentTarget as HTMLInputElement;
      inputElement.value = ele.value;
      camera.position[input.coordinate] = Number(ele.value);
    };
    inputContainer.appendChild(labelElement);
    inputContainer.appendChild(inputElement);
  });
};
