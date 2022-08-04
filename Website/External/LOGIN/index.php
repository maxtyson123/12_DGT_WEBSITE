<?php
//include auth.php file on all secure pages
include("auth.php");
include("db.php");

        $query = ("SELECT sl_gems, sl_deaths, sl_gamesplayed, sl_level, nick FROM `bl_game_users` WHERE name='{$_SESSION["username"]}'");
        $result = mysqli_query($con,$query);
while ($row =  mysqli_fetch_array($result)){
    //Get the info from the sql query and store it as a varible.
    $level = $row['sl_level'];
     $games = $row['sl_gamesplayed'];
      $deaths = $row['sl_deaths'];
       $gems = $row['sl_gems'];
       $nick = $row['nick'];
        }


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
    <img src="ico.ico">
<?php echo "<h1>" . $nick . "</h1>" //Show the username?>
<div class="row">
    <!--Header Images-->
    <div class="column">
        <img src="level.png" alt="coins" height="150px" width="150px"  style="border-radius: 35px;" >
    </div>
    <div class="column">
        <img src="games.png" alt="death"  height="150px" width="150px"  style="border-radius: 35px;">
    </div>
    <div class="column">
        <img src="deaths.png" alt="kill" class="cover"  height="150px" width="150px"  style="border-radius: 35px;">
    </div>
    <div class="column">
        <img src="gems.gif" alt="score"  height="150px" width="150px"  style="border-radius: 35px;">
    </div>
</div>
    <!--Header Text-->
<div class="row">
    <div class="column">
        <h2>LEVEL</h2>
    </div>
    <div class="column">
        <h2>GAMES</h2>
    </div>
    <div class="column">
        <h2>DEATHS</h2>
    </div>
    <div class="column">
        <h2>GEMS</h2>
    </div>
</div>
    <!--Users Data-->
<div class="row">
    <div class="column">
        <h3><?php echo $level;?> </h3>
    </div>
    <div class="column">
        <h3><?php echo $games;?></h3>
    </div>
    <div class="column">
        <h3><?php echo $deaths;?></h3>
    </div>
    <div class="column">
        <h3><?php echo $gems;?></h3>
    </div>
</div>
    <!--Launch the game, also pass the login id (used for older versions of the game, will be deprecated soon)-->
<button onclick="window.location.href='<?php echo $launch . $loginId ?>'">Launch Game</button>
    <!--Log out-->
<button onclick="window.location.href='logout.php?return=<?php echo $returnurl; ?>'">Logout</button>
</div>
</div>
</center>
</body>
</html>