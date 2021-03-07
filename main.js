//placeholder blocked restaurants
const blockedNames = ['grill-food', 'doublepizza']

function getRestaurants(){
        const restaurants = document.querySelectorAll(`[href*='ltu/vilnius/restaurant/']`);
        return restaurants 
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

// Where el is the DOM element you'd like to test for visibility
function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}

window.onload = function(){
    chrome.storage.local.get('blocked', function(restaurants){
        // chrome.storage.local.clear()
        if(restaurants.blocked==undefined){
            //add initial blocked restaurant(s)
            chrome.storage.local.set({'blocked': blockedNames})
        }
    });
    
}
// window.addEventListener("click", filterRestaurants());

setInterval(filterRestaurants, 500);


