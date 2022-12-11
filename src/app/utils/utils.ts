export function isConnected() {
  return localStorage.getItem("token") !== null;
}