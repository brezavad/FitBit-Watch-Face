import clock from "clock";
import { display } from "display";
import { displayBattery, addBatteryListener } from "./battery.js";
import { updateDateTimeActivity } from "./time.js";
import { addListeners } from "./listeners.js";
import { turnOnSensors, turnOffSensors, addBodyHeartListeners } from "./sensors.js";

clock.granularity = "seconds";

display.addEventListener("change", () => {
  if (display.on) {
    console.log("Display on");
    addBatteryListener();
    addBodyHeartListeners();
    turnOnSensors();
  } else {
    console.log("Display off");
    turnOffSensors();
  }
});

clock.ontick = updateDateTimeActivity;
addBatteryListener();
addBodyHeartListeners();
turnOnSensors();
displayBattery();
