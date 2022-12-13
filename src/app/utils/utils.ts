export function isConnected() {
  return localStorage.getItem("token") !== null || sessionStorage.getItem("token") !== null;
}