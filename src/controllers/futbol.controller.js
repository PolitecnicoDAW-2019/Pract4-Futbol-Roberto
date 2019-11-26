class FutbolController {
  constructor(_view, _httpService, _userService) {
    this.view = _view;
    this.httpService = _httpService;
    this.playerService = _userService;

    this.view.bindLoadPositions(this.handlerDoHttpRequest);
    this.loadUsers().then(response => {
      this.view.players = response;
      this.playerService = response;

      this.view.createCards();
    });
  }

  handlerDoHttpRequest = requestParameters =>
    this.httpService.makeRequest(requestParameters);

  loadUsers = () => {
    return this.httpService.makeRequest({
      url: 'http://localhost/server/retrievePlayers.php'
    });
  };
}
