function swap(arr, x, y){
  let temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
};

var navVis = true;
var navArr = [];
navArr.push(document.getElementById("newEvt"));
navArr.push(document.getElementById("home"));
navArr.push(document.getElementById("AddPart"));
navArr.push(document.getElementById("scoreTrack"));
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

var participants = JSON.parse(localStorage.getItem("participants"));
var sortParticipants = [];
for (participant in participants){
  console.log()
  sortParticipants.push({name: participants[participant].name, score:participants[participant].score});
}
let length = sortParticipants.length;
for (i = 0; i < length - 1; i++){
  for(j = 0; j < length-i-1; j++){
    if (sortParticipants[j].score < sortParticipants[j+1].score){
      swap(sortParticipants, j, j+1);
    }
  }
}
document.getElementById("first").innerText = sortParticipants[0].name
document.getElementById("second").innerText = sortParticipants[1].name
document.getElementById("third").innerText = sortParticipants[2].name
