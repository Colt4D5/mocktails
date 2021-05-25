<?php

// include 'classes/Route.php';

Route::set('/', function() {
  Index::createView('Index');
});

Route::set('/about-us', function() {
  AboutUs::createView('AboutUs');
});

Route::set('/contact-us', function() {
  ContactUs::createView('ContactUs');
});