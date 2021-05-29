<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style/style.css">
  <!-- Font -->
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet"> 
  
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
  
  <script type="text/javascript" defer src="js/main.js"></script>
  <script type="module" defer src="js/highlight/controller.js"></script>
  <script type="module" defer src="js/carousel/controller.js"></script>
  <script type="module" defer src="js/drinks/controller.js"></script>
  <title>The Tipsy Mixer</title>
</head>
<body>
  <main>
  
  <header>

    <div class="mobile-menu-wrapper">
      <i class="fas fa-bars" data-menu="toggle"></i>
    </div>
    <div class="menu-btn-container">
      <i class="far fa-times-circle" data-menu="toggle"></i>
      <ul>
        <li><button class="mobile-scroll" data-btn="choice">Tipsy's Choice</button></li>
        <li><button class="mobile-scroll" data-btn="faves">Lounge Faves</button></li>
        <li><button class="mobile-scroll" data-btn="all">All Drinks</button></li>
      </ul>
    </div>


    <div id="hero">
      <img class="img-hero" src="assets/cocktail-glasses.jpg" alt="Cocktail Glasses Background">
      <div class="overlay"></div>
      <a href="/" class="logo-link">
        <img src="./assets/tipsy-logo.png" class="logo" alt="The Tipsy Mixer Logo">
      </a>
    </div>


    <nav>
      <ul>
        <li><button class="scroll" data-btn="choice">Tipsy's Choice</button></li>
        <li><button class="scroll" data-btn="faves">Lounge Faves</button></li>
        <li><button class="scroll" data-btn="all">All Drinks</button></li>
      </ul>
    </nav>


  </header>

  <div class="modal-wrapper">
    <div class="overlay"></div>
    <div class="modal">
      <h2><!-- DRINK TITLE GOES HERE --></h2>
      
    </div>
  </div>