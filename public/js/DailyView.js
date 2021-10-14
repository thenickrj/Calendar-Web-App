var events;
var modal = document.getElementById("myModal");
var modalAdd = document.getElementById("myModal_add");
// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var dateDecrement = document.getElementById("dateDecrement");
var dateIncrement = document.getElementById("dateIncrement");

dateDecrement.addEventListener("click", dateDecrementChange);
dateIncrement.addEventListener("click", dateIncrementChange);

var timeIds = [];

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

var day31 = [0, 2, 4, 6, 7, 9, 11];
var day30 = [3, 5, 8, 10];

var url = window.location.pathname.split("/");
var day = parseInt(url[2].split("=")[1]);
console.log(day);
var month = url[3].split("=")[1];
var year = parseInt(url[4].split("=")[1]);
console.log("A", url);
console.log("C", url[3].split("=")[1]);
console.log("C", month);

window.onload = function () {
  var url = "/";

  if (localStorage.calStatus !== "true") {
    window.location.href = "/login";
  }
  fetchEvents();
  // loadName();
  // monthYear();
  // calculatePrevMonth();
  // calculateNextMonth();
};

function dateDecrementChange() {
  if (day == 1) {
    if (month == "January") {
      month = "December";
      year = year - 1;
    } else {
      month = months[months.indexOf(month) - 1];
    }
    if (day31.includes(months.indexOf(month))) {
      day = 31;
    } else if (day30.includes(months.indexOf(month))) {
      day = 30;
    } else {
      day = 28;
    }
  } else {
    day--;
  }
  checkDeletedEvents();
}

// This function will remove for all deleted events and remove them from the daily view
function checkDeletedEvents() {
  for (let i = 1; i < 24; i++) {
    removeAllChildNodes(document.getElementById(i));
  }
  fetchEvents();
}

function dateIncrementChange() {
  if (day == 30 && day31.includes(months.indexOf(month))) {
    console.log("31", month);
    day++;
  } else if (
    (day == 28 && months.indexOf(month) == 1) ||
    (day == 30 && day30.includes(months.indexOf(month))) ||
    day == 31
  ) {
    if (month == "December") {
      month = "January";
      year = year + 1;
    } else {
      month = months[months.indexOf(month) + 1];
    }
    day = 1;
  } else {
    day++;
  }

  checkDeletedEvents();
}

function addEvent(time) {
  console.log(
    "new event should be added at " + time + "," + month + "," + year
  );
  modalAdd.style.display = "block";
  var span = document.getElementsByClassName("close-add")[0];
  var timeMeridian = time > 11 ? "PM" : "AM";
  var eventInput = document.getElementById("addInput");
  eventInput.value = "";
  document.getElementById("addTime").innerHTML =
    time > 12
      ? "Time: " + (time - 12) + " " + timeMeridian
      : "Time: " + time + " " + timeMeridian;
  document.getElementById("addDay").innerHTML = "Day: " + day;
  document.getElementById("addMonth").innerHTML = "Month: " + month;
  document.getElementById("addYear").innerHTML = "Year: " + year;
  console.log(eventInput);
  console.log(month);

  span.onclick = function () {
    modalAdd.style.display = "none";
  };
}

function changeEvent(e) {
  // console.log(document.getElementById("ide").value)
  var id = document.getElementById("ide").value;
  var eventInput = document.getElementById("editInput");

  var TimeValue = document.getElementById("editTime").innerHTML;
  TimeValue = TimeValue.split(" ");
  var time;
  if (TimeValue[2] == "PM" && TimeValue[1] != "12") {
    time = parseInt(TimeValue[1]) + 12;
  } else {
    time = parseInt(TimeValue[1]);
  }

  const data = {
    email: localStorage.calEmail,
    date: day,
    month: month,
    year: year,
    time: time,
    event: eventInput.value,
  };
  console.log(data);
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

  editData("http://localhost:3000/events/update=" + id, data).then((data) => {
    alert(data);
    modal.style.display = "none";
    fetchEvents();
  });
}

function deleteEvent() {
  console.log(document.getElementById("ide").value);
  var id = document.getElementById("ide").value;
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

  deleteData("http://localhost:3000/event/delete=" + id).then((data) => {
    alert(data);
    modal.style.display = "none";
    checkDeletedEvents();
  });
}

function addEventSubmit(e) {
  var eventInput = document.getElementById("addInput");
  var TimeValue = document.getElementById("addTime").innerHTML;
  TimeValue = TimeValue.split(" ");
  console.log(TimeValue);
  var time;
  if (TimeValue[2] == "PM" && TimeValue[1] != "12") {
    time = parseInt(TimeValue[1]) + 12;
  } else {
    time = parseInt(TimeValue[1]);
  }
  const data = {
    email: localStorage.calEmail,
    date: day,
    month: month,
    year: year,
    time: time,
    event: eventInput.value,
  };

  async function postData(url, data) {
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

  if (eventInput.value !== "") {
    postData("http://localhost:3000/events", data).then((data) => {
      console.log(data);
      alert(data);
      modalAdd.style.display = "none";
      fetchEvents();

      // JSON data parsed by `data.json()` call
    });
  } else {
    alert("Event cannot be empty");
  }
}

function check(element) {
  console.log(element._id);
}

function editEventModal(element) {
  console.log(element._id);

  modal.style.display = "block";
  console.log(modal.style.display);
  var time = element.time;
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  var editValue = document.getElementById("editInput");
  editValue.value = element.event;
  var timeMeridian = time > 11 ? "PM" : "AM";

  document.getElementById("editTime").innerHTML =
    time > 12
      ? "Time: " + (time - 12) + " " + timeMeridian
      : "Time: " + time + " " + timeMeridian;

  document.getElementById("ide").value = element._id;
  document.getElementById("editDay").innerHTML = "Day: " + day;
  document.getElementById("editMonth").innerHTML = "Month: " + month;
  document.getElementById("editYear").innerHTML = "Year: " + year;

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // var modalContent = document.createElement("div");
  // modalContent.classList.add("modal-content");
  // var close = document.createElement("span")
  // close.onclick = function () {
  //     modal.style.display = "none";
  // }
}

async function fetchEvents() {
  var title = document.getElementById("daily__head");
  title.innerHTML = `${day} ${month} ${year}`;
  const response = await fetch(
    "http://localhost:3000/events/user=" +
      localStorage.calEmail +
      "/date=" +
      day +
      "/month=" +
      month +
      "/year=" +
      year
  );
  const data = await response.json();
  console.log(data);

  data.forEach((element) => {
    removeAllChildNodes(document.getElementById(element.time));
  });
  events = data;

  data.forEach((element) => {
    var time = document.getElementById(element.time);
    const eventSpan = document.createElement("span");
    eventSpan.onclick = function (e) {
      e.stopPropagation();
      editEventModal(element);
    };
    eventSpan.classList.add("label");
    eventSpan.innerHTML = element.event;
    const editEvent = document.createElement("span");
    editEvent.classList.add("edit_text");
    editEvent.innerHTML = "✍ Edit";
    eventSpan.appendChild(editEvent);
    // console.log(element)
    time.appendChild(eventSpan);
  });
  // console.log(data.map((events) => (events.time)))
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
  }

  if (event.target == modalAdd) {
    modalAdd.style.display = "none";
  }
};
