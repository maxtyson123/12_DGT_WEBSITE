var toggle = 0;
var doneB4 = 0;
MainSite = "ms"
ReconOps = "ro"
Login = "ls"
Multi = "gs"
Patcher = "ps"
BackUp = "bul"

function checkServicesOnload(){
    let x = getCookie("intial-check");
    if (x != 1){
        Checkmaxinc()
        Checkro()
        Checkls()
        Checkpun()
        Checkpatch()
        Checkbl()   
        setCookie("intial-check", 1, 1);
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


function forceRecheck(){
    Checkmaxinc()
    Checkro()
    Checkls()
    Checkpun()
    Checkpatch()
    Checkbl() 
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function setStatus(buttonStatId){
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

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }

function openMenuMobile() {
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



function Checkmaxinc(){
    var buttontochange = document.getElementById("ms")
    var url = 'http://maxinc.cf/logo.png';
    var img = new Image();
    img.src = url;
    img.onload = function() {
        buttontochange.className = "sercvieUp";
        setCookie("ms", 1, 1);
        alert('MAIN SITE IS UP AND RUNNING')
        
    }
    img.onerror = function() {
        setCookie("ms", 1, 1);
    alert('MAIN SITE IS DOWN AND NOT-RUNNING')
    buttontochange.className = "serviceDown";
    
    }
}

function Checkro(){
    var buttontochange = document.getElementById("ro")
    var url = 'http://reconops.maxinc.cf/Images/ico.ico';
    var img = new Image();
    img.src = url;
    img.onload = function() {
        setCookie("ro", 1, 1);
        buttontochange.className = "sercvieUp";
        alert('RECON OPS SITE IS UP AND RUNNING')
    }
    img.onerror = function() {
        setCookie("ro", 2, 1);
    alert('RECON OPS SITE IS DOWN AND NOT-RUNNING')
    buttontochange.className = "serviceDown";
    }
}

function Checkls(){
    var buttontochange = document.getElementById("ls")
    var url = 'http://www.maxserver.ml/ReconOpsLogin/ico.ico';
    var img = new Image();
    img.src = url;
    img.onload = function() {
        setCookie("ls", 1, 1);
        buttontochange.className = "sercvieUp";
        alert('LOGIN SERVICE IS UP AND RUNNING')
    }
    img.onerror = function() {
        setCookie("ls", 2, 1);
    alert('LOGIN SERVICE IS DOWN AND NOT-RUNNING')
    buttontochange.className = "serviceDown";
    }
}
function Checkpun(){
    var buttontochange = document.getElementById("gs")
    var url = 'https://www.photonengine.com/Content/img/nav-logo-photon.png';
    var img = new Image();
    img.src = url;
    img.onload = function() {
        setCookie("gs", 1, 1);
        buttontochange.className = "sercvieUp";
        alert('MULTIPLAYR SERVICES ARE UP AND RUNNING')
    }
    img.onerror = function() {
        setCookie("gs", 2, 1);
    alert('MULTIPLAYER SERVICES ARE DOWN AND NOT-RUNNING')
    buttontochange.className = "serviceDown";
    }
}
function Checkpatch(){
    var buttontochange = document.getElementById("ps")
    var url = 'https://patchkit.net/img/patchkit_logo_black.png';
    var img = new Image();
    img.src = url;
    img.onload = function() {
        setCookie("ps", 1, 1);
        buttontochange.className = "sercvieUp";
        alert('LAUNCHER & DOWNLOAD  SERVICES ARE IS UP AND RUNNING')
    }
    img.onerror = function() {
        setCookie("ps", 2, 1);
    alert('LAUNCHER & DOWNLOAD  SERVICES ARE DOWN AND NOT-RUNNING')
    buttontochange.className = "serviceDown";
    }
}

function Checkbl(){
    var buttontochange = document.getElementById("bul")
    var url = 'http://mfpsatmaxinc.mygamesonline.org/download.png';
    var img = new Image();
    img.src = url;
    img.onload = function() {
        setCookie("bul", 1, 1);
        buttontochange.className = "sercvieUp";
        alert('BACK UP LOGIN SERVICE IS UP AND RUNNING')
    }
    img.onerror = function() {
        setCookie("bul", 2, 1);
    alert('BACK UP LOGIN SERVICE IS DOWN AND NOT-RUNNING')
    buttontochange.className = "serviceDown";
    }
}



