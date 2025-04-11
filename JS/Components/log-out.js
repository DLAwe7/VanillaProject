export function logOut(){
    
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("theme");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("userData");
    localStorage.removeItem("country");
    localStorage.removeItem("language");
    window.location.href = "index.html";
}
