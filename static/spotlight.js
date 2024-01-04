let image = document.getElementById("imgId");
image.addEventListener("load", ZoomIn);

function ZoomIn() {
  let width = image.clientWidth;
  let height = image.clientHeight;
  image.style.transition = "width 0.4s, height 0.4s";
  image.style.width = (width + 50) + "px";
  image.style.height = (height + 40) + "px";
  setTimeout(ZoomOut,600);
}

function ZoomOut()
{
    let width = image.clientWidth;
    let height = image.clientHeight;
    image.style.transition = "width 0.4s, height 0.4s";
    image.style.width = (width - 50) + "px";
    image.style.height = (height - 40) + "px";
}

var x = setInterval(function(){
var finaldate = new Date("June 30, 2023 00:00").getTime();
var c = new Date().getTime();
var allofem = finaldate - c;

var days = Math.floor(allofem/(1000*24*60*60))
var hours = Math.floor((allofem/(1000*24*60*60) - days)*24)
var minutes = Math.floor(((allofem/(1000*24*60*60) - days)*24 - hours)*60)
var seconds = Math.floor((((allofem/(1000*24*60*60) - days)*24 - hours)*60 - minutes)*60)

document.getElementById("timer").innerHTML = days.toString() + " Days " + hours.toString() + " Hours " + minutes.toString() + " Minutes " + seconds.toString() + " Seconds ";
})

var form = document.getElementById("artistform");
form.addEventListener('submit', displaying);

function displaying(event) {
  event.preventDefault();
  
  var name = document.getElementById('name').value;
  var review = document.getElementById('review').value;
  var rating = document.querySelector('input[name="1"]:checked').value;

  var dictionary = {name: name, review: review, rating: rating};

  var data = localStorage.getItem('data');
  if(!data)
  {
    data = [];
  }
  else
  {
    data = JSON.parse(data);
  }

  data.push(dictionary);
  localStorage.setItem('data', JSON.stringify(data));
  displayData(data);
};

function displayData(data){
  var info = document.getElementById('data');
  info.innerHTML = '';

  for(var i=0; i<data.length; i++)
  {
    var str = "<tr><td>" + data[i].name + " says " + "\"" + data[i].review  + "\" " + " and rates their music with " + data[i].rating + "</td></tr>";
    info.innerHTML += str;
  }
}

window.onbeforeunload = function() {
  localStorage.clear();
}
