class PlayerService {
  playerExist = searchedId => this.players.find(({ id }) => id == searchedId);

  managePlayer = comingPlayer => {
    const player = this.playerExist(comingPlayer.id);
    return player
      ? this.updatePlayer(player, comingPlayer)
      : this.createPlayer(comingPlayer);
  };

  createPlayer = player => {
    this.players.push(player);
    return this.makeRequest({
      url: CREATE_PLAYER_URL,
      method: 'POST',
      body: player
    })
      .then(response => {
        console.log(response);
        player.picture = response.pictureName
        return this.players;
      })
      .catch(error => {
        console.log(error);
        return this.players;
      });
  };

  updatePlayer = (oldPlayer, updatedPlayer) => {
    const playerBackup = { ...oldPlayer };
    oldPlayer.alias = updatedPlayer.alias;
    oldPlayer.birthdate = updatedPlayer.birthdate;
    oldPlayer.club = updatedPlayer.club;
    oldPlayer.name = updatedPlayer.name;
    oldPlayer.picture = updatedPlayer.picture;
    oldPlayer.position = updatedPlayer.position;

    return this.makeRequest({
      url: UPDATE_PLAYER_URL,
      method: 'POST',
      body: oldPlayer
    })
      .then(response => {
        console.log(response);
        oldPlayer.picture = response.pictureName
        return this.players;
      })
      .catch(error => {
        console.log(error);
        oldPlayer = playerBackup;
        return this.players;
      });
  };

  deletePlayer = player => {
    const backupPlayers = [...this.players];
    this.players = this.players.filter(({ id }) => id !== player.id);

    return this.makeRequest({
      url: DELETE_PLAYER_URL,
      method: 'POST',
      body: { userId: player.id }
    }).then(response => {
      console.log(response);
      return this.players
    }).catch(error => {
      console.log(error);
      this.players = backupPlayers;
      return this.players;
    })
  };

  searchUser = event => {
    const playerName = event.target.value;
    console.log('playerName:',playerName);
    return this.makeRequest({ url: SEARCH_PLAYER_URL, body: { name: playerName } })
  }

  makeRequest = ({ url, method = 'POST', body = {} }) => {
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
