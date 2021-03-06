function validateEmail(emailCheck) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailCheck).toLowerCase());
}

function popUpNotify(data) {
  var x = document.getElementById("snackbar");
  x.innerHTML = data;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2000);
}

function login() {
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;

  if (validateEmail(email) && password !== "" && password !== undefined) {
    const data = {
      email: email,
      password: password,
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
    postData("https://thenick-calendar.herokuapp.com/signin", data).then(
      (data) => {
        // console.log(data); // JSON data parsed by `data.json()` call
        if (data == "Invalid Credentials") {
          popUpNotify(data);
          // localStorage.calUserName = data.username;
          // localStorage.calEmail = email;
          // localStorage.calStatus = "true";
          // window.location.href = "/";
        } else {
          popUpNotify("User successfully logged in");

          localStorage.setItem("calInfo", JSON.stringify(data));
          (window.location.href = "/"), true;
        }
      }
    );
  } else if (
    (email == "" || email == undefined) &&
    (password == "" || password == undefined)
  ) {
    popUpNotify("Enter Email and Password");
  } else if (email == "" || email == undefined) {
    popUpNotify("Enter Email");
  } else if (password == "" || password == undefined) {
    popUpNotify("Enter Password");
  } else if (!validateEmail(email)) {
    popUpNotify("Enter Valid Email ");
  }
}

function loginTesst() {
  console.log("YESSS");
}

function loginTest() {
  var email = "test@email.com";
  var password = "1234";

  if (validateEmail(email) && password !== "" && password !== undefined) {
    const data = {
      email: email,
      password: password,
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
    postData("https://thenick-calendar.herokuapp.com/signin", data).then(
      (data) => {
        // console.log(data); // JSON data parsed by `data.json()` call
        if (data == "Invalid Credentials") {
          popUpNotify(data);
          // localStorage.calUserName = data.username;
          // localStorage.calEmail = email;
          // localStorage.calStatus = "true";
          // window.location.href = "/";
        } else {
          popUpNotify("User successfully logged in");

          localStorage.setItem("calInfo", JSON.stringify(data));

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      }
    );
  }
}
