import client from "./client";

const endpoint = "/officers";

const register = (officer) => {
  const data = new FormData();

  data.append("firstName", officer.firstName);
  data.append("lastName", officer.lastName);
  data.append("nationalId", officer.nationalId);
  data.append("dob", officer.dob);
  data.append("badgeNumber", officer.badgeNumber);
  data.append("email", officer.email);
  data.append("phone", officer.phone);
  data.append("image", officer.image);
  data.append("stationId", officer.stationId);

  return client.post(endpoint + "/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const update = (officerID, officer) =>
  client.put(endpoint + `/${officerID}`, officer);

const deleteOfficer = (officerID) => client.delete(endpoint + `/${officerID}`);

const getAllOfficers = () => client.get(endpoint + "/all");

const getStationOfficers = () => client.get(endpoint + "/mystation");

const getOfficerById = (id) => client.get(endpoint + `/${id}`);

export default {
  deleteOfficer,
  getAllOfficers,
  getOfficerById,
  getStationOfficers,
  register,
  update,
};
