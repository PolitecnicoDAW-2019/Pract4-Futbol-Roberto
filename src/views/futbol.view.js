class FutbolView {
  constructor() {
    this.DOM.closeButton.addEventListener('click', () =>
      this.changeControlPanelVisibility('hidden')
    );
  }

  DOM = {
    cardsPanel: document.getElementById('cardsPanel'),
    controlPanel: document.getElementById('controlPanel'),
    closeButton: document.getElementById('closeButton'),
    selectPositions: document.getElementById('selectPositions')
  };

  fillSelectPosition = positions => {
    const entries = Object.entries(positions);
    for (const [position, value] of entries) {
      const optionElement = document.createElement('option');
      optionElement.textContent = position;
      optionElement.value = value;
      this.DOM.selectPositions.appendChild(optionElement);
    }
  };

  bindLoadPositions = handler => {
    handler({
      url: 'http://localhost/server/retrievePositions.php'
    }).then(response => {
      this.positions = response;
      this.fillSelectPosition(response);
    });
  };

  createCards = () => {
    for (const player of this.players) {
      const playerDiv = document.createElement('div');
      playerDiv.onclick = () => this.changeControlPanelVisibility('shown');
      playerDiv.className = 'playerCard';

      const nameElement = document.createElement('p');
      nameElement.textContent = `Player name: ${player.name}`;
      const aliasElement = document.createElement('p');
      aliasElement.textContent = `Player alias: ${player.alias}`;
      const birthDateElement = document.createElement('p');
      birthDateElement.textContent = `Player Birt Date: ${player.birthdate}`;
      const clubElement = document.createElement('p');
      clubElement.textContent = `Player club: ${player.club}`;
      const positionElement = document.createElement('p');
      positionElement.textContent = `Player position: ${player.position}`;
      const imageElement = document.createElement('img');
      imageElement.width = 100;
      imageElement.src = `data:image/jpeg;base64,${player.picture}`;

      playerDiv.appendChild(imageElement);
      playerDiv.appendChild(nameElement);
      playerDiv.appendChild(aliasElement);
      playerDiv.appendChild(birthDateElement);
      playerDiv.appendChild(clubElement);
      playerDiv.appendChild(positionElement);

      this.DOM.cardsPanel.appendChild(playerDiv);
    }
  };

  setVisibilityToHidden = () => {
    this.DOM.controlPanel.style.width = 0;
    this.DOM.cardsPanel.style.width = '100%';
  };

  setVisibilityToShown = () => {
    this.DOM.controlPanel.style.width = '30%';
    this.DOM.cardsPanel.style.width = '70%';
  };

  changeControlPanelVisibility = visibility => {
    const visibilities = {
      shown: this.setVisibilityToShown,
      hidden: this.setVisibilityToHidden
    };
    visibilities[visibility]();
  };

  constructBasicStructure = () => {
    const imageElement = document.createElement('img');
    imageElement.width = 100;
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name: ';
    const nameInput = document.createElement('input');
    const aliasLabel = document.createElement('label');
    aliasLabel.textContent = 'Alias: ';
    const aliasInput = document.createElement('input');
  };

  constructAddContent = user => {};

  constructEditContent = user => {};

  manageControlPanel = (option, user) => {
    const options = {
      add: '',
      edit: ''
    };
    options[option](user);
  };
}
