function openMenuMobile() {
    var x = document.getElementById("MenuID");
    if (x.className === "Menu") {
      x.className += " responsive";
    } else {
      x.className = "Menu";
    }
  }