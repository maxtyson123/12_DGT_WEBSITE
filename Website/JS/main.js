
///////Loading/Loader

document.addEventListener("DOMContentLoaded", htmlload); //Once the html page loads
const loader = document.getElementById("loader");
function htmlload() {
    
    updatePageName(); 
    if(getCookie("transition") == "yes"){ // This was changed to be a cookie becuase I noticed if the user reloaded the page  then the opening transition was shown
        setCookie("transition","no",1);
        transitionAnimate("reverse") ;
        setTimeout(function () {
            document.querySelector("#transition").style.animation = "";//Remove the animtion once played, this allows it to be re-run 
        }, 1100);
    }
        if(dontloader){   
            //Run theese functions that would usally be run  once page fully loaded
            checkDownloadedBefore();
            check_anim();
            transitionSetup();
        }else{
            
            loader.style.display = "block";
            loader.style.opacity = "1";
            loader.style.width = "100%";
            loader.classList.add("ignoreImg") ;
            document.body.style.overflow = "hidden";                //Stop the user from scrolling so they dont see unloaded content
        }
    
   
}
window.onload = function() { 
    loadedFully();
    
};

function loadedFully() { 
    loader.style.width = "300%"; //Change the width to show a zoom to the left animation
    loader.style.opacity = "0"; 
    document.body.style.overflow = "scroll";               
    
    scrollFunction(); //First Scroll
    transitionSetup();
    checkDownloadedBefore();                                                         
    check_anim();                                          
    setTimeout(function () {
        loader.style.display = "none";
        updateImage();
    }, 250);                                                      //Wait 2.5ms before hiding the loader so the width animation has time to play 
    
}
window.onscroll = function() { 
    scrollFunction(); //As a function incase called by other functions, eg. scroll to top
};


//Listners

///////////////////Varibles

//cookie-states
var toggle = 0;


//site-data
var statusData = {};
var cookieData = getCookie("statusData");
if(cookieData != ""){
    statusData = JSON.parse(cookieData);
}
var MainSite = "ms";
var sunnyland = "ro";
var Login = "ls";
var Multi = "gs";
var Patcher = "ps";
var BackUp = "bul";
//scroll to top 
var scrolltotop = document.getElementById("scrolltotop");
//Loader  
var dontloader = false;
//Images
var docWidthCache = 0;
var setImages = false;
var imgmode = "none";
/////////////Functions
function checkServicesOnload() {
    //get the cookie stored 
    if (statusData.initial != 1) {   //If it doesnt exist or doesnt equal 1 run all the checks
        Checkmaxinc();
        Checkro();
        Checkls();
        Checkpun();
        Checkpatch();
        Checkbl();
        statusData.initial = 1;
        statusData.storeddata = [];
        setCookie("statusData", JSON.stringify(statusData), 1); //change it to one so thant when reloaded the function wont run again
    }
    if (statusData.initial == 1) {
        setStatus(MainSite);
        setStatus(sunnyland);
        setStatus(Login);
        setStatus(Multi);
        setStatus(Patcher);
        setStatus(BackUp);

    }


}
function checkDownloadedBefore() {
    let x = getCookie("downloaded-check"); //get the cookie stored 
    if (x != 1) {
        hideClasses("launch");               //Hide all the launch links
    } else {
        hideClasses("download");             //Hide all the download links
    }
}

function check_site(id, site_url, site_name) {
    var buttontochange = document.getElementById(id); //Get the button
    var url = site_url;                              //sites url
    var img = new Image();                          //Create a image
    img.src = url;                                  //Set the images soucre to the url
    //Atempt to load image
    img.onload = function() {                      //If it loads                    
        updateStatusData(id,1);                       //Set a cookie with the site id that it works 
        buttontochange.className = "sercvieUp";    //Set the status style to green/serciveUp 
    };
    img.onerror = function() {                       //If it dont  work
        updateStatusData(id,2)    ;                     //Set a cookie with the site id that it works
        alert(site_name + ' IS DOWN AND NOT-RUNNING');//Alert the user
        buttontochange.className = "serviceDown";    //Set the status style to red/serciveDown
    };
}

function updateStatusData(id,data){
    function StoredStatus(id,data){
        this.id = id;
        this.data = data;
    }
    var updated = false;
    for (let x = 0; x < statusData.storeddata.length; x++) {
        if(statusData.storeddata[x].id == id){
            statusData.storeddata[x].data = data;
            updated = true;
        }
    }
    if(!updated){
        var newStored = new StoredStatus (id,data);
        statusData.storeddata.push(newStored);
    }
    setCookie("statusData", JSON.stringify(statusData), 1);
}

function Checkmaxinc() {
    check_site("ms", 'http://maxinc.cf/logo.png', "MAIN");
}

function Checkro() {
    check_site("ro", 'http://sunnyland.maxinc.cf/Images/ico.ico', "SUNNY LAND SITE");
}

function Checkls() {
    check_site("ls", 'http://www.maxserver.ml/SunnyLandLogin/ico.ico', "LOGIN SITE");
}

function Checkpun() {
    check_site("gs", 'https://www.photonengine.com/Content/img/nav-logo-photon.png', "MULTIPLAYR SERVICE");

}

function Checkpatch() {
    check_site("ps", 'https://patchkit.net/img/patchkit_logo_black.png', "LAUNCHER & DOWNLOAD SERVICE");
}

function Checkbl() {
    //check_site("bul",'http://mfpsatmaxinc.mygamesonline.org/download.png',"BACK UP LOGIN SERVICE") 
    console.log("Back Up Login not active");
}

function check_anim() {
    run_anim("bottom");
    run_anim("left");
    run_anim("right");
    run_anim("zoom");
    run_anim("top");
}

function forceRecheck() { //used in the console when testing, may become a button later
    Checkmaxinc();
    Checkro();
    Checkls();
    Checkpun();
    Checkpatch();
    Checkbl();
}
function getCookie(cookieName) { //gets the cookie
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    });
    return cookie[cookieName];
}

function hideClasses(className) {
    var buttons = document.querySelectorAll("." + className); //Select all with the classname passed
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].remove();                                  //Remove them from the site  
    }
}
function playedGame(){
    setCookie("downloaded-check" ,1 ,365);
}
function openMenuMobile() { // this is run when the user clicks on the nav button on mobile
    var menuResponsive = document.getElementById("MenuID");
    



    if (toggle == 0) {
        menuResponsive.className = "Menu responsive";
        toggle = 1;
        topFunction();
    } else {
        menuResponsive.className = "Menu sticky";
        toggle = 0;
        topFunction();
    }
}

function run_anim(type) {
    var check_anims = document.querySelectorAll(".check_anim_" + type); //Get all animation class
    for (var i = 0; i < check_anims.length; i++) {                      //For each animaiton class
        var windowHeight = window.innerHeight;                      
        var elementTop = check_anims[i].getBoundingClientRect().top;
        var elementVisible = 50;
        if (elementTop < windowHeight - elementVisible) { //If the animtion is inveiw
            check_anims[i].classList.add("anim-" + type); //Add the animtion class
            check_anims[i].classList.remove("hidden");    //Show the elemnt  
        } else {                                            //If it is not visible  
            check_anims[i].classList.remove("anim-" + type);//Remove the animation class (This is done so that is is replayable)
            check_anims[i].classList.add("hidden");         //Hide the element
        }
    }
}


function setCookie(cookie_name, cookie_info, expire_date) { 
    const d = new Date();
    d.setTime(d.getTime() + (expire_date * 24 * 60 * 60 * 1000)); //Get the date, then add the expirey date to the current date
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookie_name + "=" + cookie_info + ";" + expires + ";path=/"; //Combine into a cookie
}

function setStatus(buttonStatId) { // function to set a status from cookie, used to make it more efficent.
    for (let x = 0; x < statusData.storeddata.length; x++) {
        var buttontochange = document.getElementById(buttonStatId);
        if(statusData.storeddata[x].id == buttonStatId){
            if (statusData.storeddata[x].data == 1) {
                //If the cookie states that it has previously loaded 
                
                buttontochange.className = "sercvieUp";
            }
            if (statusData.storeddata[x].data == 2) {
                //If the cookie states that it has previously been not avalible 
               
                buttontochange.className = "serviceDown";
            }
        }
    }
    
}






function scrollFunction() {
    scrolltotop = document.getElementById("scrolltotop"); //Get the scroll button
    check_anim();                                         //Check the animtions 
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) { //If the window has scrolled lower then 500px then show the button
        scrolltotop.style.display = "block";      //Show the button
        scrolltotop.style.opacity = "1";
        scrolltotop.classList.add("anim-right");  //Animate its entrance
    } else {
        scrolltotop.style.opacity = "0";
        setTimeout(function () {
            scrolltotop.style.display = "none";   //Hide after the transition has had time to run
        }, 500);
       
    }
}

// go to the top off the page when button clicked
function topFunction() {
    document.body.scrollTop  = 0;            //Scroll to the top
    document.documentElement.scrollTop  = 0; //Also scroll to top for other browersers
    scrollFunction();                        //Run the scroll function to update the animations and to hide the button
}


async function setchangelog() {
    const response = await fetch("../External/changelog.json");         //Get the changelog
    const json = await response.json();                                 //Asyncorchisely get the changelog
    const changelogdisplay = document.querySelector("#changelog_id") ;   //Get the changelog  containing div
    var alternate = 0;
    for (let x = 0; x < json.versions.length; x++) {                //For every version:     
        //Title
        const changelogelemt = document.createElement('div');             //Create a new div
        const title = document.createElement("h2");                       //Create a title
        title.innerHTML = json.versions[x].label;                   //Set the title to be the update version
        title.classList.add("check_anim_zoom");                     //Animate the title
        changelogelemt.appendChild(title);                           //Add the title to the div
        //Inner Text
        const text = document.createElement("div");                       //Create a div          
        var changelogsplit = json.versions[x].changelog.split("\r\n");   //Split the versions changes into a list
        for (let x = 0; x < changelogsplit.length; x++) {           //For every listed change:
            const text_lines = document.createElement("p");                   //Create a text line 
            if(alternate == 0){
                alternate = 1;
                text_lines.classList.add("check_anim_left");                //Animate it
            }else{
                alternate = 0;
                text_lines.classList.add("check_anim_right");                //Animate it
            }
            
            if(changelogsplit[x] != ""){                                //Check if it wasnt acidently empty
                text_lines.innerHTML = "- "+changelogsplit[x];          //Add the details of the change
            }
            text.appendChild(text_lines);                                //Add the line to the textline div
        }
        changelogelemt.appendChild(text);                            //Add the text div to the version div
        changelogdisplay.appendChild(changelogelemt);               //Add the version div to the entire changelog div
    }
    
}
window.addEventListener('resize', function() {
    updateImage();
}, true);
function updateImage(){
    var images = document.querySelectorAll("img");     //Select all the images on the page
    docWidthCache = window.innerWidth;
    if(docWidthCache != 0){
        if(docWidthCache > 600){
            if(!setImages){
                imgmode = "Desktop";
                setImages = true;
            }else if(imgmode != "Desktop"){
                setImages = false;
                updateImage();
            }
            else{
                return;
            }
        }else if(docWidthCache <= 600){
            if(!setImages){
                imgmode = "Mobile";
                setImages = true;
            }else if(imgmode != "Mobile"){
                setImages = false;
                updateImage();
            }
            else{
                return;
            }
        }else{
            return;
        }
    }               
    for (let x = 0; x < images.length; x++) {                                //For all the slecetec images:
        if(!images[x].parentElement.classList.contains("loader-content"))  {   //If the image is not in the loader
            var imgpath = images[x].src.split("/");                              //Split the path
            var replaced = false;
            for(let y = 0; y < imgpath.length; y++){
                if(imgpath[y] == "Desktop" || imgpath[y] == "Mobile"){
                    replaced = true;
                    imgpath[y] = imgmode;
                }
            }
            //Repace Desktop/Mobiles
            //Set Desktop/Moble
            if(!replaced){
                imgpath.push(imgmode+"/"+imgpath.pop());                         //Get the last part of the url (the image) and add the folder "Desktop", then add to the url array          
            }
            imgpath = imgpath.join("/");                                         //Join the array together
            images[x].src = imgpath;                                             //Set the url
            var testerimg = new Image();                                         //Create a new image to test if it works
            testerimg.onerror = imageNotFound;                                   //If the image doesnt load then run a function
            testerimg.src = images[x].src;                                       //Set the test image source to the new url
            function imageNotFound(){                                                                    //Image doesnt load function
                images[x].style.width = "15%";                                                               //Resize
                images[x].style.height = "15%";
                images[x].style.display = "block";           
                images[x].style.margin = "auto";                                                             //Center
                images[x].classList.add("ignoreImg");
                images[x].src = "http://cognitus-h2020.eu/wp-content/plugins/slider/images/loading_1.gif";  //Set it to a loading gif
            }
        }
         
    }
}

function updatePageName(){
    var path = window.location.pathname; //Get the url path
    var page = path.split("/").pop();    //Split the url with every "/", and return the last elemnt
    page = page.split(".");               //Split the file name
    var page_name = page.shift();        //Get only the name and ingore the file type
    if (page_name == "index") {          //Rename index.html
        page_name = "home";
    } else if (page_name == "qanda") {   //Rename qanda.html
        page_name = "Q and A";
    }else if (page_name == "status" || page_name == "demo"){   //Ignore loading on status page or demo page becuase they have to load external assets that can be unrepsonisve
        dontloader = true;
    }
    page_name = page_name.charAt(0).toUpperCase() + page_name.slice(1); //Make the first chracter uppercase
    var current_page_title = document.title;    //Get the current title
    document.title = current_page_title + " | " + page_name; //Add the page name


}

function trainstiontoPage(url){
        transitionAnimate("normal");
        setTimeout(function () {
            setCookie("transition","yes",1);
            window.location.href = url;   //Go to page after the transition has had time to run
        }, 1000);
 
}
function transitionAnimate(type){
    var pageHeight = document.documentElement.scrollTop + (screen.height/2); //Get the center of the screen, so that the animation is closing around where the user has scrolled, rather then the exact center of the page
    document.documentElement.style.setProperty("--transition-vertical-pos", pageHeight + "px"); //Update the css varible to have the centered position
    const trnasitionelemt = document.querySelector("#transition");
    trnasitionelemt.style.animation = "tranistion-close 1s 1";   //Play the animtion
    document.body.style.backgroundColor = "#50C878";
    document.body.style.transition = "0s";
    trnasitionelemt.style.animationFillMode = "forwards";
    trnasitionelemt.style.animationDirection = type;           //Make the animtion run in passed type, eg. play backwards if opening the page
}
function transitionSetup(){
    var ahrefs = document.querySelectorAll("a");  
    for (let x = 0; x < ahrefs.length; x++) {    
        ahrefs[x].addEventListener("click", function(event){
                if(ahrefs[x].host == window.location.host){ //IF they are going to the same domain, this prevents the transtion on pages like the download one or the launcher
                    trainstiontoPage(ahrefs[x].href);
                    event.preventDefault(); // Stop from naviagting to the page, so there is time to show the transition
                }
          });
    }
}