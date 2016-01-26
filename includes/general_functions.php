<?php

/* general functions **********************************************/



/*
CANCEL 		: 	已取消
WAIT		:	等待製作中
MAKING		:	製作中
DONE		:	餐點完成
PAID		:	已付錢
ARCHIVE	:	已封存
*/

$GLOBALS['STATUS'] = array(
	'CANCEL', 
	'WAIT',
	'MAKING',
	'DONE',
//	'PAID',
	'ARCHIVE'
);

function statusUp( $cStatus){
	$kIndex = array_search( $cStatus, $GLOBALS['STATUS']);
	if($kIndex == sizeof($GLOBALS['STATUS'])-1)
		return $GLOBALS['STATUS'][ $kIndex ] ;
	return $GLOBALS['STATUS'][ $kIndex+1 ];
}

function statusDown( $cStatus){
	$kIndex = array_search( $cStatus, $GLOBALS['STATUS']);
	if($kIndex == 0)
		return $GLOBALS['STATUS'][ $kIndex ] ;
	return $GLOBALS['STATUS'][ $kIndex-1 ];
}



/*
function statusUp( $ cStatus ){

	switch( $ cStatus ){
		case 'CANCEL':
			$nextStatus = 'WAIT';
		break;
		case 'WAIT':
			$nextStatus = 'MAKING';
		break;
		case 'MAKING':
			$nextStatus = 'DONE';
		break;
		case 'DONE':
			$nextStatus = 'PAID';					
		break;
		case 'PAID':
			$nextStatus = 'ARCHIVE';
		break;
	}
	
	return $nextStatus;
}

function statusDown( $ cStatus ){

	switch( $ cStatus ){
		case 'WAIT':
			$nextStatus = 'CANCEL';
		break;
		case 'MAKING':
			$nextStatus = 'WAIT';
		break;
		case 'DONE':
			$nextStatus = 'MAKING';					
		break;
		case 'PAID':
			$nextStatus = 'DONE';
		break;
	}
	
	return cStatus;
}
*/


?>