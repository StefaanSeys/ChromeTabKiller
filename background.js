var patterns = [
        "https://www.google.be/search?q=*",
        "https://www.google.be/search?url=*",
        ];

/**
 * Call the provided callback function the list of tabs that match one of the patterns OR are a "New Tab".
 */
function getTabs(callback) {
    var theList = [];

    var queryUrl = { pinned: false, url: patterns };
    var queryTitle = { pinned: false, title: "New Tab" };
    
    chrome.tabs.query(queryUrl, function(tabs) {
        tabs.forEach(function(tab) {
            theList.push(tab);            
        });
        chrome.tabs.query(queryTitle, function(tabs) {
            tabs.forEach(function(tab) {
                theList.push(tab);            
            });                 
            callback(theList);
        });        
    });
}

/**
 * Update the badge on the icon of the extension
 */
function updateCounter() {

    getTabs(function(tabs) {
        chrome.browserAction.setBadgeText({text: "" + tabs.length});                
    });
    
}


/**
 * Close the tabs that match the pattern.
 */
function killTabs(callback) {

    getTabs(function(tabs) {
        ids = []
        tabs.forEach(function(tab) {
            ids.push(tab.id);
        });
        chrome.tabs.remove(ids);
        callback(tabs.length);  
    });

}


/* Register the listeners for tab actions to keep the badge up to date */
chrome.tabs.onUpdated.addListener(updateCounter);
chrome.tabs.onCreated.addListener(updateCounter);
chrome.tabs.onRemoved.addListener(updateCounter);
chrome.tabs.onReplaced.addListener(updateCounter);

/* Call the badge counter update once manually */
updateCounter();