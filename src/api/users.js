import client from "./client";

const endpoint = "/users";

const getUser = () => client.get(endpoint + "/me");

const changeEmail = (data) => client.put(endpoint + "/change-email", data);

export default {
  changeEmail,
  getUser,
};
