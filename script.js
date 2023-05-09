var plr = document.getElementById("player");

const var speed = 10;

document.addEventListener("keyPressed", (e) => {
  if(e.code == "w"){
    plr.y += speed
  }else if(e.code == "s"){
    plr.y -= speed;
  }else if(e.code == "a"){
    plr.x -= speed;
  }else if(e.code == "d"){
    plr.x += speed;
  }
});
