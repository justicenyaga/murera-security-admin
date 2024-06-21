import client from "./client";

const endpoint = "/users";

const getUser = () => client.get(endpoint + "/me");

const changeEmail = (data) => client.put(endpoint + "/change-email", data);

const changePhone = (data) => client.put(endpoint + "/change-phone", data);

const changePassword = (data) =>
  client.put(endpoint + "/change-password", data);

export default {
  changeEmail,
  changePhone,
  changePassword,
  getUser,
};
