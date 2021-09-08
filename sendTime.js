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
    let Parent = SecondLevelMenu[1];
    let ChildrenCnt = Parent.children.length;

    Parent.children[ChildrenCnt - 1].insertAdjacentHTML("afterEnd", html);
    let Add = document.getElementById("SignAdd");
    let Cancel = document.getElementById("SignCancel");
    if (Add) {
      Add.addEventListener("click", () => {
        console.log("Clicked")
        let Payload = {
          contestId: localStorage.getItem("PROBLEM_NO"),
          type: localStorage.getItem("PROBLEM_TYPE"),
          time: localStorage.getItem(localStorage.getItem("PROBLEM_NO") + localStorage.getItem("PROBLEM_TYPE")),
          handle: localStorage.getItem("HANDLE"),
          startTime: localStorage.getItem(localStorage.getItem("PROBLEM_NO") + localStorage.getItem("PROBLEM_TYPE") + "StartTime")
        }


        chrome.runtime.sendMessage({ message: ["FetchPset", Payload] }, (response) => {
          if (response === "success") {
            localStorage.removeItem("CURRENT_ACTIVE_PROBLEM");
            window.location.reload();
          }
        })



      })

    }
    if(Cancel){
      Cancel.addEventListener("click", () => {
        localStorage.removeItem("CURRENT_ACTIVE_PROBLEM");
        localStorage.removeItem(localStorage.getItem(localStorage.getItem("PROBLEM_NO") + localStorage.getItem("PROBLEM_TYPE")))
        localStorage.removeItem(localStorage.getItem(localStorage.getItem("PROBLEM_NO") + localStorage.getItem("PROBLEM_TYPE")) + "StartTime");
         window.location.reload();
      })
    }
  }


}





























// const tableRows = document.getElementsByTagName('tr');
// let parent = 0;
// for(let d of tableRows)
// {
//    let first = 0, second = 0;
//     let cells = d.cells;
//     if(cells.length > 4)
//     {
//         let HandleCellTD = cells[2];
//         let TDClass = HandleCellTD.getAttribute('class');
//         TDClass = TDClass.split(' ');
//         if((TDClass.length === 2 && TDClass[0] === "status-party-cell" && TDClass[1] === "dark") ||    
//             (TDClass.length === 1 && TDClass === "status-party-cell"))
//         {
//             let c = HandleCellTD.getElementsByTagName("a");

//             if(c[0].innerText === localStorage.getItem("HANDLE"))
//             {
//                 first = 1;
//             }
//         }

//            if(first === 1)
//            {
//             let ProblemCellTD = cells[3];

//             let TDClassP = ProblemCellTD.getAttribute('class');

//             TDClassP = TDClassP.split(' ');
//             if(TDClassP[0] === "status-small")
//             {
//                 let ID = ProblemCellTD.getElementsByTagName("a")[0].innerText.split(" ")
//                 console.log(ID[0])
//                 //time
//                 if(localStorage.getItem(ID[0]))
//                 {

//                    second = 1;  
//                 }
//             }
//            }

//         if(second === 1)
//         {

//         }
//        // console.log(HandleCellTD)
//          parent++;
//     }

// }


























