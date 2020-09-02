import * as util from "../common/utils";
import document from "document";
import { preferences } from "user-settings";
import { updateActivity } from "./activity.js";

const timeLabel = document.getElementById("timeLabel");
const dateLabel = document.getElementById("dateLabel");

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

const days = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

let lastHour = "";
let lastMin = "";

function displayTime(hour, min) {
  timeLabel.text = `${hour}:${min}`;
}

function displayDate(month, day, date) {
  dateLabel.text = `${day} ${month} ${date}`;
}

function updateDateTime() {
  let timeInfo = new Date();
  let hour = timeInfo.getHours();
  let min = util.zeroPad(timeInfo.getMinutes());
  let month = months[timeInfo.getMonth()];
  let day = days[timeInfo.getDay()];
  let date = timeInfo.getDate();
  
  if (preferences.clockDisplay === "12h") {
    hour = hour % 12 || 12;
  }

  hour = util.zeroPad(hour);

  if (lastHour !== hour || lastMin !== min) {
    displayTime(hour, min);
    displayDate(month, day, date);
    lastHour = hour;
    lastMin = min;
  }
}

export function updateDateTimeActivity(event) {
  updateDateTime();
  updateActivity();
}