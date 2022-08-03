<?php
require('db.php');


$returnurl = $_GET['return'];       //Check for return desiation
if (is_null($returnurl)) {
  $returnurl = "http://sunnyland.maxinc.cf/"; //IF empty reset to default
}
$webglurl = $_GET['webgl']; //Check if the page was opened from webgl
if (is_null($webglurl)) {
  $webglurl = "false";
}

//'' messes up php so has to be stored in var
$alertJS = "'You can sign up ingame.'";
$backJS = "'".$returnurl."'";

session_start();
if (isset($_POST['username'])){//If username was sent
        // removes backslashes
        $username = stripslashes($_REQUEST['username']);
        //escapes special characters in a string
        $username = mysqli_real_escape_string($con,$username);
        $password = stripslashes($_REQUEST['password']);
        $password = mysqli_real_escape_string($con,$password);
        //Checking is user existing in the database or not
        $query = "SELECT password FROM `bl_game_users` WHERE name='$username'";
        $result = mysqli_query($con,$query);            //Store the result
        while ($row =  mysqli_fetch_array($result)){    
                $hashed_password = $row['password'];    //Get the hashed password
        }
    if(password_verify($password, $hashed_password)) {//Check if the current password matches with the hashed one
            $_SESSION['username'] = $username; //Store the username in session, used for authentaction and keeping track of who logged in
            header("Location: index.php?return=". $returnurl . "&webgl=" . $webglurl);//Open the index page, pass the return url and also wether the login was sent from webgl
        }else{ // If password incorrect then show the alert div
        echo '
            
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="utf-8">
                    <title>Login </title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="stylesheet" href="css/style.css"/>
                        <link rel="icon" href="ico.ico">
                    </head>
                    <body>
                        <center>
                            <div class="form-container">
                    <div class="form">
                        <img src="ico.ico">
                    <h1 >Log In </h1>
                    <div style="  padding: 20px;
                    background-color: #f44336;
                    color: white;">
                                    <span style="  margin-left: 15px;
                    color: white;
                    font-weight: bold;
                    float: right;
                    font-size: 22px;
                    line-height: 20px;
                    cursor: pointer;
                    transition: 0.3s;" onclick="this.parentElement.style.display='."'".'none'."'".';">&times;</span> 
                    <strong>Error:</strong> Incorrect Username or Password.<br> (Note: your username is not the same as your nickname)
                    </div>
                    <form action="" method="post" name="login">
                    <input type="text" name="username" placeholder="Username" required /> <br>
                    <input type="password" name="password" placeholder="Password" required /> <br>
                    <input class="signup" name="submit" type="submit" value="Login" />
                    <button onclick="alert('. $alertJS .');" class="signup"> Sign Up</button>
                    <button onclick="window.location.href='. $backJS .';" class="signup"> Back</button>
                    </form>
                    </div>
                    </div>
                    </center>
                    </body>
                    </html>
                    
            
            ';
        }
    }else{//If user name was not sent then show the login page as normal
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Login </title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/style.css"/>
    <link rel="icon" href="ico.ico">
</head>
<body>
    <center>
        <div class="form-container">
<div class="form">
    <img src="ico.ico">
<h1 >Log In </h1>
<form action="" method="post" name="login">
<input type="text" name="username" placeholder="Username" required /> <br>
<input type="password" name="password" placeholder="Password" required /> <br>
<input class="signup" name="submit" type="submit" value="Login" />
<button onclick="alert('You can sign up ingame.');" class="signup"> Sign Up</button>
<button onclick="window.location.href='<?php echo $returnurl; ?>
'" class="signup"> Back</button>
</form>
</div>
</div>
</center>
<?php } //Close else?>
</body>
</html>