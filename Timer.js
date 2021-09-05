var links = document.getElementsByTagName("a");
var arr = [];
for (var i = 0; i < links.length; i++) {
  arr.push(links[i].href.split("/"));
}

var html = ``
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
const Imgsrc1 = chrome.extension.getURL("pause.png");
const Imgsrc2 = chrome.extension.getURL("play-button-arrowhead.png");
var timeStatus = "0:0:0";
var containerMovements = document.getElementById("sidebar"); 

   
   
    var Button = document.getElementById("Buttn");
    var Restart = document.getElementById("Restart");
    var Time = document.getElementById("Number");
    var count = 0;
    var Interval;
    const ImgsrcPause = chrome.extension.getURL("pause.png");
    const ImgsrcPlay = chrome.extension.getURL("play-button-arrowhead.png");
    
    var tArray = [00, 00, 00];
   
    //Login controls
    var LogGate, forgotGate, innocent;
    var loginStatus = localStorage.getItem('LOGIN')
    console.log("Login status",loginStatus)
  //   if (loginStatus) {
  //     console.log("hi")
  //     html = `<div class="roundbox sidebox" style="height: auto;
  //    width: auto;
    
  //   padding: 20px;
  
  //    background-color: azure;
  //    ">
  // <h1 id="pud">Time will go here</h1>
  //            <p><span>Handle: </span>${handle}</p>
  //            <br>
  //            <p>Type : ${problemType}</p>
  //            <br>
  //            <p>Number : ${problemNo}</p>
  //           <div class="Screen">
 
  //               <h1 id="Number">${timeStatus}</h1>
  //           </div>
  //           <div class="Controls">
                 
  //                  <img id="Buttn" src="${Imgsrc2}" alt="Chotusa imgae hu yaar">
                 
  //           </div>
  //           <button id="Restart" >Clear</button>
          
  
  // </div> `
  //   }
  //   else{
  //     html = ` <form  class = "login_page">
     
  //     <h1>Login please </h1>
          
     
     
  //     <div class = "row">
  //         <button id = "willLogin">Login</button>
  //         <p id = "forgotLogin">Forgot passowrd</p>
  //         <p id = "innocent">Already logged in to the FilterForces? </p>
  //     </div>
  // </form>
  // `
  //   }
   


    // if(LogGate)
    // {
    //   LogGate.addEventListener('click', () => {
    //     console.log("click")
    //     window.open("http://localhost:3000/login", '_blank').focus();
    //   })
    // }
    function LoadHTML()
    {
    html = `<div class="roundbox sidebox" style="height: auto;
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
                   
                     <img id="Buttn" src="${Imgsrc2}" alt="Chotusa imgae hu yaar">
                   
              </div>
              <button id="Restart" >Clear</button>
            
    
    </div> `
    
   
  
 if(Restart)
 {
   
  Restart.addEventListener("click", () => {
    console.log("clicked")
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
  LoadHTML();
    if(containerMovements)
    {
      containerMovements.insertAdjacentHTML("afterbegin", html);
    
    //   LogGate = document.getElementById("willLogin");
    //   forgotGate = document.getElementById("forgotLogin");
    //   innocent = document.getElementById("innocent");
    //   //If trying to login
    //   LogGate.addEventListener('click', (e) => {
    //      e.preventDefault()
    //      chrome.runtime.sendMessage({message: "login"},(response) => {
    //        if(response === true)
    //        {
    //          localStorage.setItem('sss', true);
    //        }
    //        console.log("data ", localStorage.getItem('sss'));
    //        localStorage.setItem('LOGIN', true);
    //     })

    //   })
    //   forgotGate.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     chrome.runtime.sendMessage({message: "forgot"},(response) => {

    //     })
       
    //   })
    //   innocent.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     html = `<div class="roundbox sidebox" style="height: auto;
    //     width: auto;
       
    //    padding: 20px;
     
    //     background-color: azure;
    //     ">
    //  <h1 id="pud">Time will go here</h1>
    //             <p><span>Handle: </span>${handle}</p>
    //             <br>
    //             <p>Type : ${problemType}</p>
    //             <br>
    //             <p>Number : ${problemNo}</p>
    //            <div class="Screen">
    
    //                <h1 id="Number">${timeStatus}</h1>
    //            </div>
    //            <div class="Controls">
                    
    //                   <img id="Buttn" src="${Imgsrc2}" alt="Chotusa imgae hu yaar">
                    
    //            </div>
    //            <button id="Restart" >Clear</button>
             
     
    //              </div> `
    //              localStorage.setItem('LOGIN', true);
    //             //containerMovements.insertAdjacentHTML("afterbegin", html);
            
    //   window.location.reload();
     
    //   })
      

    }