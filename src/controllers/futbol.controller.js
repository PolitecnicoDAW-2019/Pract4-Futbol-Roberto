class FutbolController {
  constructor(_view, _httpService, _userService) {
    this.view = _view;
    this.httpService = _httpService;
    this.usersService = _userService;

    this.view.bindLoadPositions(this.handlerDoHttpRequest);
    this.loadUsers().then(response => {
      this.view.players = response;
      this.usersService = response;

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
