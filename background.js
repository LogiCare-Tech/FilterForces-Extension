//Remove Start time from local Storage as soon as POST request.
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
              credentials: 'include',
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
    if(request.message[0] === "Time")
    {
         const data = request.message[1];
   
       const getPset = async()=>{
          try{
            const apiReq = await  fetch('https://codeforces.com/api/problemset.problems', {
                method: 'GET'
               
            })
            const resPset = await apiReq.json();
            
            const allPset = resPset.result.problems;
      
            const infoRequired = allPset.filter((info) => Number(info.contestId) === Number(data.contestId) && (info.index === data.type))
        
            const response = await fetch('http://localhost:3001/api/Users/refresh_token', {
                method: 'POST',
                credentials: 'include',
                mode: 'cors'
            
            })
            const {access_token} = await response.json();
           const filterInfo= infoRequired[0];
           
            const obj = {
               
                topic: [...filterInfo.tags],
                rating: filterInfo.points,
                time: data.time
            }
            
            const redData = await fetch('http://localhost:3001/api/Visualize', {
                method: 'POST',
                headers: {
                    'Authorization': access_token,
                    'Accept': 'application/json, text/plain, */*',
                   'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(obj)
            })
            const d = await redData.json();
            
          }catch(Err){ console.log(Err)}
       }
       getPset();
        
        
    
        sendResponse({message: "ghanta"})
    }
    if(request.message === "Logout")
    {
       
         
          const LogingOut = async() => {
            try{
                const response = await fetch('http://localhost:3001/api/Users/logout', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                });
                const finalRes = await response.json();
                  sendResponse(finalRes.msg);
            }
            catch(err) {
                console.log(err);
                sendResponse("Failed");
            }
          }
          LogingOut();
         
       
    }
})

