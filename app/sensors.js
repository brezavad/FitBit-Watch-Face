import document from "document";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { me } from "appbit";

const heartRateLabel = document.getElementById("heartRateLabel");

const hrm = new HeartRateSensor();
const body = new BodyPresenceSensor();

let sensorsRunning = false;
let listenersAdded = false;

function turnOnBodySensor() {
  console.log("Body sensor turned on.");
  body.start();
}

function turnOffBodySensor() {
  console.log("Body sensor turned off.");
  body.stop();
}

function turnOnHeartRateMonitor() {
  console.log("Heart rate monitor turned on.");
  hrm.start();
}

function turnOffHeartRateMonitor() {
  console.log("Heart rate monitor turned off.");
  hrm.stop();
}

function displayHR(flag) {
  if (flag === false) {
    heartRateLabel.text = "--";
  } else {
    // u2665 for heart icon
    heartRateLabel.text = `${hrm.heartRate}`;
  }
}

export function turnOnSensors() {
  if (!sensorsRunning) {
    console.log("Turning on sensors.");
    
    turnOnBodySensor();
    turnOnHeartRateMonitor();
    sensorsRunning = true;
  }
}

export function turnOffSensors() {
  if (sensorsRunning) {
    console.log("Turning off sensors.");
    
    turnOffBodySensor();
    turnOffHeartRateMonitor();
    sensorsRunning = false;
  }
}

export function addBodyHeartListeners() {
  if (!listenersAdded) {
    console.log("Body and heart listeners added.");

    if (HeartRateSensor && me.permissions.granted("access_heart_rate")) {
      if (BodyPresenceSensor) {
        body.addEventListener("reading", () => {
          if (!body.present) {
            displayHR(false);
          }
        });
        
        hrm.addEventListener("reading", () => {
          if (body.present) {
            displayHR(true);  
          }
        });
      }
    }
    
    listenersAdded = true;
  }
}
