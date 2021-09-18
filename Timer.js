
localStorage.setItem("PROBLEM", document.getElementsByClassName("title")[0].innerText);

var links = document.getElementsByTagName("a");
var arr = [];

for (var i = 0; i < links.length; i++) {
  arr.push(links[i].href.split("/"));

}


var handle;
var problemNo;
var problemType;

for (var i = 0; i < arr.length; i++) {
  if (arr[i][2] === "codeforces.com" && arr[i][3] === "profile") {
    handle = arr[i][4];
    localStorage.setItem("HANDLE", handle);
  }
  if (arr[i][4] === "problem") {
     
    if (arr[i][5]) {
      problemNo = arr[i][5];
      let temp = "";
      for(let data of arr[i][6])
      {
        if(data !== "?")
        {
          temp += data;
        }else{
          break;
        }
      }
      problemType = temp;
      localStorage.setItem("PROBLEM_NO", problemNo);
      localStorage.setItem("PROBLEM_TYPE", problemType);
    }
  }
}
 const Imgsrc1 = chrome.runtime.getURL("/Assets/pause.png");
 const Imgsrc2 = chrome.runtime.getURL("/Assets/play-button-arrowhead.png");

var timeStatus = "0 : 0 : 0";
if(localStorage.getItem(problemNo + problemType))
{
 let time = localStorage.getItem(problemNo + problemType).split(',');
 let temp = "";
 temp += time[0];
 temp += " : ";
 temp += time[1];
 temp += " : ";
 temp += time[2];
 timeStatus = temp;
  
}
var html = ``;
LoadHTML();

function LoadHTML() {
 
  if (handle) {

    var loginState = localStorage.getItem('LOGIN');


    if (loginState === "LoginSuccess") {

      html = `
              <div class="roundbox sidebox" style="height: auto;
              width: auto;
             
             padding: 20px;
           
             
              color: "black";
              ">
              <h2 id = "pud"><img class = "SVG" src = "https://lh3.googleusercontent.com/whWdCHvpK52qWkxadxxRiATHijar8KkJZCHtmwa3KeLyzf1hT3jqIGKE5FTJvvrmWWxneg1CGQ7VuQ624HKy=s72-rwa" alt = "SVG"/> Filter <span class = "HalfLogo"> Forces</span></h2>
           <br>
                      <h5><span>Handle: </span>${handle}</h5>
                      <br>
                      <h5>Type : ${problemType}</h5>
                      <br>
                      <h5>Number : ${problemNo}</h5>
                      <br>
                     <div class="Screen">
       
                         <h1 id="Number">${timeStatus}</h1>
                     </div>
                     <div class="Controls">
                          
                     <img id="Buttn" src="${Imgsrc2}" alt="Chotusa imgae hu yaar">
                          
                     </div>
                     <div class = "Mainrow">
                     <button id="Restart" >Clear</button>
                    
                     <button id = "Logout">Logout </button>
                     </div>
           
           </div> 
              
              `;
    }
    else if (loginState === null) {

      html = `   <div class="roundbox sidebox login_page" style="height: auto;
      width: auto;
     
     padding: 20px;
   
     
      color: "black";
      ">
     
              <div>
              <h2 class = "cat"><img class = "SVG" src = "https://lh3.googleusercontent.com/whWdCHvpK52qWkxadxxRiATHijar8KkJZCHtmwa3KeLyzf1hT3jqIGKE5FTJvvrmWWxneg1CGQ7VuQ624HKy=s72-rwa" alt = "SVG"/> Filter <span class = "HalfLogo"> Forces</span></h2>
                  <label htmlFor="email">Email Address</label>
                  <input
                      type="text"
                      placeholder="Enter email address"
                      class="email"
                     
                      
                       />
              </div>
              <div>
                  <label htmlFor="password">Password</label>
                  <input
                      type="password"
                      placeholder="Enter your password"
                      class="password"
                     
                      
                     />
              </div>
              <button id = "formLogin">Login</button>
              <div class = "row">
                  
                  <p id = "formForgot"><a href = "https://filterforces.herokuapp.com/forgotPassword" target = "_blank" rel="noopener noreferrer">Forgot passowrd</a></p>
                  <p>New to here ? <a href = "https://filterforces.herokuapp.com/register" target = "_blank" rel="noopener noreferrer">Register</a></p>
              </div>
          </div>
       
      </div>`
    }
    


    
    var containerMovements = document.getElementById("sidebar");
    containerMovements.insertAdjacentHTML("afterbegin", html);

    //Main section
    var Button = document.getElementById("Buttn");
    var Restart = document.getElementById("Restart");
    var Time = document.getElementById("Number");
   
    var Interval;
    const ImgsrcPause = chrome.runtime.getURL("/Assets/pause.png");
    const ImgsrcPlay = chrome.runtime.getURL("/Assets/play-button-arrowhead.png");
    
    //Login section
    var formLogin = document.getElementById("formLogin");
    
    var email = document.querySelector('.email');
    var password = document.querySelector('.password');

   
 

    //Logout
    var logoutAction = document.getElementById("Logout");
    
    if (logoutAction) {
      logoutAction.addEventListener('click', () => {
        chrome.runtime.sendMessage({ message: "Logout"}, (response) => {
          console.log(response)
          if (response == 200) {
            localStorage.removeItem('LOGIN');
            localStorage.removeItem("HANDLE");
            localStorage.removeItem("PROBLEM");
            localStorage.removeItem("PROBLEM_TYPE");
            window.location.reload();
          }
          else{
            alert(response);
          }
        })
      })
    }

    if (formLogin) {
      formLogin.addEventListener("click", () => {

        var payload = {
          email: email.value,
          password: password.value
        }
       
        chrome.runtime.sendMessage({ message: ["login", payload] }, (response) => {
       
          if (response === "Login successful") {
            localStorage.setItem('LOGIN', "LoginSuccess");
            window.location.reload();
          }
          else{
            alert(response);
           
          }
         
        })
       
      })
    }
    


    //Timer Working Logic
    var tArray = [00, 00, 00];
   
    if(localStorage.getItem(problemNo + problemType))
    {
      let time = localStorage.getItem(problemNo + problemType).split(',');
      tArray = time;
      
    }
  
    
    if (Restart) {
      Restart.addEventListener("click", () => {
        clearInterval(Interval);
        tArray = [00, 00, 00];
        Time.innerText = tArray[0] + " : " + tArray[1] + " : " + tArray[2];
        localStorage.removeItem(problemNo + problemType);
        localStorage.removeItem(problemNo + problemType + "StartTime");
        localStorage.removeItem("CURRENT_ACTIVE_PROBLEM");
        Button.src = ImgsrcPlay;
      });
    }


    if (Button) {
      Button.addEventListener("click", function changeImage() {
        if (Button.src === ImgsrcPlay) {
          Button.src = ImgsrcPause;

          Interval = setInterval(Increment, 1000);
        } else {
          Button.src = ImgsrcPlay;
          clearInterval(Interval);
        }
      });
    }
    function Increment() {


      tArray[2]++;
      if (tArray[2] === 60) {
        tArray[2] = 0;
        tArray[1]++;
        if (tArray[1] === 60) {
          tArray[1] = 0;
          tArray[0]++;
        }
      }
      Time.innerText = tArray[0] + " : " + tArray[1] + " : " + tArray[2];
      if(!localStorage.getItem(problemNo + problemType + "StartTime"))
      {
        const dateToday = new Date()
        const timestamp = epoch(dateToday)
        
        localStorage.setItem(problemNo + problemType + "StartTime",timestamp / 1000); 
      }
      localStorage.setItem(problemNo + problemType, tArray);
      localStorage.setItem("CURRENT_ACTIVE_PROBLEM", localStorage.getItem("PROBLEM"));
      
     
    }
  }
}
function epoch (date) {
  return Date.parse(date)
}


