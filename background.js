let user_signed_in = false;


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message[0] === "login")
    {
        const obj = {
            email: request.message[1].email,
            password: request.message[1].password
        }
        var data = new FormData();
        data.append("json", JSON.stringify(obj));
          fetch('http://localhost:3001/api/Users/login',{
              method: 'POST',
              headers: {
                   'Accept': 'application/json, text/plain, */*',
                   'Content-Type': 'application/json'
              },
              mode: 'cors',

              body: JSON.stringify(obj)
          } ).then(res => {
              if(res.status !== 200)
              {
                  
                  sendResponse('fail');
              }
              console.log(res.body.key)
              sendResponse({message: 'success'});
          })
          .catch(err => {
              console.log(err);
              sendResponse('fail');
          })
       
          sendResponse({message: 'success'});
        
    }
    if(request.message === "forgot")
    {
        chrome.tabs.create({
            url: 'http://localhost:3000/forgotPassword',
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

