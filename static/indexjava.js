var i = 0;
var txt1 = " TOP ARTISTS ";
var speed = 50;

function typeWriter()
{
    if(i < txt1.length)
    {
        document.getElementById("first").innerHTML += txt1.charAt(i);
        i++;
        setTimeout(typeWriter,speed);
    }
}

typeWriter();