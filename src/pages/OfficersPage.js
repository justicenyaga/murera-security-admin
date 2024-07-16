import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Delete, PersonAddOutlined } from "@mui/icons-material";

import Table from "../components/Table";

import colors from "../config/colors";
import officersApi from "../api/officers";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";

const OfficersPage = () => {
  const deleteOfficerApi = useApi(officersApi.deleteOfficer);

  const handleDeleteOfficer = async (officerId) => {
    const { ok, data } = await deleteOfficerApi.request(officerId);
    if (ok) getAllOfficers();
    else alert(data);
  };

  const adminColumns = [
    {
      header: "",
      accessorKey: "user.image",
      cell: ({ row }) => (
        <img
          src={row.original.user.image}
          alt="game"
          width="40px"
          style={{ borderRadius: "5px" }}
        />
      ),
    },
    {
      header: "Name",
      accessorKey: "user.firstName",
      cell: ({ row }) =>
        user.isSuperAdmin ? (
          <Link to={`/officers/${row.original._id}`}>
            {row.original.user.firstName} {row.original.user.lastName}
          </Link>
        ) : (
          `${row.original.user.firstName} ${row.original.user.lastName}`
        ),
    },
    {
      header: "Badge Number",
      accessorKey: "badgeNumber",
    },
    {
      header: "Email",
      accessorKey: "user.email",
    },
    {
      header: "Phone Number",
      accessorKey: "user.phone",
    },
    {
      header: "Police Station",
      accessorKey: "station.name",
    },
  ];

  const superAdminColumns = [
    ...adminColumns,
    {
      id: "delete",
      header: "",
      cell: ({ row }) => (
        <LoadingButton
          loading={deleteOfficerApi.loading}
          loadingPosition="start"
          onClick={() => handleDeleteOfficer(row.original._id)}
          sx={{ borderRadius: "50%" }}
          startIcon={<Delete color="error" />}
        />
      ),
    },
  ];

  const navigate = useNavigate();
  const { user } = useAuth();

  const columns = user.isSuperAdmin ? superAdminColumns : adminColumns;

  const [officers, setOfficers] = useState([]);

  const getAllOfficers = async () => {
    const { ok, data } = await officersApi.getAllOfficers();
    if (ok) setOfficers(data);
    else setOfficers([]);
  };

  const getStationOfficers = async () => {
    const { ok, data } = await officersApi.getStationOfficers();
    if (ok) setOfficers(data);
    else setOfficers([]);
  };

  useEffect(() => {
    !(user.isSuperAdmin || user.isAdmin) && navigate("/");
    user.isSuperAdmin ? getAllOfficers() : getStationOfficers();
  }, []);

  return (
    <>
      {user?.isSuperAdmin && (
        <Stack alignItems="flex-end" width="100%">
          <Button
            variant="contained"
            startIcon={<PersonAddOutlined />}
            onClick={() => navigate("/officers/0")}
            sx={{
              bgcolor: colors.green,
              boxShadow: 5,
              fontWeight: "bold",
              marginBottom: 2,
              "&:hover": {
                bgcolor: colors.green,
                transform: "scale(1.02)",
              },
            }}
          >
            Register Officer
          </Button>
        </Stack>
      )}

      <Table columns={columns} data={officers} />
    </>
  );
};

export default OfficersPage;
