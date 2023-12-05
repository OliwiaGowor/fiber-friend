import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = storedExpirationDate ? new Date(storedExpirationDate) : null;
  const now = new Date();
  const duration = expirationDate ? expirationDate.getTime() - now.getTime() : null;
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration && tokenDuration < 0) {
    return null;
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();

  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }
}
