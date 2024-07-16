import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem, Stack, Typography } from "@mui/material";
import {
  AccountBalance,
  AccountBox,
  GpsFixed,
  LocalPolice,
  LocationSearching,
  MailOutline,
  Person,
} from "@mui/icons-material";
import * as Yup from "yup";
import dayjs from "dayjs";
import "yup-phone-lite";
import _ from "lodash";

import {
  Form,
  FormDateField,
  FormField,
  FormImageInput,
  FormPhoneField,
  SubmitButton,
} from "../components/form";

import countiesApi from "../api/counties";
import officersApi from "../api/officers";
import stationsApi from "../api/stations";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  nationalId: Yup.string().required().label("National ID"),
  dob: Yup.date().required().label("Date of Birth"),
  badgeNumber: Yup.string().required().label("Badge Number"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string()
    .phone("KE", "Phone Number must be a valid phone number")
    .required()
    .label("Phone Number"),
  image: Yup.mixed().required().label("Image"),
  county: Yup.string().required().label("County"),
  subCounty: Yup.string().required().label("Subcounty"),
  station: Yup.string().required().label("Police Station"),
});

const EditOfficerPage = () => {
  const { id: officerID } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const getOfficerApi = useApi(officersApi.getOfficerById);
  const registerApi = useApi(officersApi.register);
  const updateApi = useApi(officersApi.update);

  const [loadingOfficer, setLoadingOfficer] = useState(true);
  const [officerDetails, setOfficerDetails] = useState({});
  const [stations, setStations] = useState([]);
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);

  const isLessThan18 = (date) => {
    const today = dayjs();
    return today.diff(date, "year") < 18;
  };

  const getOfficerDetails = async () => {
    const { data, ok } = await getOfficerApi.request(officerID);
    if (!ok) return alert(data);

    const { ok: subCountiesOk, data: subCounties } =
      await countiesApi.getSubCounties(data.station.subCounty.county.code);
    if (!subCountiesOk) return alert(subCounties);
    const { ok: stationsOk, data: stations } = await stationsApi.getStations(
      data.station.subCounty._id,
    );
    if (!stationsOk) return alert(stations);

    setOfficerDetails(data);
    setSubCounties(subCounties);
    setStations(stations);
    setLoadingOfficer(false);
  };

  const handleError = () => {
    alert("Internal Server Error");
  };

  const getCounties = async () => {
    const { data, ok } = await countiesApi.getCounties();
    if (ok) setCounties(data);
    else handleError();
  };

  useEffect(() => {
    !user.isSuperAdmin && navigate("/officers");
    getCounties();
    if (officerID == 0) setLoadingOfficer(false);
    else getOfficerDetails();
  }, []);

  const handleCountySelect = async (countyCode) => {
    const { data, ok } = await countiesApi.getSubCounties(countyCode);
    if (ok) setSubCounties(data);
    else handleError();
  };

  const handleSubCountySelect = async (subCountyId) => {
    const { data, ok } = await stationsApi.getStations(subCountyId);
    if (ok) setStations(data);
    else handleError();
  };

  const handleSubmit = async (formData) => {
    const officerDetails = _.omit(formData, ["station", "county", "subCounty"]);
    officerDetails.stationId = formData.station;

    if (officerID == 0) {
      const { ok, data } = await registerApi.request(officerDetails);
      if (!ok) return alert(data);
      alert("Officer created sucessfully");
    } else {
      delete officerDetails.image;
      const { ok, data } = await updateApi.request(officerID, officerDetails);
      if (!ok) return alert(data);
      alert("Officer updated sucessfully");
    }

    navigate("/officers");
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "42%",
      }}
    >
      <Typography
        variant="h6"
        textAlign="center"
        width="200px"
        marginY={3}
        sx={{ fontSize: 24, fontWeight: 600 }}
      >
        {officerID == 0 ? "Register Officer" : "Edit Officer"}
      </Typography>

      {loadingOfficer ? (
        <Typography variant="subtitle1">Loading Officer...</Typography>
      ) : (
        <Form
          initialValues={{
            firstName: officerDetails?.user?.firstName ?? "",
            lastName: officerDetails?.user?.lastName ?? "",
            nationalId: officerDetails?.user?.nationalId ?? "",
            dob: officerDetails._id
              ? dayjs(new Date(officerDetails?.user?.dob))
              : null,
            badgeNumber: officerDetails?.badgeNumber ?? "",
            email: officerDetails?.user?.email ?? "",
            phone: officerDetails?.user?.phone ?? "",
            image: { name: officerDetails?.user?.image } ?? "",
            county: officerDetails?.station?.subCounty?.county?.code ?? "",
            subCounty: officerDetails?.station?.subCounty?._id ?? "",
            station: officerDetails?.station?._id ?? "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Stack
            spacing={1}
            direction="row"
            sx={{
              marginBottom: 2,
            }}
          >
            <FormField
              name="firstName"
              Icon={Person}
              label="First Name"
              placeholder="Enter first name"
              required
            />
            <FormField
              name="lastName"
              Icon={Person}
              label="Last Name"
              placeholder="Enter last name"
              required
            />
          </Stack>
          <FormField
            name="nationalId"
            Icon={AccountBox}
            label="National ID"
            placeholder="Enter national ID number"
            required
          />
          <FormDateField
            label="Date of Birth"
            name="dob"
            shouldDisableDate={isLessThan18}
            shouldDisableYear={isLessThan18}
            textFieldProps={{
              required: true,
              placeholder: "Select date of birth",
            }}
          />
          <FormField
            name="badgeNumber"
            Icon={LocalPolice}
            label="Badge Number"
            placeholder="Enter badge number"
            required
          />
          <FormField
            name="email"
            Icon={MailOutline}
            label="Email"
            placeholder="Enter email"
            required
          />
          <FormPhoneField
            name="phone"
            label="Phone Number"
            placeholder="Enter phone number"
            required
          />
          <FormImageInput
            name="image"
            label="Image"
            placeholder="Select profile picture"
            required
          />
          <Stack
            spacing={1}
            direction="row"
            width="100%"
            sx={{
              marginBottom: 2,
            }}
          >
            <FormField
              name="county"
              Icon={LocationSearching}
              label="Station County"
              onChange={handleCountySelect}
              required
              select
            >
              {counties.map((county, index) => (
                <MenuItem key={index} value={county.code}>
                  {county.name}
                </MenuItem>
              ))}
            </FormField>
            <FormField
              name="subCounty"
              Icon={GpsFixed}
              label="Station Subcounty"
              onChange={handleSubCountySelect}
              required
              select
            >
              {subCounties.map((subCounty, index) => (
                <MenuItem key={index} value={subCounty._id}>
                  {subCounty.name}
                </MenuItem>
              ))}
            </FormField>
          </Stack>
          <FormField
            name="station"
            Icon={AccountBalance}
            label="Police Station"
            required
            select
          >
            {stations.map((station, index) => (
              <MenuItem key={index} value={station._id}>
                {station.name}
              </MenuItem>
            ))}
          </FormField>
          <SubmitButton
            title={officerID == 0 ? "Register" : "Update"}
            loading={registerApi.loading || updateApi.loading}
            style={{ alignSelf: "flex-end" }}
          />
        </Form>
      )}
    </div>
  );
};

export default EditOfficerPage;
