<?php

require_once('includes/general.php');


//  SELECT * FROM `orders` WHERE `o_time` >= FROM_UNIXTIME(0) AND `status` != 'PAID'


//
//		itemCompare 用來對 item進行排序
//
//
function itemCompare($a,$b){
	if($a['s_id'] > $b['s_id'])
		return 1;
	elseif ($a['s_id'] < $b['s_id'])
		return -1;
	else{
		if($a['m_id'] > $b['m_id'])
			return 1;
		elseif($a['m_id'] < $b['m_id'])
			return -1;
		else{
			sort($a['RO_array']);
			sort($b['RO_array']);
			if($a['RO_array'] > $b['RO_array'])
				return 1;
			elseif($a['RO_array'] < $b['RO_array'])
				return -1;
			else{
				sort($a['AI_array']);
				sort($b['AI_array']);
				if($a['AI_array'] > $b['AI_array'])
					return 1;
				elseif($a['AI_array'] < $b['AI_array'])
					return -1;
				else{
					return 0;
				}
			}
		}
	}
}

function makeSummary($share_array){
	$all_items = array();
	foreach ($share_array as $share){
		$all_items = array_merge($all_items, $share['items_array']);
	}
	usort($all_items, "itemCompare");
	
	$i = -1;
	$sum_array = array();
	foreach($all_items as $item){
		if($i == -1){
			array_push($sum_array, $item);
			$i++;
		}
		else{
			if( itemCompare($sum_array[$i], $item) == 0){
				$sum_array[$i]['quantity'] += $item['quantity']; 
			}
			else{
				array_push($sum_array, $item);
				$i++;
			}
		}
	}
	
	return $sum_array;
	
}


$reqType = $_REQUEST['request']['type'];

switch($reqType){
	case "refresh":
	/*********************************************************************************
	
			老闆端讀取未完成的 Order
			由前端傳來時間，傳回該時間之後的所有未完成的單子 ( `status` != 'PAID' )
			並以makeSummary函式把原本小單型式的Item進行合併
			
	*********************************************************************************/
	$refresh_time = $_REQUEST['request']['time'];
	//echo $refresh_time;
	//1900-01-01 00:00:00
	//
	//echo $sql . "\nyoooo\n";
	
	if($_REQUEST['request']['fresh'] == 'true'){
		$sql = "SELECT * FROM `orders` WHERE `o_utime` > '".$refresh_time."' AND `status` != '".$GLOBALS['STATUS'][0]."' AND `status` != '".$GLOBALS['STATUS'][(sizeof($GLOBALS['STATUS'])-1)]."' ";
	}
	else
		$sql = "SELECT * FROM `orders` WHERE `o_utime` > '".$refresh_time."' ";
	
	$result = $db->query($sql);
	$order_info = array();
	//$order_info[0] = $_REQUEST['request']['fresh'];
	while($order = $db->fetch_array($result)){
		//echo '<h3>'. $series_data['name'] . '</h3>';
		
		//if($order['o_estimate_time'] == $order['o_time'])  {
			// 代表老闆尚未設定等候時間(預設值為Current_time), 因此傳送NULL讓js處理
		if( !isset($order['o_estimate_time']) ){			
			$order['o_estimate_time'] = 'NULL';
		}
		$sql = "SELECT * FROM `share` WHERE `o_id` = ".$order['o_id'] ;
		//echo $sql . "\nyoooo\n";
		$s_result = $db->query($sql);
		$share_info = array();
		$order_total = 0;
		while($share = $db->fetch_array($s_result)){
			$sql = "SELECT * FROM `share_item` WHERE `sh_id` = ".$share['sh_id'];
			//echo $sql . "\nyoooo\n";
			$sh_i_result = $db->query($sql);
			$item_info = array();
			$counting_total = 0;
			while($item = $db->fetch_array($sh_i_result)){
				
				$sql = "SELECT * FROM `main` WHERE `m_id` = ".$item['m_id'];
				$m_result = $db->query($sql);
				$main = $db->fetch_array($m_result);
				
				
				// Requirement Option
				$sql = "SELECT * FROM `sh-i_ai` WHERE `sh-i_id` = ".$item['sh-i_id']." AND `is_ro` = 1 ";
				$sh_i_ai_result = $db->query($sql);
				$ro_info = array();
				while($sh_i_ai = $db->fetch_array($sh_i_ai_result)){
					$sql = "SELECT * FROM `additional_item` WHERE `ai_id` = ".$sh_i_ai['ai_id'];
					$ro_result = $db->query($sql);
					$ro = $db->fetch_array($ro_result);
					
					$outRo = array();
					$outRo['name'] = $ro['name'];
					$outRo['price'] = $ro['price'];
					
					// Counting price
					$counting_total += $ro['price'];
					array_push($ro_info, $outRo);
				}
				// Additional Option
				$sql = "SELECT * FROM `sh-i_ai` WHERE `sh-i_id` = ".$item['sh-i_id']." AND `is_ro` = 0 ";
				$sh_i_ai_result = $db->query($sql);
				$ai_info = array();
				while($sh_i_ai = $db->fetch_array($sh_i_ai_result)){
					$sql = "SELECT * FROM `additional_item` WHERE `ai_id` = ".$sh_i_ai['ai_id'];
					$ai_result = $db->query($sql);
					$ai = $db->fetch_array($ai_result);

					$outAi = array();
					$outAi['name'] = $ai['name'];
					$outAi['price'] = $ai['price'];					
					// Counting price
					$counting_total += $ai['price'];
					array_push($ai_info, $outAi);
				}
				$counting_total += $main['price'];
				$counting_total = $counting_total * $item['quantity'];
				
				$outItem = array();
				$outItem['name'] 		= 	$main['name'];
				$outItem['main_price'] 	= 	$main['price'];
				$outItem['m_id'] 		= 	$main['m_id'];
				$outItem['s_id'] 		= 	$main['s_id'];
				$outItem['quantity'] 		= 	$item['quantity'];
				$outItem['comment'] 		= 	$item['comment'];
				$outItem['RO_array'] 	= 	$ro_info;
				$outItem['AI_array'] 		= 	$ai_info;
				
				array_push($item_info, $outItem);
			}
			$outShare = array();
			$outShare['total'] = $counting_total;
			$outShare['items_array'] = $item_info;
			$order_total +=  $counting_total;
			array_push($share_info, $outShare);
		}
		$outOrder = $order;
		$outOrder['share_array'] = $share_info;
		$outOrder['summary_array'] = makeSummary($share_info);
		$outOrder['total'] = $order_total ;
		array_push( $order_info, $outOrder );
	}
	echo json_encode($order_info,JSON_UNESCAPED_UNICODE);
	break;
	case "updateOrderStatus":
		if($_REQUEST['request']['swipe'] == 'right'){
			$nextStatus = statusUp($_REQUEST['request']['current_status']);
			
		}
		else if($_REQUEST['request']['swipe'] == 'left'){
			$nextStatus = statusDown($_REQUEST['request']['current_status']);
		}
		$sql = "UPDATE `orders` SET `status` = '".$nextStatus."' WHERE `orders`.`o_id` = ".$_REQUEST['request']['oid'].";";
		$update_result = $db->query($sql);
		
		echo  json_encode($nextStatus, JSON_UNESCAPED_UNICODE);
	break;
	case "updateOrderEstimate":
		$sql = "SELECT * FROM `orders` WHERE `orders`.`o_id` = ".$_REQUEST['request']['oid'].";";
		$order = $db->query_select_one($sql);
		
		if( isset($order['o_estimate_time'] ) ){
			$sql = "UPDATE `orders` SET `o_estimate_time` = ADDTIME( `o_estimate_time`   ,'0:".$_REQUEST['request']['addMIN'].":0') WHERE `orders`.`o_id` = ".$_REQUEST['request']['oid'].";";
			$update_result = $db->query($sql);
		}
		else{
			$sql = "UPDATE `orders` SET `o_estimate_time` = ADDTIME( NOW()   ,'0:".$_REQUEST['request']['addMIN'].":0') WHERE `orders`.`o_id` = ".$_REQUEST['request']['oid'].";";
			$update_result = $db->query($sql);
		}
		echo "ok";
		
	break;
}

//print_r($order_info);



?>