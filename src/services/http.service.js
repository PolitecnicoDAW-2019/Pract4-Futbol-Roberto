class HttpService {
  makeRequest = ({ url, method = 'GET', data = {} }) => {
    return fetch(url, {
      method,
      data
    }).then(response => response.json());
  };
}
