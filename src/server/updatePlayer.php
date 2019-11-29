<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);
require_once __DIR__ . "/oConexion.class.php";
$IMAGES_DIRECTORY = '../images/';

$hashName = hash('sha256',$_POST['name']).'.png';
file_put_contents($IMAGES_DIRECTORY.$hashName, base64_decode(explode(',',$_POST['picture'])[1]));

$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmtPosition = $oConni->prepare("SELECT ID FROM POSITIONS WHERE DESCRIPTION = ?");
$stmtInsertion = $oConni->prepare("UPDATE PLAYERS SET NAME = ?, ALIAS = ?, BIRTHDATE = ?, PICTURE = ?, CLUB = ?, ID_POSITION = ? WHERE ID = ?");
/* $stmtInsertion = $oConni->prepare("INSERT INTO PLAYERS(NAME, ALIAS, BIRTHDATE, PICTURE, CLUB, ID_POSICION) VALUES(?, ?, ?, ?, ?, ?)"); */

$stmtPosition->bind_param('s', $_POST['position']);
$stmtPosition->execute();
$stmtPosition->store_result();
$stmtPosition->bind_result($idPosicion);
$stmtPosition->fetch();


$stmtInsertion->bind_param('sssssii', $_POST['name'], $_POST['alias'], $_POST['birthdate'], $hashName, $_POST['club'], $idPosicion, $_POST['id']);
$stmtInsertion->execute();

echo json_encode(["ESTATUS" => "OK", "pictureName" => $hashName]);