<?php
require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");

$template = $twig->loadTemplate('edit_menu.html');

// List Series by order_num
$sql = "SELECT * FROM `series` ORDER BY `series`.`order_num` ASC "; // query指令
$result = $db->query($sql); // query結果

$all_series = array(); // 要傳給template的整個陣列
while($series_data = $db->fetch_array($result)){
	$series_number = array_push( $all_series, $series_data )-1;
	
	$sql = "SELECT * FROM `main` WHERE `s_id` = ". $series_data['s_id'] ." ORDER BY `main`.`order_num` ASC";
	$m_result = $db->query($sql);
	
	$all_main = array();
	while($main_data = $db->fetch_array($m_result)){
		$main_number = array_push( $all_main, $main_data )-1;
	}
	$all_series[$series_number]['main'] = $all_main;
}



echo $template->render(array(
		'Edit' => '編輯菜單',
		'all_series' => $all_series,
		)
	)

?>