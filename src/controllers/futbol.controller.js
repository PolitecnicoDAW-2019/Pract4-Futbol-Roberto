class FutbolController {
  constructor(_view, _userService) {
    this.view = _view;
    this.playerService = _userService;

    this.view.bindLoadPositions(this.handlerDoHttpRequest);
    this.loadUsers().then(response => {
      this.view.createCards(response);
      this.playerService.players = response;
    });

    this.view.bindManagePlayer(this.handlerManagePlayer);
    this.view.bindDeletePlayer(this.handlerDeletePlayer);
  }

  handlerManagePlayer = player => this.playerService.managePlayer(player);

  handlerDeletePlayer = player => this.playerService.deletePlayer(player);

  handlerDoHttpRequest = requestParameters =>
    this.playerService.makeRequest(requestParameters);


    //Move to playerService
  loadUsers = () => {
    return this.playerService.makeRequest({
      url: 'http://localhost/server/retrievePlayers.php'
    });
  };
}
