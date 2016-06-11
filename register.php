<?php

require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");

$template = $twig->loadTemplate('register.html');
$message = "";
/*if(isset($_SESSION['u_name'])){
	header("location:index.php");
}*/

not_admin_redirect();

if(!isset( $_POST['userpass']))
	 $_POST['userpass'] = '';

if(!isset( $_POST['verification']))
	 $_POST['verification'] = '';
 
if(!isset($_POST['phone']))
	$_POST['phone'] = '';

if(!isset($_POST['occupation']))
	$_POST['occupation'] = '';

if(isset($_POST['submit'])){	

	if(  user_create($_POST['username'] , $_POST['userpass'] , $_POST['verification'], $_POST['phone']) ){
		$message = "帳號創立成功";
		header("refresh:2;url=index.php");
	}
	else
	{
		$message = "帳號創立失敗";
	}
}
if(is_admin()){
	$register_title = "創造帳號";
	$register_admin = true;
}
else{
	$register_title = "註冊";
	$register_admin = false;
}

echo $template->render(array(
	'REGISTER_TITLE' => $register_title,
	'REGISTER_MESSAGE' => $message,
	'REGISTER_ADMIN' => $register_admin,
));

?>
