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

var teamOrNot = document.getElementById("teamCheck");
var allowMemberInput = false;
var teamInputs = [
  document.getElementById("member1"),
  document.getElementById("member2"),
  document.getElementById("member3"),
  document.getElementById("member4"),
  document.getElementById("member5")
];
var partNameInput = document.getElementById("teamName");

teamOrNot.addEventListener("change", e =>{
  if (allowMemberInput == true){
    allowMemberInput = false;
    for(let inp of teamInputs){
      inp.disabled = true;
      partNameInput.placeholder = "Individuals name";
    }
  }
  else{
    allowMemberInput = true;
    for(let inp of teamInputs){
      inp.disabled = false;
      inp.value = "";
      partNameInput.placeholder = "Team name";
    }
  }
});
