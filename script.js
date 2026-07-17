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


firstDay = firstDay===0 ? 6 : firstDay-1;


let days=
new Date(year,month+1,0).getDate();



for(let i=0;i<firstDay;i++){

calendar.innerHTML+="<div></div>";

}


for(let d=1;d<=days;d++){

let div=document.createElement("div");

div.className="day";

div.innerText=d;


let today=new Date();


if(
d===today.getDate() &&
month===today.getMonth() &&
year===today.getFullYear()
){

div.classList.add("today");

}


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
