import document from "document";
import { battery } from "power";

const batteryLabel = document.getElementById("batteryLabel");

let listenerAdded = false;

export function displayBattery() {
  let batteryPerc = Math.floor(battery.chargeLevel) + "%";
  batteryLabel.text = batteryPerc;
  
  if (parseInt(batteryPerc) <= 15) {
    batteryLabel.style.fill = "red";
  } else {
    batteryLabel.style.fill = "white";
  }
}

export function addBatteryListener() {
  if (!listenerAdded) {
    console.log("Battery listener added.")
    
    battery.addEventListener("change", () => {
      displayBattery();
    });
    
    listenerAdded = true;
  }
}