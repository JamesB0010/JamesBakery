//**********Event setup and storage *****************//
var evtList = document.getElementById("evtList");
//create an array which will store the events
if (localStorage.events == null){
  var events = {};
}
else{
  var events = JSON.parse(localStorage.getItem("events"));
  for (newEvt in events){
    events[newEvt].nodeShowHide = function(){
      if (this.expanded == false){
        console.log(this);
        this.dom.classList.remove("dropDownHide");
        this.dom.classList.add("dropDownShow");
        this.expanded = true;
      }
      else{
        this.dom.classList.remove("dropDownShow");
        this.dom.classList.add("dropDownHide");
        this.expanded = false;
      }
    }
    let node = document.createElement("li");
    node.classList.add("evtListItems");
    node.appendChild(document.createTextNode(events[newEvt].name));
    node.setAttribute("backendName", events[newEvt].name);
    node.addEventListener("click", events[newEvt].nodeShowHide.bind(events[newEvt]));
    node.addEventListener("dragenter", function(event){
      event.preventDefault()
    });
    node.addEventListener("dragover", function(event){
      event.preventDefault()
      event.target.style.backgroundColor = "#4c548c";
    });
    node.addEventListener("drop", function(event){
      if(events[node.getAttribute("backendname")].eventType == "Team"){
        if (participants[event.dataTransfer.getData("text")].members.length != 5){
          event.target.style.backgroundColor = "";
          alert("Whoopsie! \nYou can not assign individual competetors to a team event");
          return;
        }
      }
      else{
        if (participants[event.dataTransfer.getData("text")].members.length == 5){
          event.target.style.backgroundColor = "";
          alert("Whoopsie! \nYou can not assign teams to an event for individuals")
          return;
        }
      }
      event.target.style.backgroundColor = "";
      events[node.getAttribute("backendname")].participants.push(event.dataTransfer.getData("text"));
      JSON.stringify(events[node.getAttribute("backendname")].participants);
      localStorage.setItem("events", JSON.stringify(events));
      console.log(window);
    })
    node.addEventListener("dragleave", function(event){
      event.target.style.backgroundColor = "";
    })
    let dropDown = document.createElement("div");
    dropDown.classList.add("dropDownHide");
    for (let i = 0; i < events[newEvt].participants.length; i++){
      let tag = document.createElement("p");
      tag.classList.add("eventLiStyle");
      let text = document.createTextNode(events[newEvt].participants[i]);
      tag.appendChild(text);
      tag.style.marginTop = 0;
      dropDown.appendChild(tag);
    }
    node.appendChild(dropDown);
    events[newEvt].dom = dropDown;

    evtList.appendChild(node);
    console.log()
    if (events[newEvt].expanded == false){
      node.classList.add("completed");
    }
  }
}

var subEvent = document.getElementById("addEvt");
var evtName = document.getElementById("evtName");
var teamOrInd = document.getElementById("teamOrInd");
var skillReq = document.getElementById("skillReq");
subEvent.addEventListener("click", () =>{
  let newEvt = {
    name: evtName.value,
    eventType: teamOrInd.value,
    skillReq: skillReq.value,
    participants: [],
    expanded: false,
    nodeShowHide: function(){
      if(this.expanded == false){
        this.dom.classList.remove("dropDownHide");
        this.dom.classList.add("dropDownShow");
        this.expanded = true;
      }
      else{
        this.dom.classList.remove("dropDownShow");
        this.dom.classList.add("dropDownHide");
        this.expanded = false;
      }
    }
  }
  evtName.value = "";
  events[newEvt.name] = newEvt;

  let node = document.createElement("li");
  node.classList.add("evtListItems");
  node.appendChild(document.createTextNode(newEvt.name));
  node.setAttribute("backendName", newEvt.name);
  let dropDown = document.createElement("div");
  dropDown.classList.add("dropDownHide");
  for (let i = 0; newEvt.participants.length; i++){
    let tag = document.createElement("p");
    tag.classList.add("eventLiStyle");
    console.log(tag);
    let text = document.createTextNode(newEvt.participants[i]);
    tag.appendChild(text);
    tag.style.marginTop = 0;
    dropDown.appendChild(tag);
  }
  //dropDown.classList.add("dropDownHide");
  node.appendChild(dropDown);
  newEvt.dom = dropDown;

  node.addEventListener("dragenter", function(event){
    event.preventDefault()
  });
  node.addEventListener("dragover", function(event){
    event.preventDefault()
    event.target.style.backgroundColor = "#4c548c";
  });
  node.addEventListener("drop", function(event){
    if(events[node.getAttribute("backendname")].eventType == "Team"){
      if (participants[event.dataTransfer.getData("text")].members.length != 5){
        event.target.style.backgroundColor = "";
        alert("Whoopsie! \n You can not assign individual competetors to a team event");
        return;
      }
    }
    else{
      if (participants[event.dataTransfer.getData("text")].members.length == 5){
        event.target.style.backgroundColor = "";
        alert("Whoopsie! \nYou can not assign teams to an event for individuals")
        return;
      }
    }
    event.target.style.backgroundColor = "";
    events[node.getAttribute("backendname")].participants.push(event.dataTransfer.getData("text"));
    JSON.stringify(events[node.getAttribute("backendname")].participants);
    localStorage.setItem("events", JSON.stringify(events));
    let tag = document.createElement("p");
    tag.classList.add("eventLiStyle");
    let text = document.createTextNode(event.dataTransfer.getData("text"));
    tag.appendChild(text);
    tag.style.marginTop = 0;
    dropDown.appendChild(tag);
    console.log(window);
  })
  node.addEventListener("dragleave", function(event){
    event.target.style.backgroundColor = "";
  })
  console.log(newEvt);
  node.addEventListener("click", newEvt.nodeShowHide.bind(newEvt));
  evtList.appendChild(node);
  JSON.stringify(events[node.getAttribute("backendname")].participants);
  localStorage.setItem("events", JSON.stringify(events));
  console.log(localStorage);
  console.log(events);
});

//*********Participant setup and storage********************//
var partList = document.getElementById("partList");
//create an object which will act like a dictionary and store key value pairs
//containing particpant information
if (localStorage.participants == null){
  var participants = {};
}
else{
  var participants = JSON.parse(localStorage.getItem("participants"));
  for (newPart in participants){
    participants[newPart].nodeShowHide = function(){
      if (this.expanded == false){
        this.dom.classList.remove("dropDownHide");
        this.dom.classList.add("dropDownShow");
        this.expanded = true;
      }
      else{
        this.dom.classList.remove("dropDownShow");
        this.dom.classList.add("dropDownHide");
        this.expanded = false;
      }
    }
    let node = document.createElement("li");
    node.classList.add("grab");
    node.appendChild(document.createTextNode(participants[newPart].name));
    let dropDown = document.createElement("div");
    for (let i = 0; i < participants[newPart].members.length; i++){
      if (participants[newPart].members[i] == ""){
        break;
      }
      dropDown.appendChild(document.createTextNode(participants[newPart].members[i]));
      dropDown.appendChild(document.createElement("br"));
    }
    dropDown.classList.add("dropDownHide");
    node.appendChild(dropDown);
    participants[newPart].dom = dropDown;
    node.setAttribute("draggable", "true");
    node.setAttribute("BackendName", participants[newPart].name);
    node.addEventListener("dragstart", function(event){
      event.dataTransfer.setData("text", event.target.getAttribute("backendName"));
    })
    node.addEventListener("click", participants[newPart].nodeShowHide.bind(participants[newPart]));
    partList.appendChild(node);
  }
}

var teamName = document.getElementById("teamName");
var member1 = document.getElementById("member1");
var member2 = document.getElementById("member2");
var member3 = document.getElementById("member3");
var member4 = document.getElementById("member4");
var member5 = document.getElementById("member5");
var subParticipant = document.getElementById("SubParticipant");
subParticipant.addEventListener("click", () =>{
  teamName.value = teamName.value.replaceAll(" ", "_");
  member1.value = member1.value.replaceAll(" ", "_");
  member2.value = member2.value.replaceAll(" ", "_");
  member3.value = member3.value.replaceAll(" ", "_");
  member4.value = member4.value.replaceAll(" ", "_");
  member5.value = member5.value.replaceAll(" ", "_");
  newPart = {
    name: teamName.value,
    score: 0,
    members: [member1.value, member2.value, member3.value, member4.value, member5.value],
    expanded: false,
    nodeShowHide: function(){
      if (this.expanded == false){
        this.dom.classList.remove("dropDownHide");
        this.dom.classList.add("dropDownShow");
        this.expanded = true;
      }
      else{
        this.dom.classList.remove("dropDownShow");
        this.dom.classList.add("dropDownHide");
        this.expanded = false;
      }
    },
  };
  console.log(member1.disabled);
  if (member1.disabled == true){
    newPart.members = [];
  }
  participants[newPart.name] = newPart;
  teamName.value = "";
  member1.value = "";
  member2.value = "";
  member3.value = "";
  member4.value = "";
  member5.value = "";

  let node = document.createElement("li");
  node.classList.add("grab");
  node.appendChild(document.createTextNode(newPart.name));
  let dropDown = document.createElement("div");
  for (let i = 0; i < newPart.members.length; i++){
    if (newPart.members[i] == ""){
      break;
    }
    dropDown.appendChild(document.createTextNode(newPart.members[i]));
    dropDown.appendChild(document.createElement("br"));
  }
  dropDown.classList.add("dropDownHide");
  node.appendChild(dropDown);
  newPart.dom = dropDown;
  node.setAttribute("draggable", "true");
  node.setAttribute("BackendName", newPart.name);
  node.addEventListener("dragstart", function(event){
    event.dataTransfer.setData("text", event.target.getAttribute("backendName"));
  })
  node.addEventListener("click", newPart.nodeShowHide.bind(newPart));
  partList.appendChild(node);
  localStorage.setItem("participants", JSON.stringify(participants));
})

let evt = "e1";
let eventElements = document.getElementsByClassName("EventList")[0].children.evtList;
let elements = eventElements.getElementsByTagName("li");
for(elem of elements){
  if (!elem.classList.contains("completed")){
    console.log(elem);
  }
}

var navTracker = document.getElementById("AddPart");
navTracker.addEventListener("click", function(){
  let eventElements = document.getElementsByClassName("EventList")[0].children.evtList;
  let elements = eventElements.getElementsByTagName("li");
  for(elem of elements){
    if (!elem.classList.contains("completed")){
      events[elem.innerText].expanded = true;
    }
  }
    //thia needs to change it is making it so when you navigate back to score tracker all of the events unhide
    localStorage.setItem("events", JSON.stringify(events));
    console.log(events);
});


//make input elements link to their submit buttons
let inpElements = [teamName,member1,member2,member3,member4,member5];
for (let element of inpElements){
  element.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
      subParticipant.click();
    }
  })
}

let evtInpElements = [evtName, skillReq, teamOrInd];
for(let element of evtInpElements){
  element.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
      subEvent.click();
    }
  })
}
