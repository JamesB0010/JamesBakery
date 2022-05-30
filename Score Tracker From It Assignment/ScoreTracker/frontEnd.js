var navVis = true;
var navArr = [];
navArr.push(document.getElementById("newEvt"));
navArr.push(document.getElementById("home"));
navArr.push(document.getElementById("AddPart"));
navArr.push(document.getElementById("podLink"));
var toggleNav = document.getElementById("navToggle");
toggleNav.addEventListener("click", () =>{
  navVis? navVis = false: navVis = true;
  if (navVis){
    for (let i = 0; i < navArr.length; i++){
      navArr[i].classList.add("fadingEffect")
    }
  }
  else {
    for (let i = 0; i < navArr.length; i++){
      navArr[i].classList.remove("fadingEffect")
    }
  }
})
