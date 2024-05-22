let buttons = document.getElementsByClassName("navButton");

for(let i = 0; i < buttons.length; i++) {
  buttons.item(i).onclick = function() {
    window.location.href = this.getAttribute("data-link");
  };
};