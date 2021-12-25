var toggle = 0;


function openMenuMobile() {
    var menuResponsive = document.getElementById("MenuID");


    if (toggle == 0) {
        menuResponsive.className = "Menu responsive";
        toggle = 1;
    } else {
        menuResponsive.className = "Menu";
        toggle = 0;
    }
}