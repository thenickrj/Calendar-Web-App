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
  }, 3000);
}

function register() {
  var userName = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  const data = {
    name: userName,
    email: email,
    password: password,
  };
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "http://localhost:3000/signup", true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.send(JSON.stringify({
  //     name: userName,
  //     email: email,
  //     password: password,
  // }));
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

  if (
    validateEmail(email) &&
    userName !== "" &&
    userName !== undefined &&
    password !== "" &&
    password !== undefined
  ) {
    postData("https://thenick-calendar.herokuapp.com/register", data).then(
      (data) => {
        if (data === "Account already exist") {
          popUpNotify(data);
        } else {
          popUpNotify("Account Created");
          window.location.href = "/login";
        }
        // alert(data); // JSON data parsed by `data.json()` call
        // if (data === "New User Signed Up!!") {
        //   window.location.href = "/login";
        // }
      }
    );
  } else if (
    (email == "" || email == undefined) &&
    (password == "" || password == undefined) &&
    (userName == "" || userName == undefined)
  ) {
    popUpNotify("Enter the complete details!");
  } else if (userName === "" && userName === undefined) {
    popUpNotify("Username cannot be empty!");
  } else if (!validateEmail(email)) {
    popUpNotify("Enter the Valid Email!");
  } else if (password === "" && password === undefined) {
    popUpNotify("Password cannot be empty!");
  }
}
