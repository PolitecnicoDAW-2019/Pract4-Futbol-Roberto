class FutbolView {
  constructor() {
    this.changeControlPanelVisibility('hidden');
    this.DOM.closeButton.addEventListener('click', () =>
      this.changeControlPanelVisibility('hidden')
    );
    this.DOM.pictureBase64.addEventListener('change', this.loadPictureFromInput)

    this.DOM.inputName.addEventListener('keyup', this.manageValidations)
    this.DOM.inputAlias.addEventListener('keyup', this.manageValidations)
    this.DOM.inputClub.addEventListener('keyup', this.manageValidations)
    this.validations = {
      name: false,
      alias: false,
      club: false
    }
  }

  DOM = {
    cardsPanel: document.getElementById('cardsPanel'),
    controlPanel: document.getElementById('controlPanel'),
    closeButton: document.getElementById('closeButton'),
    selectPositions: document.getElementById('selectPositions'),
    panelButtons: document.getElementById('panelButtons'),
    formPlayer: document.getElementById('formPlayer'),
    playerPicture: document.getElementById('playerPicture'),
    pictureBase64: document.getElementById('pictureBase64'),
    searchPlayer: document.getElementById('searchPlayer'),
    inputName: document.getElementById('inputName'),
    inputAlias: document.getElementById('inputAlias'),
    inputClub: document.getElementById('inputClub')
  };

  fillSelectPosition = positions => {
    const entries = Object.entries(positions);
    for (const [position, value] of entries) {
      const optionElement = document.createElement('option');
      optionElement.textContent = position;
      optionElement.value = position;
      this.DOM.selectPositions.appendChild(optionElement);
    }
  };

  bindLoadPositions = handler => {
    handler({
      url: POSITIONS_URL
    }).then(response => {
      this.positions = response;
      this.fillSelectPosition(response);
    });
  };

  bindValidateName = handler => this.validateName = handler;
  bindValidateAlias = handler => this.validateAlias = handler;
  bindValidateClub = handler => this.validateClub = handler;

  manageValidations = event => {
    const element = event.target;
    const inputName = element.name;
    const inputValue = element.value;

    const validations = {
      name: this.validateName,
      alias: this.validateAlias,
      club: this.validateClub
    }
    const validateOK = validations[inputName](inputValue);
    this.validations[inputName] = validateOK;

    const allValidationsOK = Object.values(this.validations).every(validation => validation)
    this.enablePanelButtons(allValidationsOK);

    const changeCheck = {
      true: GREEN_TICK_URL,
      false: RED_CROSS_URL
    }
    const imageURL = changeCheck[validateOK];
    element.nextSibling.src = imageURL
  }

  enablePanelButtons = enable => {
    for(const button of this.DOM.panelButtons.getElementsByTagName('button')) {
      button.disabled = !enable;
    }
  }

  createCard = player => {
    player.pictureBase64 = '';

    const playerDiv = document.createElement('div');
    playerDiv.onclick = () => this.manageControlPanel('edit', player);
    playerDiv.className = 'playerCard';

    const age = moment().diff(player.birthdate, 'years');
    
    const nameElement = document.createElement('p');
    nameElement.textContent = `Nombre: ${player.name}`;
    const aliasElement = document.createElement('p');
    aliasElement.textContent = `Alias: ${player.alias}`;
    const birthDateElement = document.createElement('p');
    birthDateElement.textContent = `Edad: ${age}`;
    const clubElement = document.createElement('p');
    clubElement.textContent = `Club: ${player.club}`;
    const positionElement = document.createElement('p');
    positionElement.textContent = `Posición: ${player.position}`;
    const imageElement = document.createElement('img');
    imageElement.width = 150;
    imageElement.src = PROFILE_PICTURES_URL + player.picture;

    playerDiv.appendChild(imageElement);
    playerDiv.appendChild(nameElement);
    playerDiv.appendChild(aliasElement);
    playerDiv.appendChild(birthDateElement);
    playerDiv.appendChild(clubElement);
    playerDiv.appendChild(positionElement);

    return playerDiv;
  };

  loadCards = players => {
    this.DOM.cardsPanel.innerHTML = '';

    //Improve
    if(players){
      for (const player of players) {
        const card = this.createCard(player);
        this.DOM.cardsPanel.appendChild(card);
      }
    }

    const addPlayerCardDiv = document.createElement('div');
    addPlayerCardDiv.onclick = () => this.manageControlPanel('add');
    addPlayerCardDiv.className = 'playerCard';
    addPlayerCardDiv.textContent = '+';
    this.DOM.cardsPanel.appendChild(addPlayerCardDiv);
  };

  setVisibilityToHidden = () => {
    this.DOM.controlPanel.style.width = 0;
    this.DOM.cardsPanel.parentElement.style.width = '100%';
  };

  setVisibilityToShown = () => {
    this.DOM.controlPanel.style.width = '30%';
    this.DOM.cardsPanel.parentElement.style.width = '70%';
  };

  changeControlPanelVisibility = visibility => {
    const visibilities = {
      shown: this.setVisibilityToShown,
      hidden: this.setVisibilityToHidden
    };
    visibilities[visibility]();
  };

  clearFormPlayer = () => {
    const inputs = this.DOM.formPlayer.getElementsByTagName('input');
    for (const input of inputs) {
      console.log(input);
      input.value = '';
    }

    this.DOM.selectPositions.selectedIndex = 0;
    this.DOM.playerPicture.src =
    PROFILE_PICTURES_URL + DEFAULT_USER_ICON;
  };

  clearPanelButtons = () => (this.DOM.panelButtons.innerHTML = '');

  constructAddContent = user => {
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Player';
    addButton.onclick = () => this.createPlayer(user);
    this.DOM.panelButtons.appendChild(addButton);
  };

  constructEditContent = user => {
    this.loadPlayerInfoIntoPanel(user);
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => this.updatePlayer(user);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => this.deletePlayer(user).then(response => this.loadCards(response));

    this.DOM.panelButtons.appendChild(saveButton);
    this.DOM.panelButtons.appendChild(deleteButton);
  };

  manageControlPanel = (option, user = {}) => {
    const options = {
      add: this.constructAddContent,
      edit: this.constructEditContent
    };
    this.clearPanelButtons();
    this.clearFormPlayer();
    this.changeControlPanelVisibility('shown');
    options[option](user);
  };

  updatePlayer = player => {
    const inputs = this.DOM.formPlayer.getElementsByTagName('input');
    for (const input of inputs) {
      player[input.name] =
        input.value === '' ? player[input.name] : input.value;
    }
    const select = this.DOM.selectPositions;
    player.position = select.options[select.selectedIndex].text;
    player.picture = this.DOM.playerPicture.src;
    console.log(player)
    this.managePlayer(player).then(response => this.loadCards(response));
    this.changeControlPanelVisibility('hidden');
  };

  loadPictureFromInput = () => {
    const file = this.DOM.pictureBase64.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => this.DOM.playerPicture.src = fileReader.result;
    fileReader.readAsDataURL(file);
  }

  createPlayer = player => {
    const inputs = this.DOM.formPlayer.getElementsByTagName('input');
    for (const input of inputs) {
      player[input.name] = input.value;
    }
    const select = this.DOM.selectPositions;
    player.position = select.options[select.selectedIndex].text;
    player.picture = this.DOM.playerPicture.src;
    console.log(player)
    this.managePlayer(player).then(response => this.loadCards(response));
    this.changeControlPanelVisibility('hidden');
  };

  bindDeletePlayer = handler => {
    this.deletePlayer = (player) => {
      handler(player).then(response => this.loadCards(response));
      this.changeControlPanelVisibility('hidden');
    };
  }

  bindManagePlayer = handler => (this.managePlayer = handler);
  bindSearchUser = handler => {
    this.searchPlayer = event => handler(event).then(response => this.loadCards(response));
    this.DOM.searchPlayer.addEventListener('keyup', this.searchPlayer);
  }

  loadPlayerInfoIntoPanel = player => {
    const inputs = this.DOM.formPlayer.getElementsByTagName('input');
    for (const input of inputs) {
      input.value = player[input.name]
    }
    const select = this.DOM.selectPositions;
    select.options[select.selectedIndex].text = player.position
    this.DOM.playerPicture.src = PROFILE_PICTURES_URL + player.picture;
  } 
}
