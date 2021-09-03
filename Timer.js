var links = document.getElementsByTagName("a");
var arr = [];
for (var i = 0; i < links.length; i++) {
  arr.push(links[i].href.split("/"));
}
localStorage.setItem('LOGIN', true)
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

LoadHTML();
if(containerMovements)
    {
      containerMovements.insertAdjacentHTML("afterbegin", html);
    }
function LoadHTML() {
  if (handle) {
    //Content to display
    


    //Check if logged
    var loginStatus = localStorage.getItem('LOGIN')
    
    if (loginStatus) {
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
            <button id = "Login"> Login </button>
  
  </div> `
    }
    else{
      html = `<div>
      <h1>Please Login</h1>
      <button id = "willLogin">Login</button>
  </div>`
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

