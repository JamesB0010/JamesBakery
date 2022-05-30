var startButton = document.getElementById("startButton");
startButton.addEventListener("click", ()=>{
  localStorage.removeItem("participants");
  localStorage.removeItem("events");
  window.location.href = 'Home/home.html'
})
