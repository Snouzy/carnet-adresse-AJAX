<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <title><?php if(isset($pageTitle)) echo $pageTitle?></title>
    <link rel="apple-touch-icon" sizes="57x57" href="public/img/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="public/img/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="public/img/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="public/img/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="public/img/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="public/img/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="public/img/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="public/img/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="public/img/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="public/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="public/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="public/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="public/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="public/img/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="public/img/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <!-- Material Design fonts -->
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/icon?family=Material+Icons">

    <!-- Bootstrap CSS cdn -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
          crossorigin="anonymous">

    <!-- Font Awesome CSS cdn -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

    <!-- Material Design for Bootstrap css files -->
    <link rel="stylesheet" href="public/css/bootstrap-material-design.css">
    <link rel="stylesheet" href="public/css/ripples.css">

    <!-- Custom css -->
    <link rel="stylesheet" href="public/css/app.css">
</head>

<!-- Navigation -->
<div class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php"><i class="fa fa-home" aria-hidden="true"></i> Accueil</a>
        </div>
        <div class="navbar-collapse collapse navbar-responsive-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="allContacts.php">&nbsp; Vue tableur <i class="fa fa-eye-slash"></i> </a></li>
            </ul>
        </div>
    </div>
</div>

<!-- App Alert-->
<div id="ajax_msg" class="alert alert-success"></div>
<div id="ajax_msgerror" class="alert alert-danger"></div>