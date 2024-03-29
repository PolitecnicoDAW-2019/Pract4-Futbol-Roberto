<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);
require_once __DIR__ . "/oConexion.class.php";

$nombreJugador = $_POST['name'];

$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();

$oConsulta = $oConni->query("SELECT PLAYERS.ID, NAME, ALIAS, BIRTHDATE, PICTURE, CLUB,DESCRIPTION FROM PLAYERS INNER JOIN POSITIONS ON PLAYERS.ID_POSITION = POSITIONS.ID WHERE NAME LIKE '%$nombreJugador%'");
while ($player = $oConsulta->fetch_object()) {
    $players[] = [
        "id" => $player->ID,
        "name" => $player->NAME,
        "alias" => $player->ALIAS,
        "birthdate" => $player->BIRTHDATE,
        "picture" => $player->PICTURE,
        "club" => $player->CLUB,
        "position" => $player->DESCRIPTION
    ];
}
echo json_encode($players);