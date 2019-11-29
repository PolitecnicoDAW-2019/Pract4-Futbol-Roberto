class FutbolController {
  constructor(_view, _playerService, _validationService) {
    this.view = _view;
    this.playerService = _playerService;
    this.validationService = _validationService;

    this.view.bindLoadPositions(this.handlerDoHttpRequest);
    this.loadUsers().then(response => {
      this.view.loadCards(response);
      this.playerService.players = response;
    });

    this.view.bindSearchUser(this.handlerSearchUser);
    this.view.bindManagePlayer(this.handlerManagePlayer);
    this.view.bindDeletePlayer(this.handlerDeletePlayer);

    this.view.bindValidateName(this.handlerValidateName);
    this.view.bindValidateAlias(this.handlerValidateAlias);
    this.view.bindValidateClub(this.handlerValidateClub);
  }

  handlerManagePlayer = player => this.playerService.managePlayer(player);
  handlerDeletePlayer = player => this.playerService.deletePlayer(player);
  handlerSearchUser = event => this.playerService.searchUser(event);

  handlerValidateName = name => this.validationService.validateName(name);
  handlerValidateAlias = alias => this.validationService.validateAlias(alias);
  handlerValidateClub = club => this.validationService.validateClub(club);

  handlerDoHttpRequest = requestParameters =>
    this.playerService.makeRequest(requestParameters);

  loadUsers = () => {
    return this.playerService.makeRequest({
      url: PLAYERS_URL
    });
  };
}
