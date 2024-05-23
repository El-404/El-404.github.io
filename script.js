let imgs = document.getElementsByClassName("img");
let fade = document.getElementsByClassName("fade");

function foreach(objs, func) { for(let i = 0; i < objs.length; i++) func(i); }

elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

document.onscroll = function() {
  foreach(imgs, function(i){
    if(elementIsVisibleInViewport(imgs.item(i))) imgs.item(i).style.filter="blur(0)"; 
      else imgs.item(i).style.filter="blur(6px)";
  });
};

foreach(imgs, function(i){
  if(elementIsVisibleInViewport(imgs.item(i))) imgs.item(i).style.filter="blur(0)"; 
    else imgs.item(i).style.filter="blur(6px)";
});

document.onscroll = function() {
  foreach(fade, function(i){
    if(elementIsVisibleInViewport(fade.item(i)) && !elementIsVisibleInViewport(fade.item(i-1))) fade.item(i).style.filter="blur(0)";
      else fade.item(i).style.filter="blur(60px)";
  });
};

foreach(fade, function(i){
  if(elementIsVisibleInViewport(fade.item(i)) || elementIsVisibleInViewport(fade.item(i-1))) fade.item(i).style.filter="blur(0)"; 
    else fade.item(i).style.filter="blur(6px)";
});