<?php
require_once('includes/general.php');

$type = $_REQUEST['request']['type'];
$start_time = $_REQUEST['request']['time'][0];
$end_time = $_REQUEST['request']['time'][1];

switch ($type) {
  case "sales":
    $sql = "SELECT * FROM `orders` WHERE `o_time` > '".$start_time."' AND `o_time` < '".$end_time."' AND `status` != '".$GLOBALS['STATUS'][0]."' ";
    $result = $db->query($sql);

    $sales = array();
    $sales[0] = [['台灣T',17.73],['美國A',29.95],['K韓國',32.14],['J日本',17.68]];
    $sales[1] = [['V越南',24.26],['A阿魯巴',17.48],['關島K',10.01],['澳門A',8.84]];

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