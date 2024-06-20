import client from "./client";

const endpoint = "/auth";

const login = (data) => client.post(endpoint + "/admin", data);

export default {
  login,
};
