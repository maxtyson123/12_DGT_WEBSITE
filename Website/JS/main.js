var toggle = 0;
var menu = document.getElementById("MenuID");
var dropdown = document.getElementById("DropDownID");
var sticky = menu.offsetTop;

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

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrolltotop.style.display = "block";
    } else {
        scrolltotop.style.display = "none";
    }
}


function stickyMenu() {
    if (window.pageYOffset >= sticky) {
        menu.classList.add("sticky")

        dropdown.classList.add("sticky-dropdown")
    } else {
        menu.classList.remove("sticky");
        dropdown.classList.remove("sticky-dropdown");

    }
}