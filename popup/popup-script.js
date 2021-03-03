const restaurants = document.getElementById('restaurants');

//Phrases to show when no restaurants are hidden/shown in the popup
const randomPhrases = [
    "Guess you have a fairly wide palate.",
    "By the way, i'm in no way affiliated with Wolt.",
    "You can block them by right clicking and selecting the 'Hide this Restaurant' option."
]

//initializes list of restaurants
function initPopup(){
    restaurants.innerHTML="";
    chrome.storage.local.get('blocked', blockedNames=>{
        if(blockedNames.blocked.length == 0){
           const listEmpty = document.createElement('h2');
           const randomPhrase = randomPhrases[(Math.random() * ((randomPhrases.length-1) - 0 + 1) ) << 0]
           listEmpty.innerHTML = `No restauranats hidden at the moment. ${randomPhrase}`
           restaurants.appendChild(listEmpty);
        }
        blockedNames.blocked.forEach(blockedName=>{
            const title = document.createTextNode(blockedName);
            const restaurantRow = document.createElement("div");
            restaurantRow.className = "restaurant-row";

            const removeIcon = document.createElement('img');
            removeIcon.className = "remove-icon" 
            removeIcon.src = chrome.runtime.getURL("assets/remove-icon.svg");
            removeIcon.addEventListener('click', removeFromBlocked.bind(removeIcon, blockedName));
            
            restaurantRow.appendChild(title); 
            restaurantRow.appendChild(removeIcon); 

            restaurants.appendChild(restaurantRow)
        })
    }
);
}

//remove function
function removeFromBlocked(restaurant){
    chrome.storage.local.get('blocked', items=>{
        const index = items.blocked.indexOf(restaurant)
        // Remove one item at index 
        items.blocked.splice(index, 1);
        chrome.storage.local.set(items) 
        initPopup()
    });
}


initPopup()

