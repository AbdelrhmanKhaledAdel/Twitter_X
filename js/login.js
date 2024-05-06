let login = document.querySelector(".log-in");
// let baseUrl = "https://tarmeezacademy.com/api/v1";
let mainLogIn = () => {
    return (login.innerHTML = `
    <div class="title">
                    <h1>Sign in to your Account</h1>
                    <p>Sign In with Social Media</p>
                </div>
                <ul class="icon-socil">
                    <li><a href="#"><i class="bi bi-twitter-x" style="--clr-icon: #000;"></i></a></li>
                    <li><a href="#"><i class="bi bi-facebook" style="--clr-icon: #1876f2;"></i></a></li>
                    <li><a href="#"><i class="bi bi-whatsapp" style="--clr-icon: #25d366;"></i></a></li>
                </ul>
                <div class="with">
                    <span></span>
                    <p>Or, sign in with your email</p>
                    <span></span>
                </div>
                <form action="home.html">
                    <div class="field username-field">
                        <div class="input-field">
                            <label for="username">Username</label>
                            <input type="text" name="username" id="username" placeholder="Enter your name"
                                class="username">
                        </div>
                        <span class="error email-error">
                            <i class="bi bi-exclamation-circle"></i>
                            <p>Please enter atleast 4 charatcer</p>
                        </span>
                    </div>
                    <div class="field create-password">
                        <div class="input-field">
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="Create Password" class="password">
                            <i class="bi bi-eye-slash-fill show-hide"></i>
                        </div>
                        <span class="error password-error">
                            <i class="bi bi-exclamation-circle"></i>
                            <p class="error-text">Please enter atleast 8 charatcer with number, small, capital letter
                                and special characters</p>
                        </span>
                    </div>
                    <div class="check-div">
                        <div class="cntr">
                            <input checked="trur" type="checkbox" id="cbx" class="hidden-xs-up" />
                            <label for="cbx" class="cbx"></label>
                        </div>
                        <span>I'm Not Robot</span>
                    </div>
                    <div class="input-field button">
                        <button class="submit-button disabled">Login Now</button>
                    </div>
                </form>
                <p class="last-p">Don't have an account? <a href="register.html">Register</a></p>
    `);
}
mainLogIn();

// Login Btn Modal


leftHeader.remove()
setting.addEventListener("click", openThemeModal)


// Validate

const form = document.querySelector("form"),
    usernameField = form.querySelector(".username-field"),
    usernameInput = usernameField.querySelector(".username"),
    passField = form.querySelector(".create-password"),
    passInput = passField.querySelector(".password")



function checkUername() {
    if(!usernameInput.value !== "" && usernameInput.value.length < 4) {
        return usernameField.classList.add("invalid");
    }
    usernameField.classList.remove("invalid");
}




// Hide and Show Password

const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input");
        if(pInput.type === "password") {
            eyeIcon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
            return pInput.type = "text"
        }
        eyeIcon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
        pInput.type = "password"
    });
});

// Password Validation
function createPass() {
    const passPattern = /^(?=.*[a-z])/;
    
    if(!passInput.value.match(passPattern)) {
        return passField.classList.add("invalid");
    }
    return passField.classList.remove("invalid");
}



// User Name Validate
form.addEventListener("submit", (e) => {
    e.preventDefault() // Preventing Form Submitting
    checkUername();
    createPass()
    usernameInput.addEventListener("keyup", checkUername)
    passInput.addEventListener("keyup", createPass)


    if(
        !usernameField.classList.contains("invalid")&&
        !passField.classList.contains("invalid")
    ){
        const password = document.getElementById("password").value
        const userName = document.getElementById("username").value
        const params = {
            "username": userName,
            "password": password
        }
        const url = `https://tarmeezacademy.com/api/v1/login`
        axios.post(url, params)
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            let userPasket = JSON.parse(localStorage.getItem("user"))
            userPasket["cover"] = ""
            userPasket["bio"] = ""
            localStorage.setItem("user", JSON.stringify(userPasket))
            
            setTimeout(() => {
                window.location.href = "home.html";
            },2000)
            
            showToast("success", 'logged in successfully')
        })
        .catch((error) => {
            showToast("danger", error)
        }).finally(() => {
            toggleLoader(false)
        })
    }
})


btnAdd.remove()


// ================================ Check Robot ==========================

// Selecting necessary Dom elements
const checkInput = document.getElementById("cbx")
const checkModal = document.querySelector(".check-modal")
const captchaTextBox = document.querySelector(".captch-box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captch-input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".submit");
const formBtn = document.querySelector(".submit-button")
console.log(formBtn);
checkInput.checked = false

checkInput.addEventListener("click", () => {
    checkModal.classList.add("active")
})

// Variable To store generated captcha
let captchaText = null;

// Function to generate captcha

const generateCaptcha = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const randomStringArray = randomString.split("");
    const changeString = randomStringArray.map(char => Math.random() > 0.5 ? char.toUpperCase() : char);
    captchaText = changeString.join(" ")
    captchaTextBox.value = captchaText
    console.log(randomString);
}


const refreshBtnClick = () => {
    generateCaptcha();
    captchaInputBox.value = "";
    captchaKeyUpValidate();

}

const captchaKeyUpValidate = () => {
    // Toggle Submit Button disable Class Based on Captcha Input Field.
    submitButton.classList.toggle("disabled", !captchaInputBox.value)

    if(captchaInputBox.value === "") message.classList.remove("active")
}

// Function To validate the entered captcha
const submitBtnClick = () => {
    captchaText = captchaText.split("")
    .filter(char => char !== " ")
    .join("")

    message.classList.add("active")
    // Check if the entered captcha text is corrent or not
    if(captchaInputBox.value === captchaText) {
        message.innerHTML = "Entered captcha is correct";
        message.style.color = "var(--color-primary)";

        setTimeout(() => {
            checkModal.classList.remove("active")
            formBtn.classList.remove("disabled")
        }, 1000)
        checkInput.checked = true
    }else  {
        message.innerHTML = "Entered captcha is not correct";
        message.style.color = "#ff2525";
    }
}
// Add event listeners for the refresh button , captchaInputBox, Submit Button
refreshButton.addEventListener("click", refreshBtnClick)
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate)
submitButton.addEventListener("click", submitBtnClick)

// Generate a captcha when the page loads
generateCaptcha()
console.log(refreshBtnClick());












