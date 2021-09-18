//Remove Start time from local Storage as soon as POST request.

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
        console.log(inSeconds)
        const getPersonalPset = async () => {
            try {
                const data = await fetch(`https://codeforces.com/api/user.status?handle=${PAYLOAD.handle}`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                })
                let convertedData = await data.json();
                console.log(convertedData.result)
                let PostQn = convertedData.result.filter((info) => {
                    return (
                        info.problem.index === PAYLOAD.type &&
                        PAYLOAD.startTime <= info.creationTimeSeconds &&
                        info.verdict === "OK")
                })
                if (PostQn.length === 0) {
                    sendResponse("Please wait for the verdict");
                }

                try {
                    const response = await fetch('https://filterforces.herokuapp.com/api/Users/refresh_token', {
                        method: 'POST',
                        credentials: 'include',
                        mode: 'cors'

                    })
                    const { access_token } = await response.json();
                    const filterInfo = PostQn[0];

                    const obj = {

                        topic: [...filterInfo.problem.tags],
                        rating: filterInfo.problem.points,
                        time: String(inSeconds),
                        type: PAYLOAD.type,
                        handle: PAYLOAD.handle
                    }

                    try {
                        const redData = await fetch('https://filterforces.herokuapp.com/api/Visualize', {
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

                        console.log(redData.status)

                        sendResponse(redData.status);
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
        getPersonalPset();


        return true;
    }
})

