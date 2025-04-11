export function toggleLangMenu(){
    const country = document.querySelector(".countryContainer");
    const language = document.querySelector(".languageContainer");
    const body = document.body;

    const isLanguageOpen = language.classList.toggle("activeMenu");
    country.classList.remove("activeMenu");

    if (isLanguageOpen){
        body.classList.add("no-scroll");
    } else{
        body.classList.remove("no-scroll");
    }
}

export function selectLanguage(event){

    const userLanguage = event.target;

    localStorage.setItem("language", userLanguage);

    console.log(userLanguage.id);

    document.querySelector(".current-language").textContent = `Current Language: ${localStorage.getItem("language")}`;

    promptForLanguage(userLanguage.id);
    
}

function promptForLanguage(lang){

    const translateUrl = `https://translate.google.com/translate?sl=auto&tl=${lang}&u=${window.location.href}`;
    window.location.href = translateUrl;
    
}