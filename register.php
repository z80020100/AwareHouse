<?php

require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");



$page_verify = false;
$verification_success = false;
if(isset($_SESSION['u_name'])){
	if($_SESSION['u_type'] != 0){
		header("location:index.php");
		die('');
	}
	else
		$page_verify = true;
}

if($page_verify == true){
	$template = $twig->loadTemplate('register_verification.html');
	$message = "";
}
else{
	$template = $twig->loadTemplate('register.html');
	$message = "";
}


//not_admin_redirect();

if(!isset( $_POST['userpass']))
	 $_POST['userpass'] = '';

if(!isset( $_POST['verification']))
	 $_POST['verification'] = '';
 
if(!isset($_POST['phone']))
	$_POST['phone'] = '';

if(!isset($_POST['occupation']))
	$_POST['occupation'] = '';

if(isset($_POST['submit'])){	
	if($page_verify == false){
		$uc_return = user_create($_POST['username'] , $_POST['userpass'], $_POST['phone']);
		if( $uc_return == 1 ){
			$message = "傳送驗證碼中..";
			
			user_login($_POST['username'] , $_POST['userpass'], $_POST['phone']);
			$vercode = user_vercode();
			//echo $vercode['hash'];
			send_sms($_POST['phone'], '你的驗證碼是:'.$vercode['hash'] );
			header("refresh:1;url=register.php");
		}
		else
		{
			$message = "帳號創立失敗";
		}
	}
	else{
		$vercode = user_vercode();
		if($_POST['verification'] == $vercode['hash'] && $vercode['updated'] == false){
			$sql = "UPDATE `user` SET `u_type` = '1' WHERE `user`.`u_id` = '".$_SESSION['u_id']."';";
			$db->query($sql);
			$message = "驗證碼正確，即將轉到菜單..";
			$verification_success = true;
			$_SESSION['u_type'] = 1;
			header("refresh:1;url=index.php");
		}
		else{
			if($vercode['updated'] == true)
				$message = "驗證碼已經失效，請重新傳送";
			else
				$message = "驗證碼錯誤";
		}
		
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
	'USERNAME' => (isset($_SESSION['u_name']))?$_SESSION['u_name']:'',
	'USERPHONE' => (isset($_SESSION['ui_phone']))?$_SESSION['ui_phone']:'',
	'REGISTER_TITLE' => $register_title,
	'REGISTER_MESSAGE' => $message,
	'REGISTER_ADMIN' => $register_admin,
	'VERIFICATION_SUCCESS' => $verification_success,
));

?>