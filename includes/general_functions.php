<?php

/* general functions **********************************************/



/*
CANCEL 		: 	已取消
WAIT		:	等待製作中
MAKING		:	製作中
DONE		:	餐點完成
PAID		:	已付錢
ARCHIVE	:	已封存
*/

/*
	functions to control order status
*/

$GLOBALS['STATUS'] = array(
	'CANCEL', 
	'WAIT',
	'MAKING',
	'DONE',
//	'PAID',
	'ARCHIVE'
);

function statusUp( $cStatus){
	$kIndex = array_search( $cStatus, $GLOBALS['STATUS']);
	if($kIndex == sizeof($GLOBALS['STATUS'])-1)
		return $GLOBALS['STATUS'][ $kIndex ] ;
	return $GLOBALS['STATUS'][ $kIndex+1 ];
}

function statusDown( $cStatus){
	$kIndex = array_search( $cStatus, $GLOBALS['STATUS']);
	if($kIndex == 0)
		return $GLOBALS['STATUS'][ $kIndex ] ;
	return $GLOBALS['STATUS'][ $kIndex-1 ];
}

/*
	User Login & Admin Login functions
	
	For security reasons, the login process is designed as follow:
	
	(1) Must be under SSL
	
	(2) 
	Client side:  send plaintext password to server
	Server side: sha256(password)

*/

function user_create($username, $userpass, $phone_info){
	global $db;

	if(!is_admin()){		
		/*$sql = "SELECT * FROM `config` WHERE `name` = 'verification'";
		$Qver = $db->query_select_one($sql);
		
		if($verification != $Qver['value']){
			return false;
		}*/
		
		//$sql = "SELECT * FROM `user_register` WHERE `u_id` = 'code'"
		
	}
	
	$sql = "SELECT * FROM `user` WHERE `u_name` = '".$username."' ";
	$Quser = $db->query_select_one($sql);
	if( $Quser ){
		return -1;
	}

	// hash("sha256", "test1234");
	$sql = "INSERT INTO `user` (`u_id`, `u_name`, `u_pass`, `u_type`) VALUES (NULL, '".$username."', '".hash("sha256",$userpass)."', '0');";
	if( !$result = $db->query($sql) ){
		
		die('error gf_uc_1<br>');
	}
	
	$sql = "INSERT INTO `user_info` (`ui_id`, `u_id`, `ui_advsecurity`, `ui_phone`) VALUES (NULL, '".$db->mysqli->insert_id."', '0', '".$phone_info."')";
	if( !$result = $db->query($sql) ){
		//die($sql);
		die('error gf_uc_2');
	}	
	return 1;
	
}

function user_vercode( $updateAnyway = false){
	global $db;

	/*
	$sql = "SELECT * FROM `config` WHERE `name` = 'verification'";
	$Qver = $db->query_select_one($sql);

	$sql = "SELECT * FROM `config` WHERE `name` = 'verification_time'";
	$Qver_t = $db->query_select_one($sql);
	
	if( $Qver_t['value']  < time() ){
		$sql = "UPDATE `config` SET `value` = '".(time()+30)."' WHERE `config`.`name` = 'verification_time'";
		$db->query($sql);
		
		$new_hash = substr( hash("sha256", $Qver['value']) , 0, 4);
		
		$sql = "UPDATE `config` SET `value` = '".$new_hash."' WHERE `config`.`name` = 'verification' ";
		$db->query($sql);
		
		$Qver['value'] = $new_hash;
	}*/

	$hashme = $_SESSION['u_name'].' '.$_SESSION['u_id'].' '.time().' '.rand(); 
	$new_hash = substr( hash("sha256", $hashme) , 0, 4);
	
	$sql = "SELECT * FROM `user_register` WHERE `u_id` = '".$_SESSION['u_id']."'";
	$Quver = $db->query_select_one($sql);
	
	$returnme = array(
		'hash' => '',
		'updated' => $updateAnyway
	);
	
	if( !$Quver ){
		$sql = "INSERT INTO `user_register` (`u_id`, `code`, `expiration`) VALUES ('".$_SESSION['u_id']."', '".$new_hash."', '".(time()+60)."')";
		$db->query($sql);
		
		$returnme['hash'] = $new_hash;
		$returnme['updated'] = true;		
		return $returnme;
	}
	else{
		if(time() > $Quver['expiration'] || $updateAnyway == true)
		{
			$sql = "UPDATE `user_register` SET `code` = '".$new_hash."', `expiration` = '".(time()+60)."' WHERE `user_register`.`u_id` = '".$_SESSION['u_id']."'";
			$db->query($sql);
			$returnme['hash'] = $new_hash;
			$returnme['updated'] = true;		
			return $returnme;
		}
		else{
			$returnme['hash'] = $Quver['code'];
			$returnme['updated'] = false;		
			return $returnme;
		}
	}
}

function send_sms($dst, $msg){
	$smsURL = "http://202.39.48.216/kotsmsapi-1.php";

	$post = array(
		'username' => 'awarehouse',
		'password' => 'm198916',
		'dstaddr' => $dst,
		'smbody' => iconv("UTF-8", "big5", $msg),
		'dlvtime' => 0, // instantly
	);

	$ch = curl_init();

	$opt = array(
		CURLOPT_URL => $smsURL,
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => $post,
	);

	curl_setopt_array($ch, $opt);
	curl_exec($ch);
	curl_close($ch);	
	
}

function user_login($username, $password, $phone_info){
	global $db;
	
	$sql = "SELECT * FROM `user` WHERE `u_name` = '".$username."' ";
	$Quser = $db->query_select_one($sql);

	if( $Quser ){
		$sql = "SELECT * FROM `user_info` WHERE `u_id` = ".$Quser['u_id'].";";
		$Quser_info = $db->query_select_one($sql);
		
		if($Quser_info['ui_advsecurity'] == 1){ 
			// if user enabled advanced security --> check password hash
			if($Quser['u_pass'] == hash("sha256", $password) ){

				$_SESSION['u_name'] = $Quser['u_name'];
				$_SESSION['u_id'] = $Quser['u_id'];
				$_SESSION['admin'] = ($Quser['u_type'] == 2);
				$_SESSION['u_type'] = $Quser['u_type'];
				
				$_SESSION['ui_phone'] = $Quser_info['ui_phone'];
				return true;
			}
			else{
//				echo"yo";
				return false;
			}
		}
		else{
			// if user disabled advanced security --> check info match --> using phone
			if($Quser_info['ui_phone'] == $phone_info){

				$_SESSION['u_name'] = $Quser['u_name'];
				$_SESSION['u_id'] = $Quser['u_id'];
				$_SESSION['admin'] = ($Quser['u_type'] == 2);
				$_SESSION['u_type'] = $Quser['u_type'];

				$_SESSION['ui_phone'] = $Quser_info['ui_phone'];
				return true;
			}
			else{
//				echo"yo";
				return false;
			}
		}
	}
	else
		return false;
}

function is_admin(){
	if(isset($_SESSION['admin'])){
		if( $_SESSION['admin'] == true)
			return true;
		else
			return false;		
	}
	else
		return false;
}

function not_admin_redirect(){
	if(!is_admin())
		header("location:login.php");
}

function not_login_redirect(){
	if( !isset($_SESSION['u_name'])){
		header("location:login.php");
	} 
}


?>