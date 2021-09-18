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
}
let SecondLevelMenu = document.getElementsByClassName("second-level-menu-list");



let ACTIVE = localStorage.getItem("CURRENT_ACTIVE_PROBLEM");
INSERT()
function INSERT() {
  if (ACTIVE) {
    let html = `
      <span class = "ContainerTimer">
    
        ${ACTIVE} <span id = "SignAdd">➕</span>  <span  id = "SignCancel">❌</span>
        
      </span>
    
      `

    let Parent = SecondLevelMenu[0];
    let ChildrenCnt = Parent.children.length;

    Parent.children[ChildrenCnt - 1].insertAdjacentHTML("afterEnd", html);
    let Add = document.getElementById("SignAdd");
    let Cancel = document.getElementById("SignCancel");
    if (Add) {
      Add.addEventListener("click", () => {

        let Payload = {
          contestId: localStorage.getItem("PROBLEM_NO"),
          type: localStorage.getItem("PROBLEM_TYPE"),
          time: localStorage.getItem(localStorage.getItem("PROBLEM_NO") + localStorage.getItem("PROBLEM_TYPE")),
          handle: handle,
          startTime: localStorage.getItem(localStorage.getItem("PROBLEM_NO") + localStorage.getItem("PROBLEM_TYPE") + "StartTime")
        }


        chrome.runtime.sendMessage({ message: ["FetchPset", Payload] }, (response) => {

          console.log(response)
          if (response == 201) {
            console.log("hi");
            alert("Successfull");
            localStorage.removeItem("CURRENT_ACTIVE_PROBLEM");
            let firstKey = localStorage.getItem("PROBLEM_NO");
            let secondKey = localStorage.getItem("PROBLEM_TYPE");
            localStorage.removeItem(firstKey + secondKey);
            localStorage.removeItem(firstKey + secondKey + "StartTime");

            window.location.reload();
          }
          else if (response == 401) {
            alert("Please post using the handle which you gave while registering to the FilterForces");
            alert("When you logout, the time recorder for solving this question will be deleted.. Please start from the beginning");

            window.location.reload();

          }
          else {
            alert(response);

            window.location.reload();
          }
        })



      })

    }
    if (Cancel) {
      Cancel.addEventListener("click", () => {
        alert(`Deleted the information about ${localStorage.getItem("CURRENT_ACTIVE_PROBLEM")}`)
        localStorage.removeItem("CURRENT_ACTIVE_PROBLEM");
        let firstKey = localStorage.getItem("PROBLEM_NO");
        let secondKey = localStorage.getItem("PROBLEM_TYPE");
        localStorage.removeItem(firstKey + secondKey);
        localStorage.removeItem(firstKey + secondKey + "StartTime");

        window.location.reload();
      })
    }
  }


}















































