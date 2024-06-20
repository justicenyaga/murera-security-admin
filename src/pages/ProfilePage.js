import React from "react";
import { TextField as MUITextField, Stack } from "@mui/material";
import PropTypes from "prop-types";

import ProfilePicture from "../components/ProfilePicture";

import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

const TextField = ({ label, value, no_margin = false }) => (
  <MUITextField
    label={label}
    variant="outlined"
    value={value}
    sx={{
      mt: no_margin ? null : 2,
      borderRadius: 3,
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: colors.medium,
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: colors.medium,
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: colors.medium,
      },
    }}
    size="small"
    fullWidth
    InputProps={{
      readOnly: true,
      sx: {
        borderRadius: 3,
      },
    }}
  />
);

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "50%",
      }}
    >
      <ProfilePicture imageUrl={user.image} />
      <Stack
        mt={3}
        direction={"row"}
        spacing={1}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField label="First Name" value={user.firstName} />
        <TextField label="Last Name" value={user.lastName} />
      </Stack>
      <TextField label="National ID Number" value={user.nationalId} />
      <TextField
        label="Date of Birth"
        value={new Date(user.dob).toDateString("en-GB")}
      />
      <TextField label="Email" value={user.email} />
      <TextField label="Phone Number" value={user.phone} />
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  no_margin: PropTypes.bool,
};

export default ProfilePage;
