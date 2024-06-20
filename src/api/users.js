import client from "./client";

const endpoint = "/users";

const getUser = () => client.get(endpoint + "/me");

export default {
  getUser,
};
