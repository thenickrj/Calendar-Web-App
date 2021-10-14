function validateEmail(emailCheck) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailCheck).toLowerCase());
}

function login() {
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  console.log(password, email);
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
    postData("http://localhost:3000/login", data).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      if (data.status == true) {
        alert("User successfully logged in");
        localStorage.calUserName = data.username;
        localStorage.calEmail = email;
        localStorage.calStatus = "true";
        window.location.href = "/";
      } else if (data.status == false) {
        alert("Wrong Credentials!");
      } else {
        alert(data);
      }
    });
  } else if (
    (email == "" || email == undefined) &&
    (password == "" || password == undefined)
  ) {
    alert("Enter Email and Password");
  } else if (email == "" || email == undefined) {
    alert("Enter Email");
  } else if (password == "" || password == undefined) {
    alert("Enter Password");
  } else if (!validateEmail(email)) {
    alert("Enter Valid Email ");
  }
}
