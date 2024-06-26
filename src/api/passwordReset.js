import client from "./client";

const endpoint = "/password-reset";

const requestReset = (email) =>
  client.post(endpoint + "/admin-request", { email });

const resetPassword = (email, newPassword) =>
  client.post(endpoint, { email, newPassword });

export default {
  requestReset,
  resetPassword,
};
