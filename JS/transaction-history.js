import {fetchData, formatNumber} from './Components/fetchData.js';

document.addEventListener("DOMContentLoaded", function(){

    (async function (){
    const userHistory = await fetchData("./JSON/user-history.json");

    createTransactionCard(userHistory);
    })();
 
})

function createTransactionCard(usersData){

    const transactionsTable = document.querySelector(".transactions-history")

    usersData.forEach(data => {

        let sign;

        if(data.expense === true){
            sign = "-"
        }else{
            sign = "+"
        }

        const tableRow = document.createElement("tr");

            tableRow.classList.add("table-row");

        const tableD1 = document.createElement("td");

            tableD1.classList.add("row");

            tableD1.textContent = `${data.date}`;

        const tableD2 = document.createElement("td");

            tableD2.classList.add("row");
            tableD2.textContent = `${data.reason}`;

        const tableD3 = document.createElement("td");

            tableD3.classList.add("row");
            tableD3.textContent = `${sign} ${formatNumber(data.amount)}${data.currency}`;



        tableRow.append(tableD1)
        tableRow.append(tableD2)    
        tableRow.append(tableD3)
        transactionsTable.append(tableRow)
    })




}
