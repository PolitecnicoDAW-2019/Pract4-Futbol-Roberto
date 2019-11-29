const POSITIONS_URL = 'http://localhost/server/retrievePositions.php';
const PLAYERS_URL = 'http://localhost/server/retrievePlayers.php';
const DELETE_PLAYER_URL = 'http://localhost/server/deletePlayer.php';
const UPDATE_PLAYER_URL = 'http://localhost/server/updatePlayer.php';
const CREATE_PLAYER_URL = 'http://localhost/server/createPlayer.php';
const SEARCH_PLAYER_URL = 'http://localhost/server/searchPlayer.php';

const PROFILE_PICTURES_URL = 'http://localhost/images/';
const DEFAULT_USER_ICON = "default.png";

const GREEN_TICK_URL = 'https://pngriver.com/wp-content/uploads/2018/04/Download-Green-Tick-PNG-File.png';
const RED_CROSS_URL = 'https://cdn.pixabay.com/photo/2012/04/12/13/15/red-29985_960_720.png';

const REGEXP = {
    NAME: /^[a-zA-Z].{2,15}$/,
    ALIAS: /^[a-zA-Z].{2,15}$/,
    CLUB: /^[a-zA-Z].{2,10}$/,
  };