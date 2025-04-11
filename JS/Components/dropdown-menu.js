export function applySavedTheme(){

    let savedTheme = localStorage.getItem("theme");
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");

    if (!savedTheme){
        savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        localStorage.setItem("theme", savedTheme);
    }

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        sun.classList.add("activeMenu");
        moon.classList.remove("activeMenu");
    }else{
        document.body.classList.remove("light-mode");
        sun.classList.remove("activeMenu");
        moon.classList.add("activeMenu");
    }

}



export function openDropdownMenu(event){ 

    const dropdownMenu = document.querySelector(".dropdown-menu");

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    event.stopPropagation();

    dropdownMenu.classList.toggle("show");

    document.querySelector(".header-UserName").textContent = `${storedUser.username}`
    document.querySelector(".header-atUserName").textContent = `@${storedUser.username}`

    document.addEventListener("click", closeDropdownMenu);
    
};

export function closeDropdownMenu(event){
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const themeBtn = document.querySelector("#theme-toggle");

    if (!themeBtn.contains(event.target)) {
        dropdownMenu.classList.remove("show");
        document.removeEventListener("click", closeDropdownMenu);
    }
     
};

export function toggleLightMode(){

    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");

    const isLightMode = document.body.classList.toggle("light-mode");

    localStorage.setItem("theme", isLightMode ? "light" : "dark");

    if(isLightMode){
        sun.classList.add("activeMenu");
        moon.classList.remove("activeMenu");
    }else{
        sun.classList.remove("activeMenu");
        moon.classList.add("activeMenu");
    }

}

