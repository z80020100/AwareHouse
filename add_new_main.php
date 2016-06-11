<?php
require_once('includes/general.php');

header("Content-Type:text/html; charset=utf-8");

$m_id = $_REQUEST["m_id"];
$name = $_REQUEST["name"];
$price = $_REQUEST["price"];
$s_id = $_REQUEST["s_id"];
$at_id = $_REQUEST["at_id"];
$required_option = $_REQUEST["required_option"];
$order_num = $_REQUEST["order_num"];

// INSERT INTO `main` (`m_id`, `name`, `price`, `s_id`, `at_id`, `required_option`, `order_num`) VALUES ('4', '測試', '100', '1', '0', '0', '1');

$main_sql = "INSERT INTO 
	`main` (`m_id`, `name`, `price`, `s_id`, `at_id`, `required_option`, `order_num`) 
	VALUES ('" .$m_id. "', '" .$name. "', '" .$price. "', '" .$s_id. "', '" .$at_id. "', '" .$required_option. "', '" .$order_num. "')";

	
$db->query($main_sql);
echo json_encode($main_sql, JSON_UNESCAPED_UNICODE);



?>
