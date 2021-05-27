<?php 

header('
Access-Control-Allow-Origin: https://www.thecocktaildb.com/');

spl_autoload_register('myAutoloader');

function myAutoloader($className) {
  if(file_exists('classes/' . $className . '.class.php')) {
    require_once 'classes/' . $className . '.class.php';
  } else if (file_exists('controllers/' . $className . '.controller.php')) {
    require_once 'controllers/' . $className . '.controller.php';
  }
}

require 'views/partials/Header.php';

require_once('Routes.php');

require 'views/partials/Footer.php';