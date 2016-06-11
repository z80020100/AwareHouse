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

function user_create($username, $userpass ,$verification, $phone_info){
	global $db;

	if(!is_admin()){		
		$sql = "SELECT * FROM `config` WHERE `name` = 'verification'";
		$Qver = $db->query_select_one($sql);
		
		if($verification != $Qver['value']){
			return false;
		}
	}

	// hash("sha256", "test1234");
	$sql = "INSERT INTO `user` (`u_id`, `u_name`, `u_pass`, `admin`) VALUES (NULL, '".$username."', '".hash("sha256",$userpass)."', '0');";
	if( !$result = $db->query($sql) ){
		
		die('error gf_uc_1');
	}
	
	$sql = "INSERT INTO `user_info` (`ui_id`, `u_id`, `ui_advsecurity`, `ui_phone`) VALUES (NULL, '".$db->mysqli->insert_id."', '0', '".$phone_info."')";
	if( !$result = $db->query($sql) ){
		//die($sql);
		die('error gf_uc_2');
	}	
	return true;
	
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
				$_SESSION['admin'] = $Quser['admin'];
				
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
				$_SESSION['admin'] = $Quser['admin'];
			
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
	if( $_SESSION['admin'] == true)
		return true;
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