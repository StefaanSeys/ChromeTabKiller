
/**
 * Shows feedback to the user, telling him how many tabs were closed.
 * 
 * @param {*} nrTabs 
 */
function renderStatus(nrTabs) {
  document.getElementById('status').textContent = '# Closed ' + nrTabs + ' tabs';
}


/**
 * Will be called the moment the user clicks the extension icon, after the popup.html DOM has been loaded.
 * This will trigger the tab closing.
 */
document.addEventListener('DOMContentLoaded', function() {

    // Call killTabs defined in the background.js file.
    // Set the callback to inform the user.
    var BG = chrome.extension.getBackgroundPage();
    BG.killTabs(renderStatus);

});
