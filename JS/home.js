document.addEventListener("DOMContentLoaded", function(){

    

    let cardIndex = 0;
    let intervalId = null;

    const cards = document.querySelectorAll(".card");

    document.querySelector(".prev").addEventListener("click", prevSlide);
    document.querySelector(".next").addEventListener("click", nextSlide);
    
    initializeSlider();

    function initializeSlider(){

        if(cards.length > 0){

            cards[cardIndex].classList.add("display-card");
            intervalId = setInterval(nextSlide, 5000);
            
        }

    }

    function showSlide(index){

        if(index >= cards.length){
            cardIndex = 0;
        }
    
        else if(index < 0){
            cardIndex = cards.length - 1;
            
        }
    
        cards.forEach(card => {
            card.classList.remove("display-card");
        });
    
        cards[cardIndex].classList.add("display-card");
    
    };
    
    function prevSlide(){
        clearInterval(intervalId)
        cardIndex -= 1;
        showSlide(cardIndex)
    
    };
    
    function nextSlide(){
        cardIndex += 1;
        showSlide(cardIndex)
        
    
    };

});

