import {fetchData, formatNumber} from './Components/fetchData.js';

document.addEventListener("DOMContentLoaded", function(){

    (async function (){

        const usersList = await fetchData("./JSON/users-list.json");

        createPostCard(usersList);
    })();

    
})
       
    
document.querySelectorAll(".news-toggle").forEach(button => {
    button.addEventListener("click", openAside);
    
});


document.querySelector(".news-closingBtn").addEventListener("click", closeAside);


function openAside(){
    document.querySelector(".second-aside").style.transform = "translateX(0)";
}

function closeAside(){
    document.querySelector(".second-aside").style.transform = "translateX(100%)";
}



const postContainer = document.querySelector(".cards-listContainer");


function createPostCard(usersList){

    usersList.forEach(user => {

        const newPostCard = document.createElement("li");

        newPostCard.classList.add("post-card");

    const postH1 = document.createElement("h1");

        postH1.textContent = `${user.postTitle}`

    const userInfoRow = document.createElement("div");

        userInfoRow.classList.add("userDisplay")

    const postIMG = document.createElement("img");

        postIMG.src = `./Assets/${user.userImage}.webp`;
        postIMG.alt = `${user.userName} image`;
        postIMG.classList.add("forumImage")

    const postUser = document.createElement("span");

        postUser.classList.add("userName");

        postUser.textContent = `${user.userName}`;

    const postParagraph = document.createElement("p");

        postParagraph.classList.add("commentContent");

    postParagraph.textContent = `${user.postContent}`;


    const postIconsContainer = document.createElement("ul");
    postIconsContainer.classList.add("icon-container");

        
    const iconsList = ["fa-thumbs-up", "fa-thumbs-down", "fa-comment", "fa-thumbtack", "fa-share"];

    for(let i = 0; i < iconsList.length; i += 1){

        const itemHolder = document.createElement("li");

        const iconItem = document.createElement("i");

        iconItem.classList.add("fa-solid", iconsList[i]);

        itemHolder.append(iconItem);
        postIconsContainer.append(itemHolder);
    }

    userInfoRow.append(postIMG);
    userInfoRow.append(postUser);

    newPostCard.append(postH1);
    newPostCard.append(userInfoRow);       
    newPostCard.append(postParagraph);
    newPostCard.append(postIconsContainer);
    postContainer.append(newPostCard);

    })

}



