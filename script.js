var plr = document.getElementById("player");

const var speed = 10;

document.addEventListener("keyPressed", (e) => {
  if(e.code == "w"){
    plr.top -= speed
  }else if(e.code == "s"){
    plr.top += speed;
  }else if(e.code == "a"){
    plr.left -= speed;
  }else if(e.code == "d"){
    plr.left += speed;
  }
});
