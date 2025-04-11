
document.addEventListener("DOMContentLoaded", function() {

    const logInForm = document.querySelector(".log-inForm");
    const signInForm = document.querySelector(".sign-inForm");
    const recoveryForm = document.querySelector(".recoveryForm");

    document.getElementById("forgotten-button").addEventListener("click", recoverAccount);
    document.getElementById("create-button").addEventListener("click", createAccount);
    document.querySelectorAll(".return-button").forEach(button => {
        button.addEventListener("click", logInAccount);
    });

    function recoverAccount(){

        hideAllForms();
        recoveryForm.classList.add("visibility");

    };

    function createAccount(){

        hideAllForms();
        signInForm.classList.add("visibility");

    };

    function logInAccount(){

        hideAllForms();
        recoveryForm.classList.remove("visibility");
        logInForm.classList.add("visibility")
        
    }

    function hideAllForms(){
        logInForm.classList.remove("visibility");
        signInForm.classList.remove("visibility");
        recoveryForm.classList.remove("visibility");
    }

        
    document.querySelector(".log-inForm").addEventListener("submit", function(event){

        event.preventDefault();

        const formData = new FormData(this);

        const emailOrUsername = formData.get("usernameOrEmail");
        const password = formData.get("log-inPassword");
        const rememberMe = formData.get("rememberMe") ? true : false;

        logIn(emailOrUsername, password, rememberMe);


    })

    document.querySelector(".sign-inForm").addEventListener("submit", function(event){

        event.preventDefault();

        const formData = new FormData(this);

        const username = formData.get("username-form");
        const email = formData.get("email-form");
        const password = formData.get("sign-inPassword");
        const passVerif = formData.get("password-verification");
        const telephone = formData.get("sign-inTel");
        const birthday = formData.get("birthday-form");

        if(passVerif !== passVerif){
            console.log("Passwords do not match!");
            return;
        }

        signIn(username, email, password, telephone, birthday);
    })


    document.querySelector(".recoveryForm").addEventListener("submit", function(event){

        event.preventDefault();

        const formData = new FormData(this);

        const emailRecovery = formData.get("email-recovery");


        localStorage.setItem("email/userRecovery", emailRecovery);


    })

    function signIn(username, email, password, telephone = "", birthday = ""){

        const userData = {

            username,
            email,
            password,
            telephone,
            birthday

        };
        
        localStorage.setItem("userData", JSON.stringify(userData));

        localStorage.setItem("isLoggedIn", JSON.stringify(true));

        window.location.href = "dashboard.html"
       
    }
    
    function logIn(emailOrUsername, password, rememberMe){

        const storedUser = JSON.parse(localStorage.getItem("userData"));

        if((storedUser.username === emailOrUsername || storedUser.email === emailOrUsername) && storedUser.password === password){

            localStorage.setItem("isLoggedIn", JSON.stringify(true))
            window.location.href = "dashboard.html"

            if(rememberMe){
                localStorage.setItem("rememberMe", JSON.stringify(true));
            }

            

        }else{
            console.log("Invalid credentials. Try again.")
        }

    }   
});
