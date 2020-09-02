import { display } from "display";
import { today } from "user-activity";
import { me } from "appbit";
import document from "document";

const stepsLabel = document.getElementById("stepsLabel");
const caloriesLabel = document.getElementById("caloriesLabel");

function displaySteps() {
  stepsLabel.text = today.adjusted.steps;
}

function displayCalories() {
  caloriesLabel.text = today.adjusted.calories;
}

export function updateActivity() {
  if (display.on && me.permissions.granted("access_activity")) {
    displaySteps();
    displayCalories();
  }
}
