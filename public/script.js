var calInfo;

if (localStorage.getItem("calInfo") === null) {
  window.location.href = "/login";
} else {
  // get the response from the localStorage
  calInfo = JSON.parse(`${localStorage.calInfo}`);
}

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

var modal = document.getElementById("myModal");
var modalEdit = document.getElementById("myModalEdit");
var span = document.getElementsByClassName("close")[0];

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
  "https://thenick-calendar.herokuapp.com/events/user=" +
  calInfo.email +
  "/month=" +
  months[date.getMonth()] +
  "/year=" +
  date.getFullYear();

fetch(
  "https://thenick-calendar.herokuapp.com/events/user=" +
    calInfo.email +
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

  // if (localStorage.calStatus !== "true") {
  //   window.location.href = "/login";
  // }

  // if (localStorage.getItem("calInfo") === null) {
  //   window.location.href = "/login";
  // } else {
  //   calInfo = JSON.parse(`${localStorage.calInfo}`);
  //   console.log(localStorage.calInfo["email"]);
  //   console.log(localStorage.calInfo);
  //   console.log(calInfo);
  //   console.log(calInfo.email);
  // }
  fetchEvents();
  loadName();
  monthYear();
  findDates();
  calculatePrevMonth();
  calculateNextMonth();
};

function loadName() {
  document.getElementById("profileName").innerHTML = calInfo.name
    ? `Hello, ${calInfo.name}`
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
  if (confirm("Are you sure you want to logout?")) {
    // localStorage.calStatus = false;
    localStorage.removeItem("calInfo");
    window.location.href = "/login";
  }
}

async function fetchEvents() {
  const response = await fetch(
    "https://thenick-calendar.herokuapp.com/events/user=" +
      calInfo.email +
      "/month=" +
      months[date.getMonth()] +
      "/year=" +
      date.getFullYear()
  );
  const data = await response.json();
  eventsDate = data.map((event) => {
    return event.date;
  });

  // ids.forEach((element) => {
  //   removeAllChildNodes(document.getElementById(element));
  // });
  ids.forEach((element) => {
    var date = document.getElementById(element).innerHTML;
    if (eventsDate.includes(parseInt(date))) {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event_date");
      eventDiv.onclick = function (e) {
        e.stopPropagation();
        fetchDailyEvents(date);
      };
      document.getElementById(element).appendChild(eventDiv);
    } else {
      removeEventChildNodes(document.getElementById(element));
    }
  });
}

async function fetchDailyEvents(datePara) {
  modal.style.display = "block";

  var title = document.getElementById("modalHead");
  title.innerHTML = `${datePara} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

  const response = await fetch(
    "https://thenick-calendar.herokuapp.com/events/user=" +
      calInfo.email +
      "/date=" +
      datePara +
      "/month=" +
      months[date.getMonth()] +
      "/year=" +
      date.getFullYear()
  );
  const data = await response.json();

  var eventContainer = document.getElementById("modalEvents");

  data.forEach((element) => {
    removeAllChildNodes(document.getElementById("modalEvents"));
  });

  data.sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0));

  data.forEach((element) => {
    var modalEvent = document.createElement("div");
    modalEvent.classList.add("modal_event");
    var timeMeridian = element.time > 11 ? "PM" : "AM";
    var timeEvent = document.createElement("h4");
    var eventName = document.createElement("h4");
    timeEvent.innerHTML =
      element.time > 12
        ? element.time - 12 + " " + timeMeridian
        : element.time + " " + timeMeridian;
    eventName.innerHTML = element.event;
    modalEvent.appendChild(timeEvent);
    modalEvent.appendChild(eventName);
    var divTag = document.createElement("span");
    var edit = document.createElement("img");
    edit.src = "/public/images/editPencil.png";
    edit.classList.add("img__res");
    edit.onclick = function (e) {
      e.preventDefault();
      editEventModal(element);
    };
    var bin = document.createElement("img");
    bin.classList.add("img__res");
    bin.src = "/public/images/bin.png";
    bin.onclick = function (e) {
      e.preventDefault();
      deleteEvent(element);
    };
    divTag.appendChild(edit);
    divTag.appendChild(bin);

    modalEvent.appendChild(divTag);
    // modalEvent.appendChild(edit);

    eventContainer.appendChild(modalEvent);
    eventContainer.appendChild(document.createElement("hr"));
  });

  span.onclick = function () {
    modal.style.display = "none";
  };
}

function editEventModal(element) {
  modalEdit.style.display = "block";
  var time = element.time;
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close-edit")[0];

  var editValue = document.getElementById("editInput");
  editValue.value = element.event;
  var timeMeridian = time > 11 ? "PM" : "AM";

  document.getElementById("editTime").innerHTML =
    time > 12
      ? "Time: " + (time - 12) + " " + timeMeridian
      : "Time: " + time + " " + timeMeridian;

  document.getElementById("ide").value = element._id;
  document.getElementById("editDay").innerHTML = "Day: " + element.date;
  document.getElementById("editMonth").innerHTML = "Month: " + element.month;
  document.getElementById("editYear").innerHTML = "Year: " + element.year;

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modalEdit.style.display = "none";
  };

  // var modalContent = document.createElement("div");
  // modalContent.classList.add("modal-content");
  // var close = document.createElement("span")
  // close.onclick = function () {
  //     modal.style.display = "none";
  // }
}

function changeEvent(element) {
  var id = document.getElementById("ide").value;
  var eventInput = document.getElementById("editInput");
  var time = document.getElementById("editTime").innerHTML;
  time = time.split(":");
  time = time[1].split(" ");
  if (time[2] == "PM" && time[1] != 12) {
    time = 12 + parseInt(time[1]);
  } else {
    time = time[1];
  }
  var day = document.getElementById("editDay").innerHTML;
  day = day.split(":");
  day = parseInt(day[1]);
  var month = document.getElementById("editMonth").innerHTML;
  month = month.split(":");
  month = month[1].split(" ");
  month = month[1];

  var year = document.getElementById("editYear").innerHTML;
  year = year.split(":");
  year = parseInt(year[1]);

  const data = {
    email: calInfo.email,
    date: day,
    month: month,
    year: year,
    time: time,
    event: eventInput.value,
  };

  async function editData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  editData(
    "https://thenick-calendar.herokuapp.com/events/update=" + id,
    data
  ).then((data) => {
    alert(data);
    modalEdit.style.display = "none";
    modal.style.display = "none";

    // fetchEvents();
  });
}

function deleteEvent(element) {
  var id;
  if (element) {
    id = element._id;
  } else {
    id = document.getElementById("ide").value;
  }

  async function deleteData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  if (confirm("Are you sure you want to delete this event?")) {
    deleteData(
      "https://thenick-calendar.herokuapp.com/event/delete=" + id
    ).then((data) => {
      alert(data);
      modal.style.display = "none";
      modalEdit.style.display = "none";
      // checkDeletedEvents();
      removeDeletedEvents();
    });
  }
}

async function removeDeletedEvents() {
  const response = await fetch(
    "https://thenick-calendar.herokuapp.com/events/user=" +
      calInfo.email +
      "/month=" +
      months[date.getMonth()] +
      "/year=" +
      date.getFullYear()
  );
  const data = await response.json();
  eventsDate = data.map((event) => {
    return event.date;
  });

  ids.forEach((element) => {
    var date = document.getElementById(element).innerHTML;
    if (!eventsDate.includes(parseInt(date))) {
      removeEventChildNodes(document.getElementById(element));
    }
  });
}

// This function will remove for all deleted events and remove them from the daily view
function checkDeletedEvents() {
  fetchEvents();
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
  var dayPara = e.target.innerHTML.split("<");

  if (dayPara[0]) {
    window.location.href = `/dailyview/day=${dayPara[0]}/month=${
      months[date.getMonth()]
    }/year=${date.getFullYear()}`;
  }
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

    dateStart++;
    document.getElementById("ten").innerHTML = dateStart;
    todayDateCheck("ten");

    dateStart++;
    document.getElementById("eleven").innerHTML = dateStart;
    todayDateCheck("eleven");

    dateStart++;
    document.getElementById("twelve").innerHTML = dateStart;
    todayDateCheck("twelve");

    dateStart++;
    document.getElementById("thirteen").innerHTML = dateStart;
    todayDateCheck("thirteen");

    dateStart++;
    document.getElementById("fourteen").innerHTML = dateStart;
    todayDateCheck("fourteen");

    dateStart++;
    document.getElementById("fifteen").innerHTML = dateStart;
    todayDateCheck("fifteen");

    dateStart++;
    document.getElementById("sixteen").innerHTML = dateStart;
    todayDateCheck("sixteen");

    dateStart++;
    document.getElementById("seventeen").innerHTML = dateStart;
    todayDateCheck("seventeen");

    dateStart++;
    document.getElementById("eighteen").innerHTML = dateStart;
    todayDateCheck("eighteen");

    dateStart++;
    document.getElementById("nineteen").innerHTML = dateStart;
    todayDateCheck("nineteen");

    dateStart++;
    document.getElementById("twenty").innerHTML = dateStart;
    todayDateCheck("twenty");

    dateStart++;
    document.getElementById("twentyone").innerHTML = dateStart;
    todayDateCheck("twentyone");

    dateStart++;
    document.getElementById("twentytwo").innerHTML = dateStart;
    todayDateCheck("twentytwo");

    dateStart++;
    document.getElementById("twentythree").innerHTML = dateStart;
    todayDateCheck("twentythree");

    dateStart++;
    document.getElementById("twentyfour").innerHTML = dateStart;
    todayDateCheck("twentyfour");

    dateStart++;
    document.getElementById("twentyfive").innerHTML = dateStart;
    todayDateCheck("twentyfive");

    dateStart++;
    document.getElementById("twentysix").innerHTML = dateStart;
    todayDateCheck("twentysix");

    dateStart++;
    document.getElementById("twentyseven").innerHTML = dateStart;
    todayDateCheck("twentyseven");

    dateStart++;
    document.getElementById("twentyeight").innerHTML = dateStart;
    todayDateCheck("fourteen");

    dateStart++;
    document.getElementById("twentynine").innerHTML =
      date.getMonth() == 1 && dateStart > 28 ? "" : dateStart;
    todayDateCheck("twentynine");

    dateStart++;
    document.getElementById("thirty").innerHTML =
      date.getMonth() == 1 && dateStart > 28 ? "" : dateStart;
    todayDateCheck("thirty");

    dateStart++;
    document.getElementById("thirtyone").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtyone");

    dateStart++;
    document.getElementById("thirtytwo").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtytwo");

    dateStart++;
    document.getElementById("thirtythree").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtythree");

    dateStart++;
    document.getElementById("thirtyfour").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtyfour");

    dateStart++;
    document.getElementById("thirtyfive").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtyfive");

    dateStart++;
    document.getElementById("thirtysix").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtysix");

    dateStart++;
    document.getElementById("thirtyseven").innerHTML =
      (date.getMonth() == 1 && dateStart > 28) || dateStart > 31
        ? ""
        : Days30.includes(date.getMonth()) && dateStart > 30
        ? ""
        : dateStart;
    todayDateCheck("thirtyseven");
  }

  switch (date.getDay()) {
    case 0:
      document.getElementById("first").innerHTML = dateStart;
      todayDateCheck("first");
      dateStart++;
      document.getElementById("second").innerHTML = dateStart;
      todayDateCheck("second");
      dateStart++;
      document.getElementById("third").innerHTML = dateStart;
      todayDateCheck("third");
      dateStart++;
      document.getElementById("fourth").innerHTML = dateStart;
      todayDateCheck("fourth");
      dateStart++;
      document.getElementById("fifth").innerHTML = dateStart;
      todayDateCheck("fifth");
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      addDates();

      break;
    case 1:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = dateStart;
      todayDateCheck("second");
      dateStart++;
      document.getElementById("third").innerHTML = dateStart;
      todayDateCheck("third");
      dateStart++;
      document.getElementById("fourth").innerHTML = dateStart;
      todayDateCheck("fourth");
      dateStart++;
      document.getElementById("fifth").innerHTML = dateStart;
      todayDateCheck("fifth");
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      todayDateCheck("sixth");
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      todayDateCheck("seventh");
      addDates();
      break;
    case 2:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = dateStart;
      todayDateCheck("third");
      dateStart++;
      document.getElementById("fourth").innerHTML = dateStart;
      dateStart++;
      document.getElementById("fifth").innerHTML = dateStart;
      todayDateCheck("fifth");
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      todayDateCheck("sixth");
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      todayDateCheck("seventh");
      addDates();
      break;

    case 3:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = "";
      document.getElementById("fourth").innerHTML = dateStart;
      todayDateCheck("fourth");
      dateStart++;
      document.getElementById("fifth").innerHTML = dateStart;
      todayDateCheck("fifth");
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      todayDateCheck("sixth");
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      todayDateCheck("seventh");
      addDates();

      break;

    case 4:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = "";
      document.getElementById("fourth").innerHTML = "";
      document.getElementById("fifth").innerHTML = dateStart;
      todayDateCheck("fifth");
      dateStart++;
      document.getElementById("sixth").innerHTML = dateStart;
      todayDateCheck("sixth");
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      todayDateCheck("seventh");
      addDates();
      break;

    case 5:
      document.getElementById("first").innerHTML = "";
      document.getElementById("second").innerHTML = "";
      document.getElementById("third").innerHTML = "";
      document.getElementById("fourth").innerHTML = "";
      document.getElementById("fifth").innerHTML = "";
      document.getElementById("sixth").innerHTML = dateStart;
      todayDateCheck("sixth");
      dateStart++;
      document.getElementById("seventh").innerHTML = dateStart;
      todayDateCheck("seventh");
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
      todayDateCheck("seventh");
      addDates();
      break;
  }
}

function removeEventChildNodes(parent) {
  for (let childNode of parent.childNodes) {
    if (childNode.className === "event_date") {
      parent.removeChild(childNode);
    }
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalEdit.style.display = "none";
  }
};
