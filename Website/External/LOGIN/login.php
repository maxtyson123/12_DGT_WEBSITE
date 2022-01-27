<?php
require('db.php');
session_start();
// If form submitted, insert values into the database.
if (isset($_POST['username'])){
        // removes backslashes
	$username = stripslashes($_REQUEST['username']);
        //escapes special characters in a string
	$username = mysqli_real_escape_string($con,$username);
	$password = stripslashes($_REQUEST['password']);
	$password = mysqli_real_escape_string($con,$password);
	//Checking is user existing in the database or not
        $query = "SELECT * FROM `bl_game_users` WHERE name='$username'
and password='$password'";
// BELOW HAS CHANGE TO WORK WITH PASSWORD HASHING WITH SECURITY
	$result = mysqli_query($con,$query) or die(mysql_error());
	$rows = mysqli_num_rows($result);
        if($rows==1){
	    $_SESSION['username'] = $username;
            // Redirect user to index.php
	    header("Location: index.php");
         }else{
	echo "<div class='form'>
<h3>Username/password is incorrect.</h3>
<br/>Click here to <a href='login.php'>Login</a></div>";
	}
    }else{
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Login</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/style.css"/>
</head>
<body>
    <center>
        <div class="form-container">
<div class="form">
    <img src="http://reconops.maxinc.cf/Images/ico.ico">
<h1 >Log In</h1>
<form action="" method="post" name="login">
<input type="text" name="username" placeholder="Username" required /> <br>
<input type="password" name="password" placeholder="Password" required /> <br>
<input name="submit" type="submit" value="Login" />
</form>
</div>
</div>
</center>
</body>
</html>