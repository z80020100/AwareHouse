<?php

require_once('includes/general.php');
header("Content-Type:text/html; charset=utf-8");

$_HTML = '';

$template = $twig->loadTemplate('header.html');


$_HTML .= $template->render(array(
	'PAGE_TITLE' => $_PAGE_TITLE,
));


?>