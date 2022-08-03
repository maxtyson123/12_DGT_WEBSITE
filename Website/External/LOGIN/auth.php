<?php
session_start();
if(!isset($_SESSION["username"])){ // checks if a username is stored in session, username is only stored if credintials are correct
header("Location: login.php");     // if its not the redirct to login page
exit(); }
?>