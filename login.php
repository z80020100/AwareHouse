<?php
session_start();

$login_error = false;
if(isset($_SESSION['user_name'])){
	session_destroy();
}

if(isset($_POST['submit'])){	

	if($_POST['username'] == "test" && $_POST['password'] == "1234"){
		$_SESSION['user_name'] = "test";
		header("location: index.php");
	}
	else{
		$login_error = true;
	}
}

?>
<html><head><title>Login</title></head><body>

<?php  if($login_error) echo "Wrong account or password";  ?>
<form action="login.php" method="POST">
<input type="text" name="username">
<input type="password" name="password">
<input type="submit" name="submit" value="login">
</form>

</body></html>


