<?php
require_once('includes/general.php');

function itemCompare($a,$b){
    if ($a['s_id'] > $b['s_id'])
        return 1;
    else if ($a['s_id'] < $b['s_id'])
        return -1;

    if ($a['m_id'] > $b['m_id'])
        return 1;
    else if ($a['m_id'] < $b['m_id'])
        return -1;

    sort($a['RO_array']);
    sort($b['RO_array']);
    if ($a['RO_array'] > $b['RO_array'])
        return 1;
    else if ($a['RO_array'] < $b['RO_array'])
        return -1;

    sort($a['AI_array']);
    sort($b['AI_array']);
    if ($a['AI_array'] > $b['AI_array'])
        return 1;
    else if ($a['AI_array'] < $b['AI_array'])
        return -1;

    return 0;
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
function getOrderInfo($db, $start_time, $end_time) {
    $sql = "SELECT * FROM `orders` WHERE `o_time` >= '".$start_time."' AND `o_time` <= '".$end_time."' AND `status` != '".$GLOBALS['STATUS'][0]."' ";
    $result = $db->query($sql);
    $order_info = array();
    while($order = $db->fetch_array($result)){
        $sql = "SELECT * FROM `share` WHERE `o_id` = ".$order['o_id'] ;
        $s_result = $db->query($sql);
        $share_info = array();
        $order_total = 0;
        while($share = $db->fetch_array($s_result)){
            $sql = "SELECT * FROM `share_item` WHERE `sh_id` = ".$share['sh_id'];
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
                $outItem['name']        =   $main['name'];
                $outItem['main_price']  =   $main['price'];
                $outItem['m_id']        =   $main['m_id'];
                $outItem['s_id']        =   $main['s_id'];
                $outItem['quantity']        =   $item['quantity'];
                $outItem['comment']         =   $item['comment'];
                $outItem['RO_array']    =   $ro_info;
                $outItem['AI_array']        =   $ai_info;

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

    return $order_info;
}

function getMenu($db) {
    $sql = "SELECT * FROM `main`";
    $result = $db->query($sql);
    $menu = array();
    while ($menu_item = $db->fetch_array($result)) {
        $menu[$menu_item['name']] = 0;
    }

    return $menu;
}

$type = $_REQUEST['request']['type'];
$start_time = $_REQUEST['request']['time'][0];
$end_time = $_REQUEST['request']['time'][1];

switch ($type) {
  case "sales":
    $sales = array();
    // $sales[0] = array('台灣T' => 17.73, '美國A' => 29.95, 'K韓國'=> 32.14, 'J日本' => 17.68);
    // $sales[1] = array('V越南' => 24.26, 'A阿魯巴' => 17.48, '關島K' => 10.01, '澳門A' => 8.84);

    // //GET THE order_info FROM DATABASE
    $order_info = getOrderInfo($db, $start_time, $end_time);

    // //GET THE WHOLE menu FROM THE DATABASE
    $menu = getMenu($db);

    $sales[0] = $menu;
    $sales[1] = $order_info;

    echo json_encode($sales, JSON_UNESCAPED_UNICODE);
    break;

  case "orders":
    $time = array();
    $shift_start = 4;
    $shift_end = 13;
    // for ($i = 0; $i < 30; $i++) {
    //   array_push($time, rand($shift_start, $shift_end));
    // }
    $orders = getOrderInfo($db, $start_time, $end_time);
    $orders_size = count($orders);
    for ($i = 0; $i < $orders_size; $i++) {
        $t_1 = explode(" ", $orders[$i]['o_time']);
        $t_2 = explode(":", $t_1[1]);
        for ($j = 0; $j < count($orders[$i]['share_array']); $j++) {
            array_push($time, $t_2[0]);
        }
    }

    echo json_encode($time, JSON_UNESCAPED_UNICODE);
    break;

  case "menu":
    $menu = getMenu($db);
    $orders = getOrderInfo($db, $start_time, $end_time);
    $orders_size = count($orders);
    for ($i = 0; $i < $orders_size; $i++) {
        $item_array = $orders[$i]['summary_array'];
        $item_array_size = count($item_array);
        for ($j = 0; $j < $item_array_size; $j++) {
            $menu[$item_array[$j]['name']]++;
        }
    }

    $ret = array();
    foreach ($menu as $key => $value) {
        $tmp = array('name' => $key, 'quantity' => $value);
        array_push($ret, $tmp);
    }

    echo json_encode($ret, JSON_UNESCAPED_UNICODE);
    break;
}
?>