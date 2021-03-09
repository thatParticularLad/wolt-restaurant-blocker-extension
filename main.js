//placeholder blocked restaurants
const blockedNames = ['vili-pica']

function getRestaurants(){
        const restaurants = document.querySelectorAll(`[href*='ltu/vilnius/restaurant/']`);
        return restaurants 
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}

function filterRestaurants(){
    let restaurants = getRestaurants();    
    //now that we have em, we filter through each,
        //if current href matches restaurant name we already have in our blockList
        // and set their visibility to none
    restaurants.forEach(restaurant =>{
        chrome.storage.local.get('blocked', blockedNames=>{
            blockedNames.blocked.forEach(blockedName=>{
                if(restaurant.href.includes(blockedName)){
                    if(restaurant.firstChild !== null && !isHidden(restaurant.firstChild)){
                        restaurant.firstChild.classList.add('hidden')
                    }
                }
            })
        })
    })
}


window.onload = function(){
    chrome.storage.local.get('blocked', function(restaurants){
        if(restaurants.blocked==undefined){
            chrome.storage.local.set({'blocked': blockedNames})
        }
    });
    
}
// window.addEventListener("click", filterRestaurants());

setInterval(filterRestaurants, 500);


