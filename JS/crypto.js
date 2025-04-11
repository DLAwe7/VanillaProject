import {fetchData, formatNumber} from './Components/fetchData.js';

let cryptoData = [];
let existingChart = null;


document.addEventListener("DOMContentLoaded", function(){

  (async function (){

    const cryptoCoins = await fetchData("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");

    cryptoData = cryptoCoins;

    createCard(cryptoData[0]);
    dynamicTitle(cryptoData[0].id, cryptoData[0].image) 
    displayGraph(cryptoData[0].id);
    cryptoMenu();

  })();   
    
});

function cryptoMenu(){

  const cryptoContainer = document.querySelector(".cryptos-list");

  cryptoData.forEach(coin => {

  const newCryptoCard = document.createElement("li");

    newCryptoCard.tabIndex = 0;
    newCryptoCard.classList.add("crypto-card");
    newCryptoCard.id = coin.id;
    newCryptoCard.setAttribute("data-name", coin.name);

  const cryptoImage = document.createElement("img");

    cryptoImage.src = coin.image;
    cryptoImage.alt = `${coin.name} image`;
    cryptoImage.id = `crypto-img`;

  const cryptoName = document.createElement("span");

    cryptoName.textContent = coin.name;

  const cryptoPrice = document.createElement("p");

    cryptoPrice.textContent = `$${coin.current_price}`

  const cryptoText = document.createElement("div");

    cryptoText.classList.add("crypto-text");


  cryptoText.appendChild(cryptoImage);
  cryptoText.appendChild(cryptoName);

  newCryptoCard.appendChild(cryptoText);
  newCryptoCard.appendChild(cryptoPrice);

  cryptoContainer.append(newCryptoCard);

})}


function createCard(cryptoObject){

  const propertiesToDisplay = ["current_price", "price_change_24h", "ath", "market_cap",
  "market_cap_rank", "circulating_supply", "high_24h", "low_24h", "last_updated"];

  const cryptoInfoContainer = document.querySelector(".info-cards");

  cryptoInfoContainer.innerHTML = ``

  propertiesToDisplay.forEach((property) => {

    if(property in cryptoObject){

      const cardContainer = document.createElement("li");
      cardContainer.classList.add("info-card");

      const cardh3 = document.createElement("h3");

      cardh3.textContent =  `${property.toUpperCase()}`;

      const cardP = document.createElement("p");

      cardP.textContent = cryptoObject[property];

      cardContainer.appendChild(cardh3);
      cardContainer.appendChild(cardP);
      cryptoInfoContainer.appendChild(cardContainer);
    }
  })
};


const searchInput = document.getElementById("crypto-searcher");
const dropdown = document.querySelector(".cryptos-list");

searchInput.addEventListener("input", filterCryptos);
searchInput.addEventListener("click", showCryptoMenu); 

function showCryptoMenu(){
  dropdown.style.display = "block";
}

function filterCryptos(){

  const inputValue = searchInput.value.trim().toLowerCase();

  if(inputValue !== ""){
    dropdown.style.display = "flex";
  } else{
    dropdown.style.display = "none";
  }

  document.querySelectorAll(".crypto-card").forEach(card => {

    const cardID = card.id.toLowerCase();
    const cardName = card.getAttribute("data-name").toLowerCase();

    if(cardID.includes(inputValue) || cardName.includes(inputValue)){
      card.style.display = "flex";
    }else{
      card.style.display = "none";
    }

  })
};

document.addEventListener("click", function(event){

  if (!searchInput.contains(event.target) && (dropdown.contains(event.target) || !dropdown.contains(event.target))) {
    dropdown.style.display = "none";
  }}
); 

document.querySelector(".cryptos-list").addEventListener("click", (event) => {

  const card = event.target.closest(".crypto-card");

  if(!card) return;

  const cardId = card.id
  const cryptoItem = cryptoData.find(item => item.id === cardId);
  
  createCard(cryptoItem);

  dynamicTitle(cardId, cryptoItem.image);

  displayGraph(cardId);

});

function dynamicTitle(cryptoID, cryptoIMG){
  const nameDisplay = document.querySelector(".chosen-crypto");
  
  const coinImage = document.createElement("img");

  coinImage.src = cryptoIMG;
  coinImage.alt = `${cryptoID} logo`

  const coinChoice = document.createElement("span");

  coinChoice.textContent = `${cryptoID.toUpperCase()}`

  nameDisplay.innerHTML = ""
  nameDisplay.append(coinImage, coinChoice)
};

async function displayGraph(cryptoCoin) {
  try{
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoCoin}/market_chart?vs_currency=usd&days=30`);

    if(!response.ok){
      throw new Error("Could not fetch resource");                
    }

    const data = await response.json();

    const labels = data.prices.map(item => new Date(item[0]).toLocaleDateString());
    const prices = data.prices.map(item => item[1]);   
    
    const lineCtx = document.querySelector(".crypto-graph").getContext("2d");

    if(existingChart){
      existingChart.destroy();
    }

    existingChart = new Chart(lineCtx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `${cryptoCoin.toUpperCase()} Price (USD)`,
                data: prices,
                borderColor: "rgba(25, 25, 28, 0.88)",
                backgroundColor: "rgba(16, 16, 149, 0.1)",
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { title: { display: true, text: "Price (USD)" } }
            }
        }
    });
  }catch(error){
    console.error(error);
  }
}   



