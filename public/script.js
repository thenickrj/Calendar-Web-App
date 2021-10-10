const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Days30 = [3, 5, 8, 10];

var monthDefault = new Date().getMonth();
var yearDefault = new Date().getFullYear();
var date = new Date(`${months[monthDefault]} ${yearDefault}`);
var dateStart = 1;
var firstDay;
var eventsDate;
var ids = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twentyone",
  "twentytwo",
  "twentythree",
  "twentyfour",
  "twentyfive",
  "twentysix",
  "twentyseven",
  "twentyeight",
  "twentynine",
  "thirty",
  "thirtyone",
  "thirtytwo",
  "thirtythree",
  "thirtyfour",
  "thirtyfive",
  "thirtysix",
  "thirtyseven",
];

var eventUrl =
  "http://localhost:3000/events/user=" +
  localStorage.calEmail +
  "/month=" +
  months[date.getMonth()] +
  "/year=" +
  date.getFullYear();

fetch(
  "http://localhost:3000/events/user=" +
    localStorage.calEmail +
    "/month=" +
    months[date.getMonth()] +
    "/year=" +
    date.getFullYear()
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendData(data) {
  eventsDate = data.map((event) => {
    return event.date;
  });

  // var mainContainer = document.getElementById("thirtyseven");
  // mainContainer.innerHTML = data.length;
  // console.log(data.length);

  // const eventDiv = document.createElement("div");
  // eventDiv.classList.add("today_date");
  // document.getElementById("thirtyseven").appendChild(eventDiv);
}

window.onload = function () {
  var url = "/";

  if (localStorage.calStatus !== "true") {
    window.location.href = "/login";
  }
  fetchEvents();
  loadName();
  monthYear();
  findDates();
  calculatePrevMonth();
  calculateNextMonth();
};

function loadName() {
  document.getElementById("profileName").innerHTML = localStorage.calUserName
    ? `Hello, ${localStorage.calUserName}`
    : "Hello, User";
}

function monthYear() {
  document.getElementById("month").innerHTML = months[date.getMonth()];
  document.getElementById("year").innerHTML = date.getFullYear();
}

function calculatePrevMonth() {
  var prevMonth = document.getElementById("prev-month");
  if (date.getMonth() - 1 === -1) {
    prevMonth.innerHTML = "December";
  } else {
    prevMonth.innerHTML = months[date.getMonth() - 1];
  }
}

function calculateNextMonth() {
  var nextMonth = document.getElementById("next-month");
  if (date.getMonth() === 11) {
    nextMonth.innerHTML = "January";
  } else {
    nextMonth.innerHTML = months[date.getMonth() + 1];
  }
}

function ChangeDateDec() {
  if (date.getMonth() - 1 === -1) {
    date = new Date(`December  ${date.getFullYear() - 1}`);
  } else {
    date = new Date(`${months[date.getMonth() - 1]}  ${date.getFullYear()}`);
  }
  fetchEvents();
  calculatePrevMonth();
  monthYear();
  calculateNextMonth();
  findDates();
}

function ChangeDateInc() {
  if (date.getMonth() == 11) {
    date = new Date(`${months[0]}  ${date.getFullYear() + 1}`);
  } else {
    date = new Date(`${months[date.getMonth() + 1]}  ${date.getFullYear()}`);
  }
  fetchEvents();
  calculatePrevMonth();
  monthYear();
  calculateNextMonth();
  findDates();
}

function ChangeYearInc() {
  date = new Date(`${months[date.getMonth()]}  ${date.getFullYear() + 1}`);
  fetchEvents();
  calculatePrevMonth();
  monthYear();
  calculateNextMonth();
  findDates();
}

function ChangeYearDec() {
  date = new Date(`${months[date.getMonth()]}  ${date.getFullYear() - 1}`);
  fetchEvents();
  calculatePrevMonth();
  monthYear();
  calculateNextMonth();
  findDates();
}

function logout() {
  // localStorage.calStatus = false;
  // localStorage.calUserName = undefined;
  console.log(localStorage.calStatus);
}

async function fetchEvents() {
  const response = await fetch(
    "http://localhost:3000/events/user=" +
      localStorage.calEmail +
      "/month=" +
      months[date.getMonth()] +
      "/year=" +
      date.getFullYear()
  );
  const data = await response.json();
  eventsDate = data.map((event) => {
    return event.date;
  });
  console.log(data);
  console.log(eventsDate);
  ids.forEach((element) => {
    var date = document.getElementById(element).innerHTML;
    if (eventsDate.includes(parseInt(date))) {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event_date");
      eventDiv.onclick = function (e) {
        e.stopPropagation();
      };
      document.getElementById(element).appendChild(eventDiv);
    }
  });
}

function eventCheck(idCheck) {
  // const response = await fetch(eventUrl);
  // const data = await response.json();
  // eventsDate = data.map((event) => {
  //   return event.date;
  // });
  // console.log(eventsDate);
  // var date = document.getElementById(idCheck).innerHTML;
  // console.log(eventsDate.includes(date));
}

function dailyView(e) {
  console.log(e.target.innerHTML);
  var dayPara = e.target.innerHTML.split("<");
  console.log(e.target.innerHTML[0]);
  console.log(dayPara[0]);
  console.log(months[date.getMonth()], e.target.innerHTML, date.getFullYear());

  window.location.href = `/dailyview/day=${dayPara[0]}/month=${
    months[date.getMonth()]
  }/year=${date.getFullYear()}`;
}

function todayDateCheck(idCheck) {
  var dateCheck = document.getElementById(idCheck).innerHTML;

  if (
    dateCheck ==
      parseInt(new Date().toLocaleString().split(",")[0].split("/")[0]) &&
    date.getMonth() ==
      parseInt(new Date().toLocaleString().split(",")[0].split("/")[1]) - 1 &&
    date.getFullYear() ==
      parseInt(new Date().toLocaleString().split(",")[0].split("/")[2])
  ) {
    const eventDiv = document.createElement("div");
    eventDiv.onclick = function (e) {
      e.stopPropagation();
    };
    eventDiv.classList.add("today_date");
    document.getElementById(idCheck).appendChild(eventDiv);

    // document.getElementById(idCheck).classList.add("today_date");
  } else {
    // document.getElementById(idCheck).classList.remove("today_date");
  }
}

function findDates() {
  dateStart = 1;
  function addDates() {
    dateStart++;
    document.getElementById("eight").innerHTML = dateStart;
    todayDateCheck("eight");
    dateStart++;
    document.getElementById("nine").innerHTML = dateStart;
    todayDateCheck("nine");
    eventCheck("nine");
    dateStart++;
    document.getElementById("ten").innerHTML = dateStart;
    todayDateCheck("ten");
    eventCheck("ten");
    dateStart++;
    document.getElementById("eleven").innerHTML = dateStart;
    todayDateCheck("eleven");
    eventCheck("eleven");
    dateStart++;
    document.getElementById("twelve").innerHTML = dateStart;
    todayDateCheck("twelve");
    eventCheck("twelve");
    dateStart++;
    document.getElementById("thirteen").innerHTML = dateStart;
    todayDateCheck("thirteen");
    eventCheck("thirteen");
    dateStart++;
    document.getElementById("fourteen").innerHTML = dateStart;
    todayDateCheck("fourteen");
    eventCheck("fourteen");
    dateStart++;
    document.getElementById("fifteen").innerHTML = dateStart;
    todayDateCheck("fifteen");
    eventCheck("fifteen");
    dateStart++;
    document.getElementById("sixteen").innerHTML = dateStart;
    todayDateCheck("sixteen");
    eventCheck("sixteen");
    dateStart++;
    document.getElementById("seventeen").innerHTML = dateStart;
    todayDateCheck("seventeen");
    eventCheck("seventeen");
    dateStart++;
    document.getElementById("eighteen").innerHTML = dateStart;
    todayDateCheck("eighteen");
    eventCheck("eighteen");
    dateStart++;
    document.getElementById("nineteen").innerHTML = dateStart;
    todayDateCheck("nineteen");
    eventCheck("nineteen");
    dateStart++;
    document.getElementById("twenty").innerHTML = dateStart;
    todayDateCheck("twenty");
    eventCheck("twenty");
    dateStart++;
    document.getElementById("twentyone").innerHTML = dateStart;
    todayDateCheck("twentyone");
    eventCheck("twentyone");
    dateStart++;
    document.getElementById("twentytwo").innerHTML = dateStart;
    todayDateCheck("twentytwo");
    eventCheck("twentytwo");
    dateStart++;
    document.getElementById("twentythree").innerHTML = dateStart;
    todayDateCheck("twentythree");
    eventCheck("twentythree");
    dateStart++;
    document.getElementById("twentyfour").innerHTML = dateStart;
    todayDateCheck("twentyfour");
    eventCheck("twentyfour");
    dateStart++;
    document.getElementById("twentyfive").innerHTML = dateStart;
    todayDateCheck("twentyfive");
    eventCheck("twentyfive");
    dateStart++;
    document.getElementById("twentysix").innerHTML = dateStart;
    todayDateCheck("twentysix");
    eventCheck("twentysix");
    dateStart++;
    document.getElementById("twentyseven").innerHTML = dateStart;
    todayDateCheck("twentyseven");
    eventCheck("twentyseven");
    dateStart++;
    document.getElementById("twentyeight").innerHTML = dateStart;
    todayDateCheck("fourteen");
    eventCheck("fourteen");
    dateStart++;
    document.getElementById("twentynine").innerHTML =
      date.getMonth() == 1 && dateStart > 28 ? "" : dateStart;
    todayDateCheck("twentynine");
    eventCheck("twentynine");
    dateStart++;
    document.getElementById("thirty").innerHTML =
      date.getMonth() == 1 && dateStart > 28 ? "" : dateStart;
    todayDateCheck("thirty");
    eventCheck("thirty");
    dateStart++;
    document.getElementById("thirtyone").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtyone");
    eventCheck("thirtyone");
    dateStart++;
    document.getElementById("thirtytwo").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtytwo");
    eventCheck("thirtytwo");
    dateStart++;
    document.getElementById("thirtythree").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtythree");
    eventCheck("thirtythree");
    dateStart++;
    document.getElementById("thirtyfour").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtyfour");
    eventCheck("thirtyfour");
    dateStart++;
    document.getElementById("thirtyfive").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtyfive");
    eventCheck("thirtyfive");
    dateStart++;
    document.getElementById("thirtysix").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtysix");
    eventCheck("thirtysix");
    dateStart++;
    document.getElementById("thirtyseven").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtyseven");
    eventCheck("thirtyseven");
  }

  switch (date.getDay()) {
    case 0:
      document.getElementById("first").innerHTML = dateStart;
      dateStart++;
      document.getElementById("second").innerHTML = dateStart;
      dateStart++;
      document.getElementById("third").innerHTML = dateStart;
      dateStart++;
      document.getElementById("fourth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("fifth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      addDates();

      break;
    case 1:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = dateStart;
      dateStart++;
      document.getElementById("third").innerHTML = dateStart;
      dateStart++;
      document.getElementById("fourth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("fifth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      addDates();
      break;
    case 2:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = dateStart;
      dateStart++;
      document.getElementById("fourth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("fifth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      addDates();
      break;

    case 3:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = "";
      document.getElementById("fourth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("fifth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      addDates();
      console.log("case 3");

      break;

    case 4:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = "";
      document.getElementById("fourth").innerHTML = "";
      document.getElementById("fifth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      addDates();
      break;

    case 5:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = "";
      document.getElementById("fourth").innerHTML = "";
      document.getElementById("fifth").innerHTML = "";
      document.getElementById("sixth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      addDates();
      // firstDay.innerHTML = 1;
      // document.getElementById("seventh").innerHTML=;
      break;
    case 6:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = "";
      document.getElementById("fourth").innerHTML = "";
      document.getElementById("fifth").innerHTML = "";
      document.getElementById("sixth").innerHTML = "";

      document.getElementById("seventh").innerHTML = dateStart;
      addDates();
      break;
  }
}

function namse(para) {
  console.log(para);
}
