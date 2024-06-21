import client from "./client";

const endpoint = "/users";

const getUser = () => client.get(endpoint + "/me");

const changeEmail = (data) => client.put(endpoint + "/change-email", data);

const changePhone = (data) => client.put(endpoint + "/change-phone", data);

export default {
  changeEmail,
  changePhone,
  getUser,
};
