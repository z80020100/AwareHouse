<?php
require_once('includes/general.php');

function getOrderInfo($start_time, $end_time) {
    $sql = "SELECT * FROM `orders` WHERE `o_time` > '".$start_time."' AND `o_time` < '".$end_time."' AND `status` != '".$GLOBALS['STATUS'][0]."' ";
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

function getMenu() {
    $sql = "SELECT * FROM `main`";
    $result = $db->query($sql);
    $menu = array();
    while ($menu_item = $db->fetch_array($result)) {
        $item = array();
        $item[$menu_item['name']] = 0;
        array_push($menu, $item);
    }

    return $menu;
}

$type = $_REQUEST['request']['type'];
$start_time = $_REQUEST['request']['time'][0];
$end_time = $_REQUEST['request']['time'][1];

switch ($type) {
  case "sales":
    $sales = array();
    $sales[0] = array('台灣T' => 17.73, '美國A' => 29.95, 'K韓國'=> 32.14, 'J日本' => 17.68);
    $sales[1] = array('V越南' => 24.26, 'A阿魯巴' => 17.48, '關島K' => 10.01, '澳門A' => 8.84);

    // //GET THE order_info FROM DATABASE
    // $order_info = getOrderInfo($start_time, $end_time);

    // //GET THE WHOLE menu FROM THE DATABASE
    // $menu = getMenu();

    // $sales[0] = $menu;
    // $sales[1] = $order_info;

    echo json_encode($sales, JSON_UNESCAPED_UNICODE);
    break;

  case "orders":
    $time = array();
    $shift_start = 4;
    $shift_end = 13;
    for ($i = 0; $i < 30; $i++) {
      array_push($time, rand($shift_start, $shift_end));
    }

    echo json_encode($time, JSON_UNESCAPED_UNICODE);
    break;

  case "menu":
    $name = array('apple', 'banana', 'cake', 'dessert');
    $size = count($name);
    $ret = array();
    for ($i = 0; $i < 10; $i++) {
      array_push($ret, $name[rand(0, $size-1)]);
    }

    echo json_encode($ret, JSON_UNESCAPED_UNICODE);
    break;
}
?>