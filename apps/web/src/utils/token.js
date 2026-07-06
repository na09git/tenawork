export const getToken = () => localStorage.getItem("accessToken");

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("accessToken", token);
  }
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  removeToken();
  localStorage.removeItem("user");
  window.location.href = "/auth/login";
};
