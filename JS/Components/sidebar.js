export function openSidebar(){
    document.querySelector(".sidebar").style.transform = "translateX(0)";
}

export function closeSidebar(){
    document.querySelector(".sidebar").style.transform = "translateX(-100%)";
}

export function displayInvesting(){
    const investing = document.querySelector(".investingTab");
    investing.classList.toggle("active");
}