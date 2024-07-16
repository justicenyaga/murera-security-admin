import client from "./client";

const endpoint = "/stations";

const getSubcountyStations = (subCountyId) =>
  client.get(`${endpoint}/subCounty/${subCountyId}`);

export default {
  getSubcountyStations,
};
