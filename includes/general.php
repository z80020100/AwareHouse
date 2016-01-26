<?php

/* include libraries **********************************************/

require_once ("dbclass.php");
require_once ("general_functions.php");

// Mustache template system
//require 'includes/Mustache/Autoloader.php';
//Mustache_Autoloader::register();

require_once dirname(__FILE__).'/Twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register(true);
$loader = new Twig_Loader_Filesystem('./templates/');
$twig = new Twig_Environment($loader, array(
    //'cache' => '/templates/cache/',
));

/******************************************************************/


session_start();
header("Content-Type:text/html; charset=utf-8");
/*if(isset($_SESSION['user_name']))
	echo $_SESSION['user_name'];
else
	echo "Stranger";*/

$db = new Db("localhost", "root" , "Mysqlgavidy9", "bfproj");





?>