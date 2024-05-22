let buttons = document.getElementsByClassName("navButton");
let imgs = document.getElementsByClassName("img");

for(let i = 0; i < buttons.length; i++) {
  buttons.item(i).onclick = function() {
    window.location.href = this.getAttribute("data-link");
  };
};

for(let i = 0; i < imgs.length; i++) {
  imgs.item(i).onclick = function() {
    let p = document.getElementById(this.getAttribute("data-txtId"));
    if(p.style.display == "none") p.style.display = "block";
    else p.style.display = "none";
  }
}