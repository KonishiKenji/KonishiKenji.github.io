export function getToken(): string | null {
  return window.localStorage.getItem("token");
}

export function setToken(token: string): void {
  return window.localStorage.setItem("token", token);
}

export function clear(): void {
  return window.localStorage.clear();
}

export function setRefreshToken(token: string): void {
  return window.localStorage.setItem("refreshToken", token);
}

export function getRemainedUser(): string | null {
  return window.localStorage.getItem("remainedUserName");
}

export function setRemainedUser(userName: string | null): void {
  if (!userName) {
    return;
  }
  window.localStorage.setItem("remainedUserName", userName);
}

export function clearRemainedUser(): void {
  return window.localStorage.removeItem("remainedUserName");
}
