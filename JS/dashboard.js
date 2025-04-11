import {fetchData, formatNumber} from './Components/fetchData.js';

document.addEventListener("DOMContentLoaded", function(){


  (async function (){
    const userData = await fetchData("./JSON/user-data.json");
    const userHistory = await fetchData("./JSON/user-history.json");

    createTransactionCard(userHistory);
    displayData(userData);
    graphData(userHistory);
    progressBarWidth(userData)

  })();

});

function graphData(history){

  let doughnutDataMap = [];
  let barDataMap = [];
  let itemHolder = [];

  const months = {
    "January": "01",
    "February": "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "august": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12"
  };

  history.forEach(item => {

    const monthNumber = item.date.split("/")[1];

    const monthName = Object.keys(months).find(key => months[key] === monthNumber);

    doughnutDataMap.push({"reason": item.reason, "value": item.amount});

    itemHolder.push({"month": monthName, "count": item.amount});

  })

  itemHolder.forEach(item => {

    const month = item.month;

    if(!barDataMap[month]){
    barDataMap[month] = 0;
    }
    barDataMap[month] += item.count;
  })

  const barData = Object.entries(barDataMap).map(([month, count]) => ({
    month,
    count
  }));

  function getTopFiveExpenses(doughnutData){
    return doughnutData
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }

  const doughnutData = getTopFiveExpenses(doughnutDataMap);


  displayGraphs(doughnutData, barData);

}

function displayGraphs(doughnutData, barData) {


  let themeColor;
  if(localStorage.getItem("theme") === "light"){
    themeColor = "black";
  } else{
    themeColor = "white"
  };

  const doughnutCtx = document.getElementById("myChart");
  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: "doughnut",
      data: {
        labels: doughnutData.map((row) => row.reason),
        datasets: [
          {
            label: "€",
            data: doughnutData.map((row) => row.value),
            backgroundColor: [
              "hsl(348, 100%, 71%)",
              "hsl(207, 90%, 60%)",
              "hsl(48, 100%, 67%)",
              "hsl(141, 53%, 53%)",
              "hsl(271, 100%, 72%)"
            ],
          },
        ],
      },
      options: {
        plugins: {
            legend: {
                labels: {
                    color: `${themeColor}`
                },
              
            }
        }
    },
    });
  } else {
    console.error("Doughnut Chart canvas element not found!");
  }

  const barCtx = document.getElementById("myGraph");
  if (barCtx) {
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: barData.map((row) => row.month),
        datasets: [
          {
            label: "Monthly Expenses",
            data: barData.map((row) => row.count),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
              labels: {
                  color: `${themeColor}`
              }
          }
        },
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
          y: {
            ticks: {
              color: `${themeColor}`,
            },
            beginAtZero: true
          },
          x:{
            ticks: {
              color:`${themeColor}`,
            }
          },
        },
        },
    });
  } else {
    console.error("Bar Chart canvas element not found!");
  }
}

function progressBarWidth(userData){

  const progressBar = document.querySelector(".progress-accomplished");

  const totalWidth = (userData.Progress * 100 / userData.Goal);
    
    progressBar.style.width = `${totalWidth}%`;


}

function createTransactionCard(userHistory){

  const transactionsTable = document.querySelector(".transactions-history")

  for(let i = userHistory.length - 1; i >= userHistory.length - 4; i -= 1){

    let sign;

        if(userHistory[i].expense === true){
            sign = "-"
        }else{
            sign = "+"
        }

    const tableRow = document.createElement("tr");

            tableRow.classList.add("table-row");

        const tableD1 = document.createElement("td");

            tableD1.classList.add("row");

            tableD1.textContent = `${userHistory[i].date}`;

        const tableD2 = document.createElement("td");

            tableD2.classList.add("row");
            tableD2.textContent = `${userHistory[i].reason}`;

        const tableD3 = document.createElement("td");

            tableD3.classList.add("row");
            tableD3.textContent = `${sign} ${userHistory[i].amount}${userHistory[i].currency}`;



        tableRow.append(tableD1)
        tableRow.append(tableD2)    
        tableRow.append(tableD3)
        transactionsTable.append(tableRow)

  }

}


function displayData(userData){

  const totalBalance = document.querySelector(".total-balance");
  const avrSavings = document.querySelector(".avrSavings");
  const lastDeposit = document.querySelector(".lastDeposit");
  const totalSavings = document.querySelector(".totalSavings");
  const progress = document.querySelector(".bar-containerProgress");
  const goal = document.querySelector(".bar-containerGoal");
  const user = userData;

  totalBalance.textContent = `${formatNumber(user.Balance)}${user.currency}`;
  avrSavings.textContent = `${user.AverageSav}%`;
  lastDeposit.textContent =`${formatNumber(user.LastDep)}${user.currency}`;
  totalSavings.textContent = `${formatNumber(user.TotalSav)}${user.currency}`
  progress.textContent = `Progress: ${formatNumber(user.Progress)}${user.currency}`;
  goal.textContent = `Goal: ${formatNumber(user.Goal)}${user.currency}`;


}

