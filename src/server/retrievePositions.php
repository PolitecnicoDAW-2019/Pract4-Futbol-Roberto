<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);
require_once __DIR__ . "/oConexion.class.php";

$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();

$oConsulta = $oConni->query("SELECT * FROM POSITIONS");
while ($position = $oConsulta->fetch_object()) {
    $positions[$position->DESCRIPTION] = $position->ID;
}
echo json_encode($positions);