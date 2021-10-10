function validateEmail(emailCheck) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailCheck).toLowerCase());
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
    postData("http://localhost:3000/signup", data).then((data) => {
      alert(data); // JSON data parsed by `data.json()` call
      if (data === "New User Signed Up!!") {
        window.location.href = "/login";
      }
    });
  } else if (
    (email == "" || email == undefined) &&
    (password == "" || password == undefined) &&
    (userName == "" || userName == undefined)
  ) {
    alert("Enter the complete details!");
  } else if (userName === "" && userName === undefined) {
    alert("Username cannot be empty!");
  } else if (!validateEmail(email)) {
    alert("Enter the Valid Email!");
  } else if (password === "" && password === undefined) {
    alert("Password cannot be empty!");
  }
}
