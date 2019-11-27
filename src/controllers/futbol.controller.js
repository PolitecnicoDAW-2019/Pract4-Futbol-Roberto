class FutbolController {
  constructor(_view, _httpService, _userService) {
    this.view = _view;
    this.httpService = _httpService;
    this.playerService = _userService;

    this.view.bindLoadPositions(this.handlerDoHttpRequest);
    this.loadUsers().then(response => {
      this.view.createCards(response);
      this.playerService.players = response;
    });

    this.view.bindManagePlayer(this.handlerManagePlayer);
  }

  handlerManagePlayer = player => this.playerService.managePlayer(player);

  handlerDoHttpRequest = requestParameters =>
    this.httpService.makeRequest(requestParameters);

  loadUsers = () => {
    return this.httpService.makeRequest({
      url: 'http://localhost/server/retrievePlayers.php'
    });
  };
}
