<?php 

class Controller extends Database {

  public static function createView($viewName) {
    include_once 'views/' . $viewName . '.view.php';
    // static::doSomething();
  }
}
