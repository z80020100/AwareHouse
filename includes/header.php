<?php

require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");

$_HTML = '';

$template = $twig->loadTemplate('header.html');

if(is_admin()){
	$_USER_IDENTITY = 'admin';
}
elseif(is_login()){
	$_USER_IDENTITY = 'member';
}
else{
	$_USER_IDENTITY = 'guest';
}

if(!isset($all_series))
	$all_series = array();


$_HTML .= $template->render(array(
	'PAGE_TITLE' => $_PAGE_TITLE,
	'USER_IDENTITY' => $_USER_IDENTITY,
	'all_series' => $all_series,
));


?>