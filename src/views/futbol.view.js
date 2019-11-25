class FutbolView {
  DOM = {
    cardsPanel: document.getElementById('cardsPanel')
  };

  bindLoadPositions = handler => {
    handler({
      url: 'http://localhost/server/retrievePositions.php'
    }).then(response => (this.positions = response));
  };

  createCards = () => {
    const cardsContainer = document.createElement('div');

    console.log(this.players);

    for (const player of this.players) {
      const playerDiv = document.createElement('div');

      const nameElement = document.createElement('span');
      nameElement.textContent = `Player name: ${player.name}`;
      const aliasElement = document.createElement('span');
      aliasElement.textContent = `Player alias: ${player.alias}`;
      const birthDateElement = document.createElement('span');
      birthDateElement.textContent = `Player Birt Date: ${player.birthDate}`;
      const clubElement = document.createElement('span');
      clubElement.textContent = `Player club: ${player.club}`;
      const positionElement = document.createElement('span');
      positionElement.textContent = `Player position: ${player.position}`;
      const imageElement = document.createElement('img');
      imageElement.width = 300;
      imageElement.src = `data:image/jpeg;base64,${player.picture}`;

      playerDiv.appendChild(imageElement);
      playerDiv.appendChild(nameElement);
      playerDiv.appendChild(aliasElement);
      playerDiv.appendChild(birthDateElement);
      playerDiv.appendChild(clubElement);
      playerDiv.appendChild(positionElement);

      cardsContainer.appendChild(playerDiv);
    }

    this.DOM.cardsPanel.appendChild(cardsContainer);
  };
}
