<?php


require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");

$template = $twig->loadTemplate('login.html');
$message = "";
if(isset($_SESSION['u_name'])){
	session_destroy();
	$message = "已登出";
	header("refresh:1;url=index.php");
}
//$message = hash("sha256", "test1234");
if(isset($_POST['submit'])){	

	if(!isset($_POST['password']))
		$_POST['password'] = '';

	if(!isset($_POST['phone']))
		$_POST['phone'] = '';
	

	if(  user_login($_POST['username'] , $_POST['password'], $_POST['phone']) ){
		if($_SESSION['admin'] == 1){
			$message = "登入成功, 兩秒後自動老闆控制台";
			header("refresh:2;url=listorder.php");
		}
		else{		
			$message = "登入成功, 兩秒後自動回到首頁";
			header("refresh:2;url=index.php");
		}
	}
	else
	{
		$message = "登入錯誤";
	}
}

if(isset($_GET['admin'] )){
	echo $template->render(array(
		'ADMIN_LOGIN' => 'admin',
		'LOGIN_MESSAGE' => $message,
	));
}
else{
	echo $template->render(array(
		'LOGIN_MESSAGE' => $message,
	));
}

/*
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


<html><head><title>Login</title></head><body>

<?php  if($login_error) echo "Wrong account or password";  ?>
<form action="login.php" method="POST">
<input type="text" name="username">
<input type="password" name="password">
<input type="submit" name="submit" value="login">
</form>

</body></html>
*/
?>