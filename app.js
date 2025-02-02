const addtask = document.getElementById("addtask");
const inputtask = document.getElementById("inputtask");
const taskcontainer = document.querySelector(".taskcontainer");
const formatButton = document.querySelector("#timeformat");
const themeButton = document.querySelector("#themeswitch")
let is24hf = true;
formatButton.addEventListener('click', function(){
    is24hf = !is24hf; // Toggle format
    document.querySelector('#timeformat').textContent = is24hf ? "12-hour" : "24-hour";
})

addtask.addEventListener('click',handleTask);
document.getElementById("inputtask").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("addtask").click();
    }
  });

themeButton.addEventListener('click', function(){
    let themeLink = document.getElementById("themestyle");
    if (themeLink.getAttribute("href") === "light.css") {
        themeButton.innerHTML = '<i class="fa-duotone fa-solid fa-sun fa-flip-horizontal">'
      themeLink.setAttribute("href", "dark.css");
    } else {
        themeButton.innerHTML = '<i class="fa-duotone fa-solid fa-moon fa-flip-horizontal">'
      themeLink.setAttribute("href", "light.css");
    }

})

function handleTask(){
    let task = document.createElement("div");
    task.classList.add("task");

    let li = document.createElement('li');
    li.innerText = `${inputtask.value}`;
    task.appendChild(li);

    let checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkButton.classList.add("checkbutton");
    task.appendChild(checkButton);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deletebutton");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    task.appendChild(deleteButton);

    if(inputtask.value === "")
    {
        let placered = document.getElementById("inputtask");
        placered.classList.add("placered");
        setTimeout(() => {
            placered.classList.remove("placered");
        }, 800);
    }
    else{
        taskcontainer.appendChild(task);
    }

    checkButton.addEventListener('click', function(){
        if(checkButton.parentElement.style.textDecoration === "line-through"){
            checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            checkButton.parentElement.style.textDecoration = "none";
        }
        else{
        checkButton.parentElement.style.textDecoration = "line-through";
        checkButton.innerHTML =`<i class="fa-solid fa-xmark"></i>`}
    });

    deleteButton.addEventListener('click', function(e){

    task.remove();
    
    });

    inputtask.value = "";
};


//CLOCK

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = "";
     
    if (!is24hf) {
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert 0 to 12
    }

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    const currentTime = is24hf ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Display the time in the clock element
    document.getElementById('time').textContent = currentTime;
}

setInterval(updateClock, 1000);
updateClock();

//Calendar
function updateCalendar() {
    const now = new Date();
    
    let date = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    let day = now.getDay();


    const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDay = daylist[day];

    const currentDate = date + '/' + (month+1) + '/' + year;
    document.getElementById('calendar').textContent = currentDate;
    document.getElementById('dayname').textContent = 
    currentDay;


}

updateCalendar();