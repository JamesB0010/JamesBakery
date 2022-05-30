console.log(localStorage);
var scoreBoard = document.getElementById("scoreList");
var participants = JSON.parse(localStorage.getItem("participants"));
var selectedEvent;
let children = scoreBoard.children;
for (let child of children){
  let index = 0;
  for (child of children){
    child.innerText = scoreParticipants[index].name + "| " + participants[scoreParticipants[index].name.slice(0,-1)].score;
    index ++;
  }
}
for (let participant in participants){
  let node = document.createElement("li");
  node.appendChild(document.createTextNode(participant + " | " + participants[participant].score));
  node.setAttribute("backendName", participant);
  scoreBoard.appendChild(node);
}
renderScoreBoard();

var submitParts = document.getElementById("subSortList");
submitParts.addEventListener("click", function(){
  let partDiv = document.getElementsByClassName("participantsShow");
  if (partDiv.length == 0){
    return;
  }
  let partDivList = partDiv[0].children;
  let cool = partDivList.length;
  for (let item of partDivList){
    participants[item.innerText].score += cool;
    cool -= 1;
  }
  renderScoreBoard();
  selectedEvent = document.getElementsByClassName("selectedEvent")[0];
  events[selectedEvent.getAttribute("backendname")].expanded = false;
  selectedEvent.classList.add("participantsHide");
  partDiv[0].classList.remove("participantsShow");
  localStorage.setItem("participants", JSON.stringify(participants));
  localStorage.setItem("events", JSON.stringify(events));
  console.log(localStorage);
});

function swap(arr, x, y){
  let temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
};

function bubbleSortDesc(arr){
  let length = arr.length;
  for (i = 0; i < length - 1; i++){
    for(j = 0; j < length-i-1; j++){
      if (arr[j].score < arr[j+1].score){
        swap(arr, j, j+1);
      }
    }
  }
}

function renderScoreBoard(){
  let parent = document.getElementById("scoreList");
  let children = parent.children;
  let scoreParticipants = [];
  for (let child of children){
    let text = child.innerText;
    text = text.split("");
    text = Array.from(text);
    let iterate = true;
    let name = "";
    for (let char of text){
      if (iterate){
        name = name + char;
      }
      if (char == " "){
        iterate = false;
      }
    }
    scoreParticipants.push({
      name: name,
      score: participants[name.slice(0,-1)].score
    });
    }
    bubbleSortDesc(scoreParticipants);
    let index = 0;
    for (child of children){
      child.innerText = scoreParticipants[index].name + "| " + participants[scoreParticipants[index].name.slice(0,-1)].score;
      index ++;
    }
  }
