export function isConnected() {
  return localStorage.getItem("token") !== null || sessionStorage.getItem("token") !== null;
}

export function getToken() {
  let token: any = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token)
  }
  token = sessionStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  }
}