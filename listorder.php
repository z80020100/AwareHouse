<?php

require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");



$login_error = false;
if(!isset($_SESSION['user_name'])){
//	header('location:login.php');
}


$template = $twig->loadTemplate('listorder.html');

/*
$sql = "SELECT * FROM `orders` ORDER BY `orders`.`o_time` DESC where `orders`.`status` = WAIT";
$result = $db->query($sql);
$num = $db->numrow($result);
$all_orders = array();
*/

echo $template->render(array(

));


?>