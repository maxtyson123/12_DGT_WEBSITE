<?php
//include auth.php file on all secure pages
include("auth.php");
include("db.php");

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Home</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/style.css"/>
</head>
<body>
    <center>
        <div class="home-pannel">
<div class="form">
    <img src="../../Images/ico.ico">
<h1 > ACC NAME</h1>
<div class="row">
    <div class="column">
        <img src="coin.png" alt="coins" height="150px" width="150px"  style="border-radius: 35px;" >
    </div>
    <div class="column">
        <img src="death.png" alt="death"  height="150px" width="150px"  style="border-radius: 35px;">
    </div>
    <div class="column">
        <img src="kill.png" alt="kill" class="cover"  height="150px" width="150px"  style="border-radius: 35px;">
    </div>
    <div class="column">
        <img src="score.png" alt="score"  height="150px" width="150px"  style="border-radius: 35px;">
    </div>
</div>
<div class="row">
    <div class="column">
        <h3>COINS</h3>
    </div>
    <div class="column">
        <h3>DEATHS</h3>
    </div>
    <div class="column">
        <h3>KILLS</h3>
    </div>
    <div class="column">
        <h3>SCORE</h3>
    </div>
</div>
<div class="row">
    <div class="column">
        <h3><?php

$query1 = mysql_query("SELECT coins FROM `bl_game_users` WHERE name='{$_SESSION["username"]}'");

while($results = mysql_fetch_array($query1)){
    echo $result['COINS'];
}

?> </h3>
    </div>
    <div class="column">
        <h3>DEATHS</h3>
    </div>
    <div class="column">
        <h3>KILLS</h3>
    </div>
    <div class="column">
        <h3>SCORE</h3>
    </div>
</div>
<button onclick="window.location.href='logout.php'">Logout</button>
</div>
</div>
</center>
</body>
</html>