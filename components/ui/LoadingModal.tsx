"use client";

import { Modal, Box, CircularProgress } from "@mui/material";
import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <Modal
      open={true} // Always open the modal
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{
        // Add rounded corners to the modal
        display: "flex", // Center the spinner horizontally
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: 400,
          height: 400,
          borderRadius: "10px",
          border: "1px solid white",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader color="black" size={40} />
      </Box>
    </Modal>
  );
};

export default LoadingModal;
