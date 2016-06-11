<?php
require_once('includes/general.php');

header("Content-Type:text/html; charset=utf-8");

$new_series = $_REQUEST["new_series"];
$new_id = $_REQUEST["new_id"];
$new_order = $_REQUEST["new_order"];

$sql = "INSERT INTO `series` (`s_id`, `order_num`, `name`) VALUES ('" .$new_id. "', '" .$new_order. "', '" .$new_series. "')";
$db->query($sql);
echo json_encode($sql, JSON_UNESCAPED_UNICODE);



?>
