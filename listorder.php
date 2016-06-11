<?php

require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");


$template = $twig->loadTemplate('listorder.html');

/*
$sql = "SELECT * FROM `orders` ORDER BY `orders`.`o_time` DESC where `orders`.`status` = WAIT";
$result = $db->query($sql);
$num = $db->numrow($result);
$all_orders = array();
*/

not_admin_redirect();

echo $template->render(array(

));


?>