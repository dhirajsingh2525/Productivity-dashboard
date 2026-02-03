function openCloseFeatures() {
  let allelems = document.querySelectorAll(".elems");
  let FullelemPage = document.querySelectorAll(".fullelems");
  let alFullelemsBackBtn = document.querySelectorAll(".fullelems .back");

  allelems.forEach(function (elm) {
    elm.addEventListener("click", function () {
      FullelemPage[elm.id].style.display = "block";
    });
  });

  alFullelemsBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      FullelemPage[back.id].style.display = "none";
    });
  });
}
openCloseFeatures();

function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form input");
  let taksDetailInput = document.querySelector(".addTask form textarea");
  let taksInputCheck = document.querySelector(".addTask form #check");

  var currentTask = [];

  if (localStorage.getItem("allTaskList")) {
    currentTask = JSON.parse(localStorage.getItem("allTaskList"));
  } else {
    console.error("task is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elm, idx) {
      sum += `  <div class="task">
                   <h4>${elm.task} <span class=${elm.imp}>imp</span></h4>
                   <button id=${idx}>Mark As Completed</button>
                 </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("allTaskList", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taksDetailInput.value,
      imp: taksInputCheck.checked,
    });
    renderTask();

    taksInputCheck.checked = false;
    taskInput.value = "";
    taksDetailInput = "";
  });
}

todoList();

function dailyPlanner() {
  let dayPlannData = JSON.parse(localStorage.getItem("dayPlannData")) || {};
  let dayPlanner = document.querySelector(".day-planner");
  let hours = Array.from(
    { length: 18 },
    (elm, idx) => `${6 + idx}:00 - ${7 + idx} : 00`,
  );

  let WholeDatSum = "";
  hours.forEach(function (elm, idx) {
    let savedData = dayPlannData[idx] || "";
    WholeDatSum += ` <div class="day-planner-time">
    <p>${elm}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
    </div>`;
  });
  dayPlanner.innerHTML = WholeDatSum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elm) {
    elm.addEventListener("input", function () {
      dayPlannData[elm.id] = elm.value;

      localStorage.setItem("dayPlannData", JSON.stringify(dayPlannData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  let motivationalQuote = document.querySelector(".motivation-2 h2");
  let motivationalAuthor = document.querySelector(".motivation-3 h3");
  async function fetchQuotes() {
    let res = await fetch("https://dummyjson.com/quotes/random");
    let data = await res.json();
    motivationalQuote.innerHTML = data?.quote;
    motivationalAuthor.innerHTML = data?.author;
  }

  fetchQuotes();
}
motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomodoro-fullpage .pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");

  var totalSeconds = 25 * 60;
  let timerInterval = null;
  let isWorkSession = true;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          totalSeconds = 5 * 60;
        }
      }, 2);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          totalSeconds = 25 * 60;
        }
      }, 2);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function weatherFunctionality() {
  let apiKey = "b4c918e4ba5e4b48b2b54747260302";
  let city = "bhopal";
  let data = null;

  let header1Date = document.querySelector(".header1 h1");
  let header2Temp = document.querySelector(".header2 h2");
  let header2Hum = document.querySelector(".header2 .hum");
  let header2pre = document.querySelector(".header2 .pre");
  let header2wind = document.querySelector(".header2 .wind");
  let header2text = document.querySelector(".header2 h4");

  async function weatherApiCall() {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );
    data = await res.json();

    header2Temp.innerHTML = `${data.current.temp_c}°c`;
    header2text.innerHTML = `${data.current.condition.text}`;
    header2Hum.innerHTML = `Humidity: ${data.current.humidity}%`;
    header2pre.innerHTML = `Precipitation: ${data.current.precip_in}%`;
    header2wind.innerHTML = `Wind: ${data.current.wind_kph}Km/h`;
  }

  weatherApiCall();

  let date = null;
  function timeDate() {
    date = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    header1Date.innerHTML = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")} ${ampm}`;
  }
  timeDate();
}

weatherFunctionality();

function changeTheme() {
  let flag = 0;
  let rootElement = document.documentElement;
  let themeBtn = document.querySelector(".theme i");
  // let priValue = getComputedStyle(rootElement).getPropertyValue('--pri')

  themeBtn.addEventListener("click", function () {
    if (flag === 0) {
      rootElement.style.setProperty("--pri", "#280905");
      rootElement.style.setProperty("--sec", "#740A03");
      rootElement.style.setProperty("--tri1", "#C3110C");
      rootElement.style.setProperty("--tri2", "#E6501B");
      flag = 1;
    } else if (flag === 1) {
      rootElement.style.setProperty("--pri", "#134601");
      rootElement.style.setProperty("--sec", "#B6FFA1");
      rootElement.style.setProperty("--tri1", "#FEFFA7");
      rootElement.style.setProperty("--tri2", "#FFE700");
      flag = 2;
    } else if (flag === 2) {
      rootElement.style.setProperty("--pri", "#2C3930");
      rootElement.style.setProperty("--sec", "#3F4F44");
      rootElement.style.setProperty("--tri1", "#A27B5C");
      rootElement.style.setProperty("--tri2", "#DCD7C9");
      flag = 0;
    }
  });
}

changeTheme()
