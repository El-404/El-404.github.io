let objs = document.getElementsByClassName("navButton");

for (let i = 0; i < objs.length; i++) {
  console.log("A");
  objs.item(i).onclick = function() {
    window.location.href = this.getAttribute("data-link");
  };
}