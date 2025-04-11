import {fetchData, formatNumber} from './Components/fetchData.js';

document.addEventListener("DOMContentLoaded", function(){
   
    (async function (){
        const cryptoCoin = await fetchData("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
        const userData = await fetchData("./JSON/user-data.json");
    
        displayCryptoList(cryptoCoin);
        displayCryptoData(userData);
        displayGraph(userData);
    })();

});

function displayCryptoList(cryptoCoin){

   
    const cryptoContainer = document.querySelector(".crypto-listContainer");
    let counter = 0;

    for(let i = 0; i < 5; i += 1){

        const coin = cryptoCoin[counter];

        const cryptoList = document.createElement("li");
        cryptoList.classList.add("crypto-list");

        const cryptoImage = document.createElement("img");
        cryptoImage.src = coin.image;
        cryptoImage.alt = `${coin.name} image`;
        cryptoImage.id = "crypto-img";

        const cryptoSpan = document.createElement("span");
        cryptoSpan.textContent = coin.id;

        const cryptoP = document.createElement("p");
        cryptoP.textContent = `$${coin.current_price}`;

        const cryptoDiv = document.createElement("div");
        cryptoDiv.classList.add("crypto-name")

        cryptoDiv.appendChild(cryptoImage);
        cryptoDiv.appendChild(cryptoSpan);

        cryptoList.appendChild(cryptoDiv);
        cryptoList.appendChild(cryptoP);

        cryptoContainer.appendChild(cryptoList);

        counter += 1;
    
    }
}

function displayCryptoData(userData){

    const totalBalance = document.getElementById("total-balance");
    const totalFirst = document.getElementById("total-firstCoin");
    const totalConst = document.getElementById("total-secondCoin");
    const totalThird = document.getElementById("total-thirdCoin");
    const totalOthers = document.getElementById("total-othersCoin");

    const balanceContent = document.createElement("p");

        balanceContent.textContent = `${formatNumber(userData.cryptoBalance)}${userData.currency}`;
    
    const firstCrypto = document.createElement("p");

        firstCrypto.textContent = `${userData.firstCoin}%`;
    
    const secondCrypto = document.createElement("p");

        secondCrypto.textContent = `${userData.secondCoin}%`;

    const thirdCrypto = document.createElement("p");

        thirdCrypto.textContent = `${userData.thirdCoin}%`;

    const othersCrypto = document.createElement("p");

        othersCrypto.textContent = `${userData.others}%`;

    totalBalance.append(balanceContent);
    totalFirst.append(firstCrypto);
    totalConst.append(secondCrypto);
    totalThird.append(thirdCrypto);
    totalOthers.append(othersCrypto);
}


function displayGraph(userData){

    let themeColor;
    if(localStorage.getItem("theme") === "light"){
      themeColor = "black";
    } else{
      themeColor = "white"
    };

    function percentage(total, percentage){
        return (total * percentage) / 100;
    } 

    const walletData = [
        { reason: `BTC`, value: percentage(userData.cryptoBalance, userData.firstCoin,)},
        { reason: `ETH`, value: percentage(userData.cryptoBalance, userData.secondCoin)},
        { reason: `TETHER`, value: percentage(userData.cryptoBalance, userData.thirdCoin)},
        { reason: `Others`, value: percentage(userData.cryptoBalance, userData.others)},
    ];
    
    const doughnutCtx = document.getElementById("wallet-chart");

if (doughnutCtx) {
    new Chart(doughnutCtx, {
        type: "doughnut",
        data: {
            labels: walletData.map((row) => row.reason),
            datasets: [
                {
                    label: `${userData.currency}`,
                    data: walletData.map((row) => row.value),
                    backgroundColor: [
                        "hsl(60, 100.00%, 49.60%)", 
                        "hsl(204, 64.20%, 24.10%)", 
                        "hsl(94, 72.50%, 21.40%)", 
                        "hsl(347, 52.90%, 36.70%)"
                    ]
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: `${themeColor}`
                    }
                }
            }
        }
    });
} else {
    console.error("Doughnut Chart canvas element not found!");
}


}

