// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function killTabs(patterns) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    pinned: false,
    url: patterns
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.

    ids = []
    tabs.forEach(function(tab) {
        ids.push(tab.id);
    });
    chrome.tabs.remove(ids);
    renderStatus('# Closed ' + ids.length + ' tabs');
  });

}


function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {

    patterns = [
        "https://www.google.be/search?q=*",
        "https://www.google.be/search?url=*",
        ];
    killTabs(patterns);

});
