const clockDisplay = document.querySelector(".wrapper h1");
const tabMenu = document.querySelectorAll("select");
const alarmBtn = document.querySelector(".set");
const stopAlarm = document.querySelector(".stop");
const alarmIcon = document.querySelector(".wrapper");

const alarms = document.querySelector(".alarm-list");
const delAlarm = document.querySelector(".delete-btn");
let alarmTime,
  isAlarmSet = false,
  alarmList = [];
let alarmTimeout = null;
const  alarmSound = new Audio("./audio/twirling.mp3")
alarmSound.loop = true;

// create options for hour
for (let h = 12; h > 0; h--) {
  h = h < 10 ? "0" + h : h;
  let createOptions = `<option value="${h}">${h}</option>`;
  tabMenu[0].firstElementChild.insertAdjacentHTML("afterend", createOptions);
}
// create options for minute
for (let m = 59; m >= 0; m--) {
  m = m < 10 ? "0" + m : m;
  let createOptions = `<option value="${m}">${m}</option>`;
  tabMenu[1].firstElementChild.insertAdjacentHTML("afterend", createOptions);
}
// create options for seconds

for (let sec = 59; sec >= 0; sec--) {
  sec = sec < 10 ? "0" + sec : sec;
  let createOptions = `<option value="${sec}">${sec}</option>`;
  tabMenu[2].firstElementChild.insertAdjacentHTML("afterend", createOptions);
}

// create options for am/pm,
for (let m = 2; m > 0; m--) {
  let session = m == 1 ? "AM" : "PM";
  let createOptions = `<option value="${session}">${session}</option>`;
  tabMenu[3].firstElementChild.insertAdjacentHTML("afterend", createOptions);
}


// ring alarm

function ringAlarm(time) {
  alarmSound.play();
  alarmIcon.firstElementChild.classList.remove("fa-spin");
  alarmIcon.firstElementChild.classList.add("fa-shake");
}

// function to stop alarm



function clearAlarm() {
  alarmSound.pause();
  alarmSound.loop = false;
  alarmIcon.firstElementChild.classList.add("fa-spin");
  alarmIcon.firstElementChild.classList.remove("fa-shake");
  console.log("stop alarm")
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    console.log("alarm stopped");
  }
}

// set clock


function setClock() {
  let dt = new Date();
  let hr = dt.getHours();
  let min = dt.getMinutes();
  let sec = dt.getSeconds();
  let period = "AM";

  if (hr >= 12) {
    period = "PM";
    hr = hr - 12;
  }

  hr = hr == 0 ? (hr = 12) : hr;
  // if hour is less than 10 we are just adding 0 as prefix and it will be same for min and sec

  hr = hr < 10 ? "0" + hr : hr;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  
  let currentTime = `${hr} : ${min} : ${sec} ${period}`;

  clockDisplay.innerHTML = currentTime;

  alarmList.map((T) => {
    if (T === currentTime) {
      ringAlarm(currentTime);
    }
  });

  
}



// reset alarm time
function reset() {
  const hr = document.querySelector("#hour");
  const min = document.querySelector("#min");
  const sec = document.querySelector("#sec");
  const session = document.querySelector("#session");
  hr.selectedIndex = "Hr";
  min.selectedIndex = "Min";
  sec.selectedIndex = "Sec"
  session.selectedIndex = "Meridian";
}

//function for adding alarm

function setAlarm() {
  let selectedTime = `${tabMenu[0].value} : ${tabMenu[1].value} : ${tabMenu[2].value} ${tabMenu[3].value}`;

  if (
    selectedTime.includes("Hr") ||
    selectedTime.includes("Min") ||
    selectedTime.includes("Sec") ||
    selectedTime.includes("Meridian")
  ) {
    return alert("Please Select the valid selectedTime");
  }

  if (!alarmList.includes(selectedTime)) {
    alarmList.push(selectedTime);
    console.log(alarmList);
    console.log(alarmList.length);
    alarmView(selectedTime);
    reset();
  } else {
    alert(`${selectedTime} is already set!!!`);
  }
}

//set alarrm

alarmBtn.addEventListener("click", setAlarm);

// adding alarm to the UI

function alarmView(time) {
  let newAlarm = `<div class="alarms">
  <span>${time}</span>
  <button class="delete-btn" onclick="remove(this.value)" value="${time}">Delete</button>
</div>`;
  alarms.firstElementChild.insertAdjacentHTML("afterend", newAlarm);
}

// delete alarm from the UI

alarms.addEventListener("click", (e) => {
  console.log("alarm removed");
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
});

remove = (value) => {
  console.log(value);
  alarmList = alarmList.filter((t) => t != value);
  console.log(alarmList);
  
};

setInterval(setClock, 1000);