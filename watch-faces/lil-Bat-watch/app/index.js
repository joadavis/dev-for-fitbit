import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { me as appbit } from "appbit";
import { today as todayact } from "user-activity";

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("timeLabel");
const stepsLabel = document.getElementById("stepsLabel");
const dayLabel = document.getElementById("dayLabel");
const caldayLabel = document.getElementById("caldayLabel");
let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");

let minArm = document.getElementById("minarm");
//let lilBatTop = document.getElementById("topmost");
let lilBatTicks = document.getElementById("lilBatTicks");

const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}


// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  // testing hack
  mins = 50
  
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
  
  // try a cheat
  //lilBatTop.groupTransform.rotate.angle = 60;
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  
  if (hours < 7 || hours > 19) {
    lilBatTicks.href="lil-Bat-watch-ticks2-darker.png";
  }
  else {
    lilBatTicks.href="lil-Bat-watch-ticks2.png"
  }
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let dayName = days[today.getDay()];
  dayLabel.text = dayName;
  caldayLabel.text = today.getDate(); // could pad or space this but ok for now
  myLabel.text = `${hours}:${mins}`;
  
  if (appbit.permissions.granted("access_activity")) {
    //console.log(`${today.adjusted.steps} Steps`);
    stepsLabel.text = todayact.adjusted.steps;
  } else {
    stepsLabel.style.display = "none";
  }
  
  // Different objects for different days of the week
  // TODO: ray gun, skateboard, taco, etc.  headphones?
  if (today.getDay() == 5) {
    minArm.href = "pizzaarm.png";
  }
  else if (today.getDay() == 6) {
    // weekend sword
    minArm.href = "swordarm.png";
  }
  else if (today.getDay() == 0) {
    // Slushi
    minArm.href = "slushiarm2.png";
  }
  else if (today.getDay() == 3) {
    // ray gun
    minArm.href = "raygunarm2.png";
  }
  else {
    minArm.href="torchArm-highlight2.png";
    // testing hack
    minArm.href = "pizzaarm.png";
  }
  
  updateClock();
}
