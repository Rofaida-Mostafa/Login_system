let signupName = document.querySelector("#signupName");
let signupEmail = document.querySelector("#signupEmail");
let signupPassword = document.querySelector("#signupPassword");
let loginEmail = document.querySelector("#loginEmail");
let yourName = document.querySelector("#usernameHome");
let loginPassword = document.querySelector("#loginPassword");
let signupButton = document.querySelector("#btns");
let toLogin = document.querySelector("#toLogin");
let loginButton = document.querySelector("#btnlogin");
let toHome = document.querySelector("#toHome");
let signup_Message = document.querySelector("#message");
let login_Message = document.querySelector("#wrongs");
let logout = document.querySelector("#logout");
let smallLogout = document.querySelector("#smallLogout");

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (signup Form) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //

let usersArray = [];
if (localStorage.getItem("users") != null) {
  usersArray = JSON.parse(localStorage.getItem("users"));
}

console.log(usersArray);

// ->->->->-> (check Email) <-<-<-<-<- //

function checkEmail() {
  for (let i = 0; i < usersArray.length; i++) {
    if (signupEmail.value === usersArray[i].userEmail) {
      return false;
    }
  }
}

// ->->->->-> (Signup code) <-<-<-<-<- //

if (signupButton) {
  signupButton.addEventListener("click", function () {
    // ->->->->-> (Check empty inputs code) <-<-<-<-<- //

    if (
      signupEmail.value == "" ||
      signupPassword.value == "" ||
      signupName.value == ""
    ) {
      signup_Message.innerHTML =
        '<span class="fw-bold text-danger m-4"> All inputs is required. </span>';
      return false;
    }

    let userName = signupName.value;
    let email = signupEmail.value;
    let pass = signupPassword.value;

    let users = {
      userName: userName,
      userEmail: email,
      userPassword: pass,
    };

    // ->->->->-> (Validation inputs code) <-<-<-<-<- //

    if (
      /^[a-z][\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(signupEmail.value) &&
      /^[A-Z]\w{3,}(\s+\w+)*$/.test(signupName.value) &&
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        signupPassword.value
      )
    ) {
      // ->->->->-> (userArray has no data code) <-<-<-<-<- //

      if (usersArray.length == 0) {
        usersArray.push(users);
        let setData = JSON.stringify(usersArray);
        localStorage.setItem("users", setData);
        window.location.pathname = "login-system/index.html";

        return true;
      }

      // ->->->->-> (userArray has data code) <-<-<-<-<- //

      for (let i = 0; i < usersArray.length; i++) {
        if (checkEmail() == false) {
          signup_Message.textContent = "Email already exists.";
        } else {
          usersArray.push(users);
          let setData = JSON.stringify(usersArray);
          localStorage.setItem("users", setData);
          signup_Message.innerHTML =
            '<span class= "fw-bold text-success m-4"> Registration is success. </span>';

          window.location.pathname = "login-system/index.html";

          return true;
        }
      }
      return true;
    } else {
      signup_Message.innerHTML = `  
      <span class="fw-bold text-danger m-4 ">
        <b> - </b> Name must start with capital & more than 2 letters.
        <br> <b> - </b> Email must have @ sign & start with small letter. <br>
        <p> <b> - </b> Password must have one capital & one small letter, must have<br>  at
            leat one number & one special character like (@-%) <br> And not less than 8 characters.
        </p>
      </span>`;

      return false;
    }
  });
}
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Login Form) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //
if (loginButton) {
  loginButton.addEventListener("click", function () {
    if (loginEmail.value != "" && loginPassword.value != "") {
      let check = false;

      // ->->->->-> (Check data user is valid or not  code) <-<-<-<-<- //

      for (let i = 0; i < usersArray.length; i++) {
        if (
          loginEmail.value == usersArray[i].userEmail &&
          loginPassword.value == usersArray[i].userPassword
        ) {
          check = true;
          sessionStorage.setItem("name", usersArray[i].userName);
          sessionStorage.setItem("id", i);
        }
      }

      // ->->->->-> (Check function message code) <-<-<-<-<- //

      if (check) {
        login_Message.innerHTML =
          '<span class= "fw-bold text-success m-4">  "correct email or password"</span>';

        window.location.pathname = "login-system/home.html";
      } else {
        login_Message.textContent = "incorrect email or password";
      }
      return true;
    } else {
      login_Message.textContent = "All inputs required";
    }
  });
}

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Home page) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //

function setName(name) {
  yourName.textContent = `Welcome: { ${name} }`;
}
if (yourName != null) {
  setName(sessionStorage.getItem("name"));
}

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Clear Form) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //

function clearForm() {
  signupName.value ? (signupName.value = "") : "";
  signupEmail.value ? (signupEmail.value = "") : "";
  signupPassword.value ? (signupPassword.value = "") : "";
}

function clearFormlog() {
  loginPassword.value ? (loginPassword.value = "") : "";
  loginEmail.value ? (loginEmail.value = "") : "";
}

window.addEventListener("load", () => {
  if (location.pathname == "login-system/index.html") {
    clearFormlog();
  }
});
window.addEventListener("load", () => {
  if (location.pathname == "login-system/signup.html") {
    clearForm();
  }
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Logout) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //
function logoutMethod(name) {
  name.addEventListener("click", () => {
    window.location.pathname = "login-system/index.html";
    localStorage.removeItem("id");
  });
}

if (logout) {
  logoutMethod(logout);
}

if (smallLogout) {
  logoutMethod(smallLogout);
}
