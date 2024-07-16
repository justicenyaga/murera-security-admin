import client from "./client";

const endpoint = "/officers";

const deleteOfficer = (officerID) => client.delete(endpoint + `/${officerID}`);

const getAllOfficers = () => client.get(endpoint + "/all");

const getStationOfficers = () => client.get(endpoint + "/mystation");

export default {
  deleteOfficer,
  getAllOfficers,
  getStationOfficers,
};
