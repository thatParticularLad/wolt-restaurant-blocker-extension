var contextMenuItem = {
    "id": "blockRestaurant",
    "title": "Hide this restaurant",
    "contexts": ["link"]
}

chrome.contextMenus.create(contextMenuItem);


chrome.contextMenus.onClicked.addListener(function(info){
    //patikrina ar linkas, kuri pridesim i db restorano
        if(info.linkUrl.includes('restaurant')){
            const restaurantName = info.linkUrl.substr(info.linkUrl.lastIndexOf('/') + 1);
            blockRestaurant(restaurantName)
            // chrome.storage.local.get('blocked', function(restaurants){
            //     alert(restaurants.blocked)
            // });
        }
})

function blockRestaurant(name){
    chrome.storage.local.get('blocked', function(restaurants) {
        chrome.storage.local.set({'blocked': [...restaurants.blocked, name]}, function(result){
            
        });
    });
}

