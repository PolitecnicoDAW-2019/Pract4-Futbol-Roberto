class PlayerService {
  playerExist = searchedId => this.players.find(({ id }) => id == searchedId);

  managePlayer = comingPlayer => {
    const player = this.playerExist(comingPlayer.id);
    return player
      ? this.updatePlayer(player, comingPlayer)
      : this.createPlayer(comingPlayer);
  };

  createPlayer = player => {};
  updatePlayer = (oldPlayer, updatedPlayer) => {
    const playerBackup = { ...oldPlayer };
    oldPlayer.alias = updatedPlayer.alias;
    oldPlayer.birthdate = updatedPlayer.birthdate;
    oldPlayer.club = updatedPlayer.club;
    oldPlayer.name = updatedPlayer.name;
    oldPlayer.picture = updatedPlayer.picture;
    oldPlayer.position = updatedPlayer.position;

    return this.makeRequest({
      url: 'http://localhost/server/updatePlayer.php',
      method: 'POST',
      body: oldPlayer
    })
      .then(response => {
        console.log(response);
        return this.players;
      })
      .catch(error => {
        console.log(error);
        oldPlayer = playerBackup;
      });
  };

  removePlayer = player => {};

  makeRequest = ({ url, method = 'GET', body = {} }) => {
    const data = this.generateFormData(body);
    return fetch(url, {
      method: method,
      body: data
    }).then(response => response.json());
  };

  generateFormData = data => {
    const entries = Object.entries(data);
    const formData = new FormData();
    for (const [key, value] of entries) {
      formData.append(key, value);
      console.log(key, value);
    }
    return formData;
  };
}
