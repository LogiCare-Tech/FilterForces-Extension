chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "Login")
    {
        sendResponse("Success")
    }
    if(request.message === "forgot")
    {
        chrome.tabs.create({
            url: 'http://localhost:3000/login',
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
                // incognito, top, left, ...
            });
        });
    }
})
