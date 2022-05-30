var events = JSON.parse(localStorage.getItem("events"));
var participants = JSON.parse(localStorage.getItem("participants"));
var currentSelectedEvent;
var currentParts;
var unorderedEvents = document.getElementById("unorderedEvents");
var sortList = document.getElementById("sortUL");
for (evt in events){
  console.log(events[evt]);
  let node = document.createElement("li");
  node.appendChild(document.createTextNode(evt));
  if (events[evt].expanded == false){
    node.classList.add("participantsHide");
  }
  node.setAttribute("backendName", evt);
  let parts = document.createElement("div");
  node.addEventListener("click", ()=>{
    if (currentSelectedEvent){
      currentSelectedEvent.classList.remove("selectedEvent");
      events[node.getAttribute("backendName")].expanded = false;
      currentSelectedEvent = node;
    }
    else {
      currentSelectedEvent = node;
    }
    if (currentParts){
      currentParts.classList.remove("participantsShow");
      currentParts = parts;
      console.log(currentParts);
    }
    else {
      currentParts = parts;
      console.log(currentParts);
    }
    let flag = events[node.getAttribute("backendName")].expanded;
    flag? flag = false: flag = true;
    events[node.getAttribute("backendName")].expanded = flag;
    if (flag){
      node.classList.add("selectedEvent");
      parts.classList.add("participantsShow");
      console.log("ello");
    }
    else {
      //node.classList.remove("selectedEvent");
      node.classList.add("selectedEvent");
      parts.classList.add("participantsShow");
      console.log("hello");
    }
    let partListChildren = parts.children;
    for (let child of partListChildren){
      //add drag and drop event listeners
      child.setAttribute("draggable", "true");

      //being dragged

      child.addEventListener("dragstart", function(event){
        let dragItem = event.target;
        let index = 0;
        for (let indexItem of partListChildren){
          if (indexItem == dragItem){
            break;
          }
          index ++;
        }
        event.dataTransfer.setData("text/plain", index);
      });


      //recieving drag
      child.addEventListener("drop", function(event){
        event.preventDefault();

        //get new and old index
        let oldIndex = event.dataTransfer.getData("text/plain");
        let target = event.target;
        let newIndex = 0;
        for (let indexItem of partListChildren){
          if (indexItem == target){
            break;
          }
          newIndex ++;
        }
        if (oldIndex == newIndex){
          return;
        }
        //remove dropped items at old place
        let dropped = partListChildren[oldIndex];
        dropped.parentNode.removeChild(dropped);
        if (newIndex < oldIndex){
          target.before(dropped);
        }
        else{
          target.after(dropped);
        }
        child.style.backgroundColor = "";
      });

      child.addEventListener("dragenter", function(event){
        event.preventDefault();
      });
      child.addEventListener("dragover", function(event){
        event.preventDefault();
        child.style.backgroundColor = "#4c548c";
      });

    child.addEventListener("dragleave", function(event){
      event.preventDefault();
      child.style.backgroundColor = "";
    });

    }
    console.log(partListChildren);
  })
  unorderedEvents.appendChild(node);
  for (let i = 0; i < events[evt].participants.length; i++){
    let tag = document.createElement("p");
    text = document.createTextNode(events[evt].participants[i]);
    tag.appendChild(text);
    tag.style.marginTop = 0;
    parts.appendChild(tag);
    //parts.appendChild(document.createTextNode(events[evt].participants[i]));
    //parts.appendChild(document.createElement("br"));
  }
  parts.classList.add("participantsHide");
  node.setAttribute("child", parts);
  sortList.appendChild(parts);
}
console.log(events);
console.log(participants);
