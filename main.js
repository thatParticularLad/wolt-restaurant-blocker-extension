//placeholder blocked restaurants
const blockedNames = ['grill-food', 'doublepizza']

// // Select the node that will be observed for mutations
// const mainContent = document.getElementById('mainContent');

// // Options for the observer (which mutations to observe)
// const config = { attributes: false, childList: true, subtree: true };

// // Callback function to execute when mutations are observed
// const callback = function(mutationsList, observer) {
//     for(const mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//             filterRestaurants()
//         }
//     }
// };

function getRestaurants(){
        const restaurants = document.querySelectorAll(`[href*='ltu/vilnius/restaurant/']`);
        return restaurants 
}

function filterRestaurants(){
    let restaurants = getRestaurants();    
    //now that we have em, we filter through each,
        //if current href matches restaurant name we already have in our blockList
        // and remove them from dom
    restaurants.forEach(restaurant =>{
        chrome.storage.local.get('blocked', blockedNames=>{
            blockedNames.blocked.forEach(blockedName=>{
                if(restaurant.href.includes(blockedName)){
                    if(restaurant.firstChild !== null){
                        restaurant.firstChild.remove()
                    }
                }
            })
        })
    })
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
window.addEventListener("click", filterRestaurants());
// Create an observer instance linked to the callback function
//  which filters the restaurants
// const observer = new MutationObserver(callback);

// // Start observing the target node for configured mutations
// observer.observe(mainContent, config);

setInterval(filterRestaurants, 500);


