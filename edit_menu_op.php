<?php
require_once('includes/general.php');

header("Content-Type:text/html; charset=utf-8");

$action = $_REQUEST["action"];

$ro_arrays = array();
$at_arrays = array();
$ai_arrays = array();
$at_id_arrays = array();
/*
if($action == "read_ro")
{ 
	$read_sql = "SELECT * FROM `additional_type` WHERE `multiple_choice` = 0";
	$ro_result = $db->query($read_sql);
	while($ro_data = $db->fetch_array($ro_result)){
		array_push( $ro_arrays, $ro_data );
		//$ro_arrays[$ro_num]['required'] = $ro_data;
	}
	echo json_encode($ro_arrays, JSON_UNESCAPED_UNICODE);
}
else if($action == "read_detail")
{
	$at_id = $_REQUEST["at_id"];
	
	$read_sql = "SELECT * FROM `additional_item` WHERE `at_id` = " . $at_id;
	$ro_result = $db->query($read_sql);
	while($ro_data = $db->fetch_array($ro_result)){
		array_push( $ro_arrays, $ro_data );
		//$ro_arrays[$ro_num]['required'] = $ro_data;
	}
	echo json_encode($ro_arrays, JSON_UNESCAPED_UNICODE);
}

else if($action == "read_at")
{
	$mul_value = $_REQUEST["mul_value"];
	if($mul_value == "multi")
		$read_sql = "SELECT * FROM `additional_type` WHERE `multiple_choice` = 1";
	else
		$read_sql = "SELECT * FROM `additional_type` WHERE `multiple_choice` = 0";
	$at_result = $db->query($read_sql);
	while($at_data = $db->fetch_array($at_result)){
		array_push( $at_arrays, $at_data );
	}
	echo json_encode($at_arrays, JSON_UNESCAPED_UNICODE);
}

else if($action == "write_required_option")
{
	$read_sql = "SELECT MAX(at_id) FROM `additional_type`";
	$at_result = $db->query($read_sql);
	while($at_data = $db->fetch_array($at_result)){
		array_push( $at_arrays, $at_data );
	}
	$new_type = $_REQUEST["new_type"];
	$mul_type = $_REQUEST["mul_type"];
	if($mul_type == "single")
	{
		$write_sql = "INSERT INTO `additional_type` (`option_name`, `multiple_choice`) VALUES ('" .$new_type. "', '0')";
	}
	else if($mul_type == "multi")
	{
		$write_sql = "INSERT INTO `additional_type` (`option_name`, `multiple_choice`) VALUES ('" .$new_type. "', '1')";
	}		
	
	$db->query($write_sql);
	$new_at_id = $db->mysqli->insert_id; // 返回上次INSERT操作新增的ID
	
	echo json_encode($new_at_id, JSON_UNESCAPED_UNICODE); // 回傳新增的at_id
}

else if($action == "edit_ai")
{
	$data_type = $_REQUEST["data_type"];
	$data = $_REQUEST["data"];
	$ai_id = $_REQUEST["ai_id"];
	$write_sql = "UPDATE `additional_item` SET `$data_type` = '$data' WHERE `additional_item`.`ai_id` = $ai_id";
	$result = $db->query($write_sql); // 回傳操錯是否成功(true or false)
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "add_new_ai")
{
	$at_id = $_REQUEST["at_id"];

	$read_sql = "SELECT MAX(ai_id) FROM `additional_item` WHERE 1";
	$result = $db->query($read_sql);
	while($data = $db->fetch_array($result)){
		array_push( $ai_arrays, $data );
	}
		
	$write_sql = "INSERT INTO `additional_item` (`at_id`, `name`, `price`) VALUES ('$at_id', '未命名品項', '0')";
	$result = $db->query($write_sql);
	$new_ai_id = $db->mysqli->insert_id; // 返回上次INSERT操作新增的ID

	echo json_encode($new_ai_id, JSON_UNESCAPED_UNICODE);
}

else if($action == "write_main")
{
	$name = $_REQUEST["name"];
	$price = $_REQUEST["price"];
	$s_id = $_REQUEST["s_id"];
	$at_id = $_REQUEST["at_id"];
	$required_option = $_REQUEST["required_option"];
	
	$read_sql = "SELECT MAX(order_num) FROM `main` WHERE 1";
	$result = $db->query($read_sql);
	$order_array = array();
	while($data = $db->fetch_array($result)){
		array_push( $order_array, $data );
	}
	$max_order = $order_array[0]['MAX(order_num)'];
	if($max_order == NULL)
		$max_order = 0;
	else
		$max_order++;
	
	$write_sql = "INSERT INTO `main` (`name`, `price`, `s_id`, `at_id`, `required_option`, `order_num`) 
				  VALUES ('$name', '$price', '$s_id', '$at_id', '$required_option', $max_order)";
	$result = $db->query($write_sql);
	$new_main_id = $db->mysqli->insert_id;
	
	echo json_encode($new_main_id, JSON_UNESCAPED_UNICODE);
}

else if($action == "write_required_option_table")
{
	$m_id = $_REQUEST["m_id"];
	$at_id_array = $_REQUEST["at_id_array"];	
	
	for($i = 0; $i < count($at_id_array); $i++){
		$at_id = $at_id_array[$i];
		$write_sql = "INSERT INTO `required_option` (`m_id`, `at_id`) 
					  VALUES ('$m_id', '$at_id')";
		$result = $db->query($write_sql);
	}
		
	echo json_encode(count($at_id_array), JSON_UNESCAPED_UNICODE);
}

else if($action == "read_ro_for_m_id")
{
	$m_id = $_REQUEST["m_id"];
	
	$read_sql = "SELECT `at_id` FROM `required_option` WHERE `m_id` = $m_id";
	$result = $db->query($read_sql);
	while($data = $db->fetch_array($result)){
		array_push( $at_id_arrays, $data );
	}
	for($i = 0; $i < count($at_id_arrays); $i++){
		$read_sql = "SELECT * FROM `additional_type` WHERE `at_id` = " . $at_id_arrays[$i]['at_id'];
		$result = $db->query($read_sql);
		while($data = $db->fetch_array($result)){
			array_push( $at_arrays, $data );
		}
	}
		
	echo json_encode($at_arrays, JSON_UNESCAPED_UNICODE);
}

else if($action == "del_main")
{
	$m_id = $_REQUEST["m_id"];
	
	$write_sql = "DELETE FROM `main` WHERE `main`.`m_id` = $m_id";
	$result = $db->query($write_sql); // 回傳操錯是否成功(true or false)
	
	$write_sql = "DELETE FROM `required_option` WHERE `required_option`.`m_id` = $m_id";
	$result = $db->query($write_sql); // 回傳操錯是否成功(true or false)
	
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "edit_main_del_ro") // 先刪除所有與m_id相關之required_option，再以新增方式編輯
{
	$m_id = $_REQUEST["m_id"];
	$name = $_REQUEST["name"];
	$price = $_REQUEST["price"];
	$at_id = $_REQUEST["at_id"];
	$required_option = $_REQUEST["required_option"];
		
	$write_sql = "DELETE FROM `required_option` WHERE `required_option`.`m_id` = $m_id";
	$result = $db->query($write_sql); // 回傳操作是否成功(true or false)

	$write_sql = "UPDATE `main` SET `name` = '$name', `price` = $price, `at_id` = $at_id, `required_option` = $required_option. WHERE `main`.`m_id` = $m_id;";
	$result = $db->query($write_sql); // 回傳操作是否成功(true or false)
	
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}
*/
// New
 if($action == "add_series")
{
	$new_series = $_REQUEST["new_series"];
	$order_number = $_REQUEST["order_number"];

	$write_sql = "INSERT INTO `series` (`s_id`, `order_num`, `name`) VALUES (NULL, '$order_number', '$new_series')";
	$result = $db->query($write_sql);
	
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "edit_series")
{
	$series_text = $_REQUEST["series_text"];
	$s_id = $_REQUEST["s_id"];
	
	$write_sql = "UPDATE `series` SET `name` = '$series_text' WHERE `series`.`s_id` = $s_id";
	$result = $db->query($write_sql);
	
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "get_series")
{	
	$series_array = array();
	$read_sql = "SELECT * FROM `series` ORDER BY `order_num` ASC";
	$result = $db->query($read_sql);
	while($data = $db->fetch_array($result)){
		array_push( $series_array, $data );
	}
		
	echo json_encode($series_array, JSON_UNESCAPED_UNICODE);
}

else if($action == "get_add_type")
{	
	$add_type_array = array();
	$read_sql = "SELECT * FROM `additional_type`";
	$result = $db->query($read_sql);
	while($data = $db->fetch_array($result)){
		array_push( $add_type_array, $data );
	}
		
	echo json_encode($add_type_array, JSON_UNESCAPED_UNICODE);
}

else if($action == "get_add_data")
{	
	$at_id = $_REQUEST["at_id"];
	$add_data_array = array();
	$read_sql = "SELECT * FROM `additional_item` WHERE `at_id` = $at_id";
	$result = $db->query($read_sql);
	while($data = $db->fetch_array($result)){
		array_push( $add_data_array, $data );
	}
		
	echo json_encode($add_data_array, JSON_UNESCAPED_UNICODE);
}

else if($action == "edit_ai")
{	
	$ai_id = $_REQUEST["ai_id"];
	$new_ai_data = $_REQUEST["new_ai_data"];
	$edit_data = $_REQUEST["edit_data"];
	$write_sql = "UPDATE `additional_item` SET `$edit_data` = '$new_ai_data' WHERE `additional_item`.`ai_id` = $ai_id";
	$result = $db->query($write_sql);

	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "add_item")
{	

	$single_at_id = $_REQUEST["single_at_id"];
	$mul_at_id = $_REQUEST["mul_at_id"]; 
	$new_main_series = $_REQUEST["new_main_series"];
	$new_main_name = $_REQUEST["new_main_name"];
	$new_main_price = $_REQUEST["new_main_price"];
		
	if($single_at_id[0] == "0"){
		$has_ro = 0; // 是否有requied_option
	}
		
	else{
		$has_ro = 1;
	}
	
	$write_sql = "INSERT INTO `main` (`m_id`, `name`, `price`, `s_id`, `at_id`, `required_option`, `order_num`) VALUES (
		NULL, '$new_main_name', '$new_main_price', '$new_main_series', '$mul_at_id', '$has_ro', '0'
	)";
	$result = $db->query($write_sql);
	$new_m_id = $db->mysqli->insert_id;
	if($has_ro == 1){
		for($i = 0; $i < count($single_at_id); $i++){
			$at_id = $single_at_id[$i];
			$write_ro_sql = "INSERT INTO `required_option` (`ro_id`, `name`, `m_id`, `at_id`) VALUES (NULL, '', '$new_m_id', '$at_id')";
			$ro_result = $db->query($write_ro_sql);
		}
	}
	
	echo json_encode("", JSON_UNESCAPED_UNICODE);
}

else if($action == "add_additional_type"){
	$option_name = $_REQUEST["option_name"];
	$multiple_choice = $_REQUEST["multiple_choice"];
	
	$write_sql = "INSERT INTO `additional_type` (`at_id`, `option_name`, `multiple_choice`) VALUES (NULL, '$option_name ', '$multiple_choice')";
	$result = $db->query($write_sql);
	
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "add_additional_item"){
	$at_id = $_REQUEST["at_id"];
	$name = $_REQUEST["name"];
	$price = $_REQUEST["price"];
	
	$write_sql = "INSERT INTO `additional_item` (`ai_id`, `at_id`, `name`, `price`) VALUES (NULL, '$at_id', '$name', '$price');";
	$result = $db->query($write_sql);
	
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "del_additional_item"){
	$ai_id = $_REQUEST["ai_id"];
	
	$write_sql = "DELETE FROM `additional_item` WHERE `additional_item`.`ai_id` = $ai_id";
	$result = $db->query($write_sql);
	
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "del_additional_type"){
	$at_id = $_REQUEST["at_id"];
	
	$write_sql = "DELETE FROM `additional_type` WHERE `additional_type`.`at_id` = $at_id";
	$result = $db->query($write_sql); // 刪除細項種類
	
	$write_sql = "DELETE FROM `additional_item` WHERE `additional_item`.`at_id` = $at_id";
	$result = $db->query($write_sql); // 刪除該細項種類中所有細項
	
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "edit_at_name"){
	$at_id = $_REQUEST["at_id"];
	$new_at_name = $_REQUEST["new_at_name"];
	
	$write_sql = "UPDATE `additional_type` SET `option_name` = '$new_at_name' WHERE `additional_type`.`at_id` = $at_id";
	$result = $db->query($write_sql);

	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "get_ro_for_main"){
	$m_id = $_REQUEST["m_id"];
	$ro_data_array = array();
	
	$read_sql = "SELECT * FROM `required_option` WHERE `m_id` = $m_id";
	$result = $db->query($read_sql);
	while($data = $db->fetch_array($result)){
		array_push($ro_data_array, $data);
	}
	
	echo json_encode($ro_data_array, JSON_UNESCAPED_UNICODE);
}

else if($action == "del_item"){
	$m_id = $_REQUEST["m_id"];
	
	$write_sql = "DELETE FROM `main` WHERE `main`.`m_id` = $m_id";
	$result = $db->query($write_sql);
	
	$write_sql = "DELETE FROM `required_option` WHERE `required_option`.`m_id` = $m_id";
	$result = $db->query($write_sql);

	echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

else if($action == "edit_item")
{	
	$m_id = $_REQUEST["m_id"];
	$single_at_id = $_REQUEST["single_at_id"];
	$mul_at_id = $_REQUEST["mul_at_id"]; 
	$new_main_series = $_REQUEST["new_main_series"];
	$new_main_name = $_REQUEST["new_main_name"];
	$new_main_price = $_REQUEST["new_main_price"];
	
	$write_sql = "DELETE FROM `required_option` WHERE `required_option`.`m_id` = $m_id";
	$result = $db->query($write_sql);
		
	if($single_at_id[0] == "0"){
		$has_ro = 0; // 是否有requied_option
	}
		
	else{
		$has_ro = 1;
	}
	
	$write_sql = "UPDATE `main` SET `name` = '$new_main_name', `price` = '$new_main_price', `s_id` = '$new_main_series', `at_id` = '$mul_at_id', `required_option` = '$has_ro', `order_num` = '0' WHERE `main`.`m_id` = $m_id;";
	$result = $db->query($write_sql);
	$new_m_id = $m_id;
	if($has_ro == 1){
		for($i = 0; $i < count($single_at_id); $i++){
			$at_id = $single_at_id[$i];
			$write_ro_sql = "INSERT INTO `required_option` (`ro_id`, `name`, `m_id`, `at_id`) VALUES (NULL, '', '$new_m_id', '$at_id')";
			$ro_result = $db->query($write_ro_sql);
		}
	}
	
	echo json_encode("", JSON_UNESCAPED_UNICODE);
}

else if($action == "del_series"){
	$s_id = $_REQUEST["s_id"];
	$main_data_array = array();
	
	$read_sql = "SELECT * FROM `main` WHERE `s_id` = $s_id";
	$result = $db->query($read_sql);
	while($data = $db->fetch_array($result)){
		array_push($main_data_array, $data);
	}
	
	
	for($i = 0; $i < count($main_data_array); $i++){
		$m_id = $main_data_array[$i]['m_id'];
		$write_sql = "DELETE FROM `main` WHERE `main`.`m_id` = $m_id";
		$result = $db->query($write_sql);
	
		$write_sql = "DELETE FROM `required_option` WHERE `required_option`.`m_id` = $m_id";
		$result = $db->query($write_sql);
	}
	
	
	$write_sql = "DELETE FROM `series` WHERE `series`.`s_id` = $s_id";
	$result = $db->query($write_sql);

	echo json_encode(count($main_data_array), JSON_UNESCAPED_UNICODE);
}

?>
