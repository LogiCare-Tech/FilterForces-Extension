var links = document.getElementsByTagName("a");
var arr = [];
for (var i = 0; i < links.length; i++) {
  arr.push(links[i].href.split("/"));
}
// function storeUserPrefs() {
//   var key = "myKey",
//       testPrefs = "va:100"
//   var jsonfile = {};
//   jsonfile[key] = testPrefs;
//   chrome.storage.sync.set(jsonfile, function () {
//       console.log('Saved', key, testPrefs);
//   });

// }
// storeUserPrefs();
// chrome.storage.sync.get("myKey", (obj) => {
//   console.log(obj)
// })
var handle;
var problemNo;
var problemType;
for (var i = 0; i < arr.length; i++) {
  if (arr[i][2] === "codeforces.com" && arr[i][3] === "profile") {
    handle = arr[i][4];
    console.log(handle);
  }
  if (arr[i][4] === "problem") {
    if (arr[i][5]) {
      problemNo = arr[i][5];
      problemType = arr[i][6][0];
    }
  }
}
//  const Imgsrc1 = chrome.extension.getURL("pause.png");
//  const Imgsrc2 = chrome.extension.getURL("play-button-arrowhead.png");
const Imgsrc1 = "";
const Imgsrc2 = "";
var timeStatus = "0 : 0 : 0";
var html = ``;
LoadHTML();

function LoadHTML() {
  console.log("loaded")
  if (handle) {
    
    var loginState = localStorage.getItem('LOGIN');
   
    
    if(loginState === "LoginSuccess")
    {
      
      html = `
              <div class="roundbox sidebox" style="height: auto;
              width: auto;
             
             padding: 20px;
           
              background-color: azure;
              ">
           <h1 id="pud">Time will go here</h1>
                      <p><span>Handle: </span>${handle}</p>
                      <br>
                      <p>Type : ${problemType}</p>
                      <br>
                      <p>Number : ${problemNo}</p>
                     <div class="Screen">
       
                         <h1 id="Number">${timeStatus}</h1>
                     </div>
                     <div class="Controls">
                          
                           
                          
                     </div>
                     <button id="Restart" >Clear</button>
                     <button id = "sendTime"> Save</button>
           
           </div> 
              
              `;
    }
    else if(loginState === null){
    
              html = `   <div class = "login_page">
              <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                      type="text"
                      placeholder="Enter email address"
                      class="email"
                     
                      name="email"
                       />
              </div>
              <div>
                  <label htmlFor="password">Password</label>
                  <input
                      type="password"
                      placeholder="Enter your password"
                      class="password"
                     
                      name="password"
                     />
              </div>
              <div class = "row">
                  <button id = "formLogin">Login</button>
                  <p id = "formForgot">Forgot passowrd</p>
              </div>
          </div>
          <p id = "formRegister">New to here? Register</p>
      </div>`
    }
    else if(loginState === "formForgot")
    {
      html = `
      <div class = "login_page">
      <div>
          <label htmlFor="email">Email Address</label>
          <input
              type="text"
              placeholder="Enter email address"
              class="email"
              
              name="email"
              />
      </div>
     
      <div class= "row">
          <button id = "formForgotAction">Submit</button>
         
      </div>
  </div>`
    }
    else if(loginState === "formRegister")
    {
      html = `
      <div class="login_page">
      <h2>Register</h2>
     
      <div>
      <div>
              <label htmlFor="name">Name</label>
              <input
                  type="text"
                  placeholder="Enter your name"
                  id="name"
                
                  name="name"
                 />
          </div>
          <div>
              <label htmlFor="email">Email Address</label>
              <input
                  type="text"
                  placeholder="Enter email address"
                  id="email"
                 
                  name="email"
                  />
          </div>
          <div>
              <label htmlFor="password">Password</label>
              <input
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                 
                  name="password"
                  />
          </div>
          <div>
              <label htmlFor="cf_assword">Confirm Password</label>
              <input
                  type="password"
                  placeholder="Confirm your password"
                  id="cf_password"
                 
                  name="cf_password"
                 />
          </div>
          <div class = "row">
              <button id = "formRegisterAction">Register</button>
            
          </div>
      </div>
 
  </div>
      `
    }
    
   
    var containerMovements = document.getElementById("sidebar");
    containerMovements.insertAdjacentHTML("afterbegin", html);

    //Main section
    var Button = document.getElementById("Buttn");
    var Restart = document.getElementById("Restart");
    var Time = document.getElementById("Number");
    var count = 0;
    var Interval;
    //const ImgsrcPause = chrome.extension.getURL("pause.png");
   // const ImgsrcPlay = chrome.extension.getURL("play-button-arrowhead.png");
      const ImgsrcPause = "";
      const ImgsrcPlay = "";
    //Login section
    var formLogin = document.getElementById("formLogin");
    var formForgot = document.getElementById("formForgot");
    var formRegister = document.getElementById("formRegister");
    var email = document.querySelector('.email');
    var password = document.querySelector('.password');

    var sendTime = document.getElementById('sendTime');
    //Forgot section in action
    var forgotAction = document.getElementById("formForgotAction");
    //Register section in action
    var registerAction = document.getElementById("formRegisterAction");
  
    
    if(formLogin)
    {
      formLogin.addEventListener("click", () => {
       
        var payload = {
          email: email.value,
          password: password.value
        }
        console.log(payload);
        chrome.runtime.sendMessage({message: ["login", payload]}, (response) => {
          if(response.message === 'success')
          {
            localStorage.setItem('LOGIN',"LoginSuccess");
            window.location.reload();
          }
         // console.log("From the timer ",response.message)
        })
        // window.location.reload();
      })
    }
    if(formForgot)
    {
      formForgot.addEventListener('click', () => {
        localStorage.setItem('LOGIN', "formForgot");
        window.location.reload();
      })
    }
    if(forgotAction)
    {
      forgotAction.addEventListener('click', () => {
        let payload = {email: email.value}
        console.log(payload);
        
        localStorage.removeItem('LOGIN')
        window.location.reload();
      })
    }

    //Register section
    if(formRegister)
    {
      formRegister.addEventListener('click', () => {
        localStorage.setItem('LOGIN', "formRegister");
        window.location.reload();
      })
    }
   

    
    var tArray = [00, 00, 00];
    if(sendTime)
    {
      sendTime.addEventListener('click', () => {
        console.log("hi");
          chrome.runtime.sendMessage({message:["Time",tArray]}, (response) => {
            console.log(response.message);
          })
      })
    }
if(Restart)
{
  Restart.addEventListener("click", () => {
    clearInterval(Interval);
    tArray = [00, 00, 00];
    Time.innerText = tArray[0] + " : " + tArray[1] + " : " + tArray[2];
    Button.src = ImgsrcPlay;
  });
}
    

   if(Button)
   {
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
      //    count++;

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
    }
  }
}
