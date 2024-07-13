import React from "react";
import { Button, InputAdornment } from "@mui/material";
import { FileUpload, Image } from "@mui/icons-material";
import PropTypes from "prop-types";
import TextField from "./TextField";

const ImageInput = ({ image, onChangeImage, ...rest }) => {
  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    onChangeImage(file);
  };

  return (
    <TextField
      value={image?.name}
      InputProps={{
        readOnly: true,
        startAdornment: <Image fontSize="inherit" sx={{ mr: 1 }} />,
        endAdornment: (
          <InputAdornment position="end" sx={{ marginRight: "-10px" }}>
            <Button
              variant="contained"
              color="inherit"
              component="label"
              startIcon={<FileUpload />}
              size="small"
              sx={{ fontWeight: 550, marginRight: 0 }}
            >
              Upload
              <input
                type="file"
                hidden
                onChange={handleUploadFile}
                accept="image/*"
              />
            </Button>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

ImageInput.propTypes = {
  image: PropTypes.object,
  onChangeImage: PropTypes.func.isRequired,
};

export default ImageInput;
