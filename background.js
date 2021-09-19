chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message[0] === "login") {

        const LOGIN = async () => {
            try {
                const obj = {
                    email: request.message[1].email,
                    password: request.message[1].password
                }
                var data = new FormData();

                data.append("json", JSON.stringify(obj));
                let response = await fetch('https://filterforces.herokuapp.com/api/Users/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify(obj)
                })
                response = await response.json();

                //localStorage.setItem("MESSAGE", response);
                sendResponse(response.msg);
            } catch (err) {
                sendResponse(err)
            }
        }

        LOGIN();


        return true;



    }

    if (request.message === "Logout") {


        const LogingOut = async () => {
            try {
                const response = await fetch('https://filterforces.herokuapp.com/api/Users/logout', {
                    method: 'GET'
                });

                sendResponse(response.status);

            }
            catch (err) {

                sendResponse(err);
            }
        }
        LogingOut();
        return true;

    }
    if (request.message[0] === "FetchPset") {

        const PAYLOAD = request.message[1];
        let time = PAYLOAD.time.split(',')
        let inSeconds = (Number(time[0]) * 60 * 60) + ((Number(time[1]) * 60) + (Number(time[2])))
        var ProblemsInfo
        const AllPset = async() => {
            try{
                ProblemsInfo = await fetch('https://codeforces.com/api/problemset.problems',{
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                })
                ProblemsInfo = await ProblemsInfo.json()
                ProblemsInfo = ProblemsInfo.result.problems 
                console.log("Rani ",ProblemsInfo)
                getPersonalPset();
            }
            catch(Err)
            {
             
                sendResponse("Codeforces API is not working...")
            }
            
        }
        AllPset()
     
        
        async function getPersonalPset() {
            try {

                //If API is not responding
                if(!ProblemsInfo)
                {
                   sendResponse("Codeforces api is not functioning...")
                }


                //Get the personal submission list
                const data = await fetch(`https://codeforces.com/api/user.status?handle=${PAYLOAD.handle}`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                })
                let personalSubmission = await data.json();
               

                //Check if the problem is ready to post or not
                let readyToPost = personalSubmission.result.filter((info) => {
                    return (
                        info.problem.index === PAYLOAD.type &&
                        Number(info.problem.contestId) === Number(PAYLOAD.contestId) && 
                        PAYLOAD.startTime <= info.creationTimeSeconds &&
                        info.verdict === "OK")
                })
                if (readyToPost.length === 0) {
                    sendResponse("Submit only when your solution is Accepted");
                }

                try {


                    const getAccessToken = await fetch('https://filterforces.herokuapp.com/api/Users/refresh_token', {
                        method: 'POST',
                        credentials: 'include',
                        mode: 'cors'

                    })
                    const { access_token } = await getAccessToken.json();

                   //@filterInfo => Qustion info from user's submission list
                   const filterInfo = readyToPost[0];
                  
                   //Collecting the rating separately because they haven't provided that in personal submission data api
                    let RatingInfo = ProblemsInfo.filter((info) => Number(info.contestId) === Number(PAYLOAD.contestId) && info.index === PAYLOAD.type)
                    RatingInfo = RatingInfo[0]
                
                   
                    let obj = {

                        topic: [...filterInfo.problem.tags],
                     
                        time: String(inSeconds),
                        type: PAYLOAD.type,
                        handle: PAYLOAD.handle
                    }
                    if(RatingInfo.rating)
                    {
                        obj["rating"] = Number(RatingInfo.rating)
                    }
                    
                    try {
                        const savedData = await fetch('https://filterforces.herokuapp.com/api/Visualize', {
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

                        

                        sendResponse(savedData.status);
                    } catch (err) {

                        sendResponse(err.message);

                    }

                }
                catch (err) {

                    sendResponse(err.message);
                }

            } catch (err) {

                sendResponse(err.message);
            }

        }
      


        return true;
    }
})

