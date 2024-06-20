import { create } from "apisauce";
import storeKeys from "../util/storeKeys";

const apiClient = create({ baseURL: process.env.REACT_APP_API_URL });

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = JSON.parse(localStorage.getItem(storeKeys.AUTH_TOKEN));
  if (!authToken) return;

  request.headers["x-auth-token"] = authToken;
});

export default apiClient;
