const usernameForm = document.getElementById("username-field");
const passwordForm = document.getElementById("password-field");

const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const registerMsg = document.getElementById("register-msg");

const registerButton = document.getElementById("register-form-submit");

const loginHeader = document.getElementById("login-header");
const registerHeader = document.getElementById("register-header");
const registerFormVis = document.getElementById("register-form");
const loginFormVis = document.getElementById("login-form");

if(localStorage.getItem("username") == null) {
    localStorage.setItem("username", "u0");
    localStorage.setItem("pwd", "p0");
}

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const usernameFormV = usernameForm.value;
    const passwordFormV = passwordForm.value;

    localStorage.setItem("usernameInput", usernameFormV);
    localStorage.setItem("pwdInput", passwordFormV);

    if ((localStorage.getItem("usernameInput") === localStorage.getItem("username"))
        || (localStorage.getItem("usernameInput") === localStorage.getItem("usernameNew"))
        && (localStorage.getItem("usernameInput") !== "")) {
        if(localStorage.getItem("pwdInput") === localStorage.getItem("pwd")
            || (localStorage.getItem("pwdInput") === localStorage.getItem("pwdNew"))
            && (localStorage.getItem("pwdInput") !== "")) {
            alert("You have successfully logged in.");
            // location.reload();
        } else if(localStorage.getItem("pwdInput") !== localStorage.getItem("pwd")) {
            alert("Invalid Username/Password.");
            location.reload();
        }
    } else {
        alert("Invalid Username/Password.");
        location.reload();

        loginErrorMsg.style.opacity = 1;
        registerMsg.style.opacity = 1;

        registerHeader.style.opacity = 1;
        loginHeader.style.opacity = 0;

        loginFormVis.style.opacity = 0;
        usernameForm.style.opacity = 0;
        registerFormVis.style.opacity = 1;

        // Store more ppl but not urnm++, logic is not correct
        // Store in urnm, but in an array?
    }
})

registerButton.addEventListener("click", (e) => {
    e.preventDefault();

    const usernameFormR = document.getElementById("usernameR-field");
    const passwordFormR = document.getElementById("passwordR-field");

    const usernameFormRV = usernameFormR.value;
    const passwordFormRV = passwordFormR.value;

    localStorage.setItem("usernameNew", usernameFormRV);
    localStorage.setItem("pwdNew", passwordFormRV);

    location.reload();
})