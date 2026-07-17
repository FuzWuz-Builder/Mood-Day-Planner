const moods = {

happy:
"Use your energy wisely. Pick one meaningful task and enjoy the momentum.",

okay:
"Choose your top three priorities and take them one step at a time.",

calm:
"Protect your peaceful energy. Add gentle tasks and breaks.",

anxious:
"Start with something small. Focus only on the next step.",

low:
"Lower the pressure. Choose one simple win today.",

overwhelmed:
"Pause, breathe, and choose the smallest possible action."

};



function selectMood(mood){

document.getElementById("moodText").innerText =
moods[mood];

}





// TASK SYSTEM


let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];



function saveTasks(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}



function addTask(){

let text =
document.getElementById("taskInput").value;


let category =
document.getElementById("taskCategory").value;


let time =
document.getElementById("taskTime").value;



if(!text) return;



tasks.push({

text,
category,
time,
done:false

});


saveTasks();

renderTasks();


document.getElementById("taskInput").value="";

}



function toggleTask(index){

tasks[index].done =
!tasks[index].done;


saveTasks();

renderTasks();

}



function deleteTask(index){

tasks.splice(index,1);

saveTasks();

renderTasks();

}



function renderTasks(){

let list =
document.getElementById("taskList");


let timeline =
document.getElementById("timeline");


list.innerHTML="";

timeline.innerHTML="";


let completed=0;



tasks.forEach((task,index)=>{


if(task.done)
completed++;



list.innerHTML += `

<div class="task ${task.done?"completed":""}">

<div>

<strong>${task.text}</strong>

<br>

<small>
${task.category}
${task.time ? " • "+task.time:""}
</small>

</div>


<div>

<button onclick="toggleTask(${index})">
✓
</button>


<button onclick="deleteTask(${index})">
✕
</button>

</div>


</div>

`;



if(task.time){

timeline.innerHTML += `

<div class="timeline-item">

<strong>
${task.time}
</strong>

<br>

${task.text}

</div>

`;

}


});



let percent =
tasks.length ?
Math.round(
(completed/tasks.length)*100
)
:0;



document.getElementById("progressFill")
.style.width =
percent+"%";



document.getElementById("progressText")
.innerText =
`${percent}% complete`;

}




function goToday(){

let today=new Date();

createCalendar(
today.getFullYear(),
today.getMonth()
);

}




function createCalendar(year,month){

const calendar=document.getElementById("calendar");

const title=document.getElementById("monthTitle");


const months=[
"January","February","March",
"April","May","June",
"July","August","September",
"October","November","December"
];


title.innerText =
months[month]+" "+year;


calendar.innerHTML="";


let firstDay=
new Date(year,month,1).getDay();


firstDay =
firstDay===0 ? 6:firstDay-1;


let days =
new Date(year,month+1,0).getDate();



for(let i=0;i<firstDay;i++){

calendar.innerHTML+="<div></div>";

}



for(let d=1;d<=days;d++){

let div=document.createElement("div");

div.className="day";

div.innerText=d;


calendar.appendChild(div);

}


}



const quotes=[

"Small progress is still progress 🌱",

"You don't have to do everything today.",

"Your wellbeing matters.",

"One calm step at a time."

];


document.getElementById("quote").innerText =
quotes[new Date().getDate()%quotes.length];



let now=new Date();

createCalendar(
now.getFullYear(),
now.getMonth()
);



renderTasks();

// DARK MODE


function toggleTheme(){

document.body.classList.toggle("dark");


localStorage.setItem(
"theme",
document.body.classList.contains("dark")
);

}



if(localStorage.getItem("theme")=="true"){

document.body.classList.add("dark");

}



// GREETING


function updateGreeting(){

let hour =
new Date().getHours();


let text;


if(hour < 12){

text="Good Morning ☀️ Mood Day Planner";

}

else if(hour < 18){

text="Good Afternoon 🌿 Mood Day Planner";

}

else{

text="Good Evening 🌙 Mood Day Planner";

}


document.getElementById("greeting").innerText=text;

}



updateGreeting();

// ===============================
// PART 4 FINAL FEATURES
// ===============================



// SAVE MOODS


let moodHistory =
JSON.parse(localStorage.getItem("moodHistory"))
|| [];



const oldSelectMood = selectMood;


selectMood = function(mood){

oldSelectMood(mood);


moodHistory.push({

mood:mood,

date:new Date().toLocaleDateString()

});


localStorage.setItem(
"moodHistory",
JSON.stringify(moodHistory)
);


updateMoodHistory();

};





function updateMoodHistory(){

let box =
document.getElementById("moodHistory");


if(!moodHistory.length){

box.innerText="No moods saved yet.";

return;

}


let recent =
moodHistory.slice(-3);


box.innerText =
recent.map(
m=>m.mood
).join(" • ");

}





// STREAK


function updateStreak(){

let days =
new Set(
tasks.map(
t=>t.time
)
);


document.getElementById("streak")
.innerText =
days.size+" days";

}





// EXPORT


function exportPlanner(){

let text =
"Mood Day Planner\n\n";


tasks.forEach(t=>{

text +=
`${t.done?"✓":"☐"} ${t.text}`;

if(t.time){

text +=
" - "+t.time;

}

text+="\n";

});



let blob =
new Blob(
[text],
{type:"text/plain"}
);


let link =
document.createElement("a");


link.href =
URL.createObjectURL(blob);


link.download =
"my-day-plan.txt";


link.click();

}





// REMINDERS


function enableReminder(){

if(!("Notification" in window)){

alert(
"Notifications are not supported."
);

return;

}


Notification.requestPermission()
.then(permission=>{


if(permission==="granted"){

new Notification(
"Mood Day Planner 🌿",
{
body:
"Your day is waiting. Start with one small step."
}
);

}

});


}





// UPDATE WHEN PAGE LOADS


updateMoodHistory();

updateStreak();
