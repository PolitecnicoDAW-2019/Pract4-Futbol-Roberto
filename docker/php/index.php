<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);

require_once __DIR__ . "/oConexion.class.php";


$oConexion = new oConexion('vps456458.ovh.net', 'LOGINS', 'remoto', 'malagaesdeprimera');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();

$oConsulta = $oConni->query("SELECT ID, LAT, LON FROM USUARIOSR WHERE ID NOT IN (SELECT ID FROM USUARIOS) AND LAT IS NOT NULL AND LON IS NOT NULL");

$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
while ($usuario = $oConsulta->fetch_object()) {
   echo $usuario->ID;
}
/* $oConexion = new oConexion('localhost:8100', 'football', 'devuser', '1234');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion(); */