<?php



require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");
	

//$template = new Mustache_Engine(array());
$template = $twig->loadTemplate('index.html');

/******************************************************************************************************
// test for listing related series, main, additional item
// ------
 
// List Series by order_num
$sql = "SELECT * FROM `series` ORDER BY `series`.`order_num` ASC ";
$result = $db->query($sql);
$num = $db->numrow($result);
while($series_data = $db->fetch_array($result)){

	echo '<h3>'. $series_data['name'] . '</h3>';
	
	// List the dishes in the series
	$sql = "SELECT * FROM `main` WHERE `s_id` = ". $series_data['s_id'] ." ORDER BY `main`.`order_num` ASC";
	$m_result = $db->query($sql);
	
	while($main_data = $db->fetch_array($m_result)){
		echo '<li>';
		
		echo 'm_id('.$main_data['m_id'].'):'.'name('.$main_data['name'].'):'.'price('.$main_data['price'].'):'.'at_id('.$main_data['at_id'].'):';
		
		//$sql = "SELECT * FROM `additional_type` WHERE `at_id` = ". $main_data['at_id'] ;
		//$at_data = $db->query_select_one($sql);   // Fetch directly : only one additional_type per main, no need to loop
		
		echo "additional_item(";
		// List the "Additional options" that are directly related to the dish
		$sql = "SELECT * FROM  `additional_item` WHERE `at_id` = ".$main_data['at_id'] ;
		$ai_result = $db->query($sql);
		while($ai_data = $db->fetch_array($ai_result)){
			echo "<i>". $ai_data['name'] ."</i>,";			
			
		}
		echo ")";
		
		
		if($main_data['required_option'] == true){
			// 1 dish <--> several required options 
			$sql = "SELECT * FROM `required_option` WHERE `m_id` = ".$main_data['m_id'];
			$ro_result = $db->query($sql);
			while($ro_data = $db->fetch_array($ro_result)){
				echo "<b>".$ro_data['name']."</b>";
				echo "(";
				// 1 required option <--> several item to choose
				$sql = "SELECT * FROM  `additional_item` WHERE `at_id` = ".$ro_data['at_id'] ;
				$ai_result = $db->query($sql);
				while($ai_data = $db->fetch_array($ai_result)){
					echo "<i>". $ai_data['name'] ."</i>,";			
				}
				echo ")";				
			}
			
		}
		else{
			echo "( noro )";
		}
		
		echo '</li>';
	}	
}
********************************************************************************************************/

/*
	INSERT INTO `orders` (`o_id`, `o_time`, `table_num`, `people_num`) VALUES (NULL, CURRENT_TIMESTAMP, '2', '1');
	INSERT INTO `share` (`sh_id`, `o_id`, `total`) VALUES (NULL, '1', '50');  // 50 should be summed from items and options
	INSERT INTO `share_item` (`sh-i_id`, `sh_id`, `m_id`, `quantity`) VALUES (NULL, '1', '2', '5');
	INSERT INTO `sh-i_ai` (`sh-i_ai_id`, `sh-i_id`, `ai_id`, `is_ro`) VALUES (NULL, '1', '3', '1'), (NULL, '1', '6', '1');


*/

not_login_redirect();

// List Series by order_num
$sql = "SELECT * FROM `series` ORDER BY `series`.`order_num` ASC ";
$result = $db->query($sql);
$num = $db->numrow($result);
$all_series = array();
while($series_data = $db->fetch_array($result)){
	//echo '<h3>'. $series_data['name'] . '</h3>';
	$snum = array_push( $all_series, $series_data )-1;
	
	// List the dishes in the series
	$sql = "SELECT * FROM `main` WHERE `s_id` = ". $series_data['s_id'] ." ORDER BY `main`.`order_num` ASC";
	$m_result = $db->query($sql);
	$all_main = array();
	while($main_data = $db->fetch_array($m_result)){
		$mnum = array_push($all_main, $main_data)-1;
		//echo '<li>';
		//echo 'm_id('.$main_data['m_id'].'):'.'name('.$main_data['name'].'):'.'price('.$main_data['price'].'):'.'at_id('.$main_data['at_id'].'):';
		
		//$sql = "SELECT * FROM `additional_type` WHERE `at_id` = ". $main_data['at_id'] ;
		//$at_data = $db->query_select_one($sql);   // Fetch directly : only one additional_type per main, no need to loop
		
		//echo "additional_item(";
		// List the "Additional options" that are directly related to the dish
		$sql = "SELECT * FROM  `additional_item` WHERE `at_id` = ".$main_data['at_id'] ;
		$ai_result = $db->query($sql);
		$all_ai = array();
		while($ai_data = $db->fetch_array($ai_result)){
		//	echo "<i>". $ai_data['name'] ."</i>,";			
			$ainum = array_push($all_ai, $ai_data)-1;
		}
		$all_main[$mnum]['ai'] = $all_ai;
		//echo ")";
		
		
		$all_ro = array();
		if($main_data['required_option'] == true){
			// 1 dish <--> several required options 
			$sql = "SELECT * FROM `required_option` WHERE `m_id` = ".$main_data['m_id'];
			$ro_result = $db->query($sql);
			$all_ro = array();
			while($ro_data = $db->fetch_array($ro_result)){
				$ronum = array_push($all_ro, $ro_data)-1;
				//echo "<b>".$ro_data['name']."</b>";
				//echo "(";
				// 1 required option <--> several item to choose
				$sql = "SELECT * FROM  `additional_item` WHERE `at_id` = ".$ro_data['at_id'] ;
				$ai_result = $db->query($sql);
				$all_ro_ai = array();
				while($ai_data = $db->fetch_array($ai_result)){
					$ro_ainum = array_push($all_ro_ai, $ai_data)-1;
					//echo "<i>". $ai_data['name'] ."</i>,";			
				}
				$all_ro[$ronum]['ai'] = $all_ro_ai;
				//echo ")";				
			}
		}
		else{
			//echo "( noro )";
		}
		$all_main[$mnum]['ro'] = $all_ro;
		
		//echo '</li>';
	}	
	$all_series[$snum]['main'] = $all_main;
}

if(is_admin())
	$admin_logined = 'admin';
else
	$admin_logined = '';

echo $template->render(array(
	'ADMIN_LOGIN' => $admin_logined,
	'all_series' => $all_series,
));




//echo $template->render('Hello, {{planet}}!', array('planet' => 'World'));


?>

