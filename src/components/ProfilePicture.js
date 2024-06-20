import React, { useState } from "react";
import { Box, Modal, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const ProfilePicture = ({ imageUrl, uploading }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewImage = () => {
    setModalOpen(true);
  };

  const handleCloseImage = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        width="100px"
        height="100px"
        borderRadius="50%"
        marginTop={1}
        sx={{ cursor: "pointer" }}
        onClick={handleViewImage}
      >
        {uploading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress sx={{ color: "#fdb417" }} />
          </Box>
        ) : (
          <img
            src={imageUrl}
            alt="profile"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ borderRadius: "50%" }}
          />
        )}
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleCloseImage}
        aria-labelledby="enlarged-image"
        aria-describedby="enlarged-profile-image"
      >
        <div
          onClick={handleCloseImage}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            outline: "none",
          }}
        >
          <img
            src={imageUrl}
            alt="profile-enlarged"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      </Modal>
    </>
  );
};

ProfilePicture.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  uploading: PropTypes.bool,
};

export default ProfilePicture;
