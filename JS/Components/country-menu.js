export function toggleCountryMenu(){
    const country = document.querySelector(".countryContainer");
    const language = document.querySelector(".languageContainer");
    const body = document.body;

    const isCountryOpen = country.classList.toggle("activeMenu");

    language.classList.remove("activeMenu");

    if (isCountryOpen){
        body.classList.add("no-scroll");
    } else{
        body.classList.remove("no-scroll");
    }
}

export function selectCountry(event) {
    
    const userCountry = event.target.textContent;
    localStorage.setItem("country", userCountry);

    document.querySelector(".current-country").textContent = `Current Country: ${localStorage.getItem("country")}`;
    
}