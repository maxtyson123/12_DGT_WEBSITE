//      Varibles
//cookie-states
var toggle = 0;
var doneB4 = 0;
//site-data
var MainSite = "ms"
var ReconOps = "ro"
var Login = "ls"
var Multi = "gs"
var Patcher = "ps"
var BackUp = "bul"

//page-name
var path = window.location.pathname;
var page = path.split("/").pop();
page = page.split(".")
var page_name = page[0]
if(page_name == "index"){
    page_name = "home"
}
page_name = page_name.charAt(0).toUpperCase() + page_name.slice(1);
var current_page_title = document.title;
document.title = current_page_title +" | "+page_name;


//scroll to top and sticky
var scrolltotop = document.getElementById("scrolltotop");
var menu = document.getElementById("MenuID ");
var dropdown = document.getElementById("DropDownID ");
var sticky = menu.offsetTop;

//scroll function
window.onscroll = function () { //when the page scrolls do this, has to be inpage becuase external pages cant detect scrolling
    stickyMenu()
    scrollFunction()
};

window.addEventListener("scroll", check_anim);
add_anim();

function openMenuMobile() { // this is run when the user clicks on the nav button on mobile
    var menuResponsive = document.getElementById("MenuID");
    


    if (toggle == 0) {
        menuResponsive.className = "Menu responsive";

        toggle = 1;
        topFunction()
    } else {
        menuResponsive.className = "Menu sticky";

        toggle = 0;
        topFunction()
    }
}


function checkServicesOnload(){
    let x = getCookie("intial-check"); //get the cookie stored 
    if (x != 1){ //If it doesnt exist or equal 1 run all the checks
        Checkmaxinc()
        Checkro()
        Checkls()
        Checkpun()
        Checkpatch()
        Checkbl()   
        setCookie("intial-check", 1, 1); //change it to one so thant when reloaded it wont run again
    }
    if (x == 1){

        
        setStatus(MainSite)
        setStatus(ReconOps)
        setStatus(Login)
        setStatus(Multi)
        setStatus(Patcher)
        setStatus(BackUp)

    }
    

}


function forceRecheck(){ //used in the console when testing, may become a button later
    Checkmaxinc()
    Checkro()
    Checkls()
    Checkpun()
    Checkpatch()
    Checkbl() 
}

function setCookie(cname, cvalue, exdays ) { //(cname, cvalue, exdays ) get cokkie info
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // convert the date
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; //add it all together
  }
  
function setStatus(buttonStatId){ // function to set a status from cookie, used to make it more efficent.
let cookieID = getCookie(buttonStatId);    
 if (cookieID == 1){
   
    var buttontochange = document.getElementById(buttonStatId)
    buttontochange.className = "sercvieUp";
 }
    if (cookieID == 2){
   
     var buttontochange = document.getElementById(buttonStatId)
        buttontochange.className = "serviceDown";
  }
}

function getCookie(cookieName) { //gets the cookie
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }


  function check_site(id, site_url,site_name){
    var buttontochange = document.getElementById(id)
    var url = site_url //sites url
    var img = new Image();
    img.src = url;
    img.onload = function() {
        setCookie(id, 1, 1);
        buttontochange.className = "sercvieUp";
        alert(site_name + ' IS UP AND RUNNING')
    }
    img.onerror = function() {
        setCookie(id, 2, 1);
        alert(site_name + ' IS DOWN AND NOT-RUNNING')
        buttontochange.className = "serviceDown";
    }
}

function Checkmaxinc(){
    check_site("ms",'http://maxinc.cf/logo.png',"MAIN")
}
function Checkro(){
    check_site("ro",'http://reconops.maxinc.cf/Images/ico.ico',"RECON OPS SITE")
}
function Checkls(){
    check_site("ls",'http://www.maxserver.ml/ReconOpsLogin/ico.ico',"LOGIN SITE")
}
function Checkpun(){
    check_site("gs",'https://www.photonengine.com/Content/img/nav-logo-photon.png',"MULTIPLAYR SERVICE")
   
}
function Checkpatch(){
    check_site("ps",'https://patchkit.net/img/patchkit_logo_black.png',"LAUNCHER & DOWNLOAD SERVICE")
}
function Checkbl(){
    check_site("bul",'http://mfpsatmaxinc.mygamesonline.org/download.png',"BACK UP LOGIN SERVICE")

}

function check_anim() {
    run_anim("bottom")
    run_anim("left")
    run_anim("right")
    run_anim("zoom")
    run_anim("top")
  }

function run_anim(type){
    var add_anims = document.querySelectorAll(".add_anim_"+type);
    for (var i = 0; i < add_anims.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = add_anims[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        add_anims[i].classList.add("anim-"+type);
        add_anims[i].classList.remove("hidden");
      } else {
        add_anims[i].classList.remove("anim-"+type);
        add_anims[i].classList.add("hidden");
      }
    }
}

  function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrolltotop.style.display = "block ";
      } else {
          scrolltotop.style.display = "none ";
      }
  }

  // go to the top off the page when button clicked
  function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }


  //make the navbar sticky when the user scrolls
  function stickyMenu() {
      if (window.pageYOffset >= sticky) {
          menu.classList.add("sticky ")

          dropdown.classList.add("sticky-dropdown ")
      } else {
          menu.classList.remove("sticky ");
          dropdown.classList.remove("sticky-dropdown ");

      }
  }