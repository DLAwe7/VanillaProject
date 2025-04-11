document.addEventListener("DOMContentLoaded", function(){

    displayUserInfo();
    loadEventListeners();

})

function loadEventListeners(){

    const inputContainer = document.querySelector(".input-container");

    document.querySelectorAll(".operative").forEach(button => {
        button.addEventListener("click", function(event){

            const clickedButton = event.currentTarget;
            const container = clickedButton.closest(".info-box");

            if(inputContainer.innerHTML.trim() !== ""){
                inputContainer.innerHTML = "";
            }

            const field = clickedButton.dataset.field;
            const labelText = clickedButton.dataset.label;
            const inputType = clickedButton.dataset.type;

            const currentValue = container.querySelector(`.${field}`)?.textContent || "";
            
            const inputLabel = document.createElement("label");

                inputLabel.htmlFor = "inputModify";
                inputLabel.textContent = labelText;

            const inputElement = document.createElement("input");

                inputElement.id = "inputModify";
                inputElement.type = inputType;
                inputElement.value = currentValue;
                inputElement.name = field;


            inputContainer.append(inputLabel);
            inputContainer.append(inputElement);

            document.querySelector(".edit-cardData").addEventListener("submit", function(event){

                const storedUser = JSON.parse(localStorage.getItem("userData"));

                event.preventDefault();
        
                const formData = new FormData(this);
        
                const inputtedData = formData.get(`${field}`);

                storedUser[field] = inputtedData;

                localStorage.setItem("userData", JSON.stringify(storedUser));

                displayUserInfo();
                closeMenu();
        
            })

            openMenu();

        })

})};



function displayUserInfo(){

    const userData = JSON.parse(localStorage.getItem("userData")) || {};

    const nameDisplayer = document.querySelector(".username");
    const birthDayDisplayer = document.querySelector(".birthday");
    const emailDisplayer = document.querySelector(".email");
    const phoneDisplayer = document.querySelector(".telephone")

 
    nameDisplayer.textContent = userData.username;
    birthDayDisplayer.textContent = userData.birthday || "Birth date not provided";
    emailDisplayer.textContent = userData.email;
    phoneDisplayer.textContent = userData.telephone || "Phone number not provided";

}

const menuAccount = document.querySelector(".edit-cardData");

function openMenu(){
    
    menuAccount.style.display = "flex";

    document.querySelector(".button-type").addEventListener("click", closeMenu);
    
}


function closeMenu(){

    menuAccount.style.display = "none"; 

}

