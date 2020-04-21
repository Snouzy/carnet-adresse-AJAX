<?php

include_once '../Database.php';

if(isset($_POST['word']) && !empty($_POST['word'])) {
    echo $_POST['word'];
}