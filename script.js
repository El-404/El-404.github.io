var player = document.querySelector("#player");


//change these when snapping to grid
let startX = player.style.left;
let startY = player.style.top;

document.addEventListener("keypress", (event) => {
  event = event || window.event;
  let key = event.code;

  if(key == "KeyW" && player.dataset.pos > 5){
    player.id = "filler";
    document.querySelector('data-pos="'+(Number(player.dataset.pos) - 5)+'"]').id = "player";
    player = document.querySelector("#player");
  }
  if(key == "KeyS" && player.dataset.pos < 20){
    player.id = "filler";
    document.querySelector('[data-pos="'+(Number(player.dataset.pos) + 5)+'"]').id = "player";
    player = document.querySelector("#player");
  }
  if(key == "KeyA" && player.dataset.pos != 1){
    player.id = "filler";
    document.querySelector('[data-pos="'+(Number(player.dataset.pos) - 1)+'"]').id = "player";
    player = document.querySelector("#player");
  }
  if(key == "KeyD" && player.dataset.pos != 25){
    player.id = "filler";
    document.querySelector('[data-pos="'+(Number(player.dataset.pos) + 1)+'"]').id = "player";
    player = document.querySelector("#player");
  }
});

/*
dragElement(player);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.position = "absolute";
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    elmnt.style.position = "unset";
    elmnt.style.top = startY;
    elmnt.style.left = startX;
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/
