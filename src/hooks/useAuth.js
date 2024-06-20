import usersApi from "../api/users";
import storeKeys from "../util/storeKeys";

export default function () {
  const user = JSON.parse(localStorage.getItem(storeKeys.USER_INFO));

  const logIn = async (authToken) => {
    localStorage.setItem(storeKeys.AUTH_TOKEN, JSON.stringify(authToken));
    const { ok, data } = await usersApi.getUser();
    if (ok) localStorage.setItem(storeKeys.USER_INFO, JSON.stringify(data));
    else alert(data);
  };

  const refreshUser = async () => {
    const { ok, data } = await usersApi.getUser();
    if (ok) localStorage.setItem(storeKeys.USER_INFO, JSON.stringify(data));
    else alert(data);
  };

  const logOut = () => {
    localStorage.removeItem(storeKeys.AUTH_TOKEN);
    localStorage.removeItem(storeKeys.USER_INFO);
  };

  return { user, logIn, logOut, refreshUser };
}
