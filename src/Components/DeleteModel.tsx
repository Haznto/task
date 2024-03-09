"use client";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";

interface DeleteModelProps {
  showModal: boolean;
  handleDeleteConfirmation: () => void;
  handleCloseDeleteModal: () => void;
}
export default function DeleteModel({
  showModal,
  handleDeleteConfirmation,
  handleCloseDeleteModal,
}: DeleteModelProps) {
  return (
    <Modal
      open={showModal}
      onClose={handleCloseDeleteModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      closeAfterTransition
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 4,
            width: 400,
          }}
        >
          <Typography
            variant="h4"
            color="#ed6c02"
            id="delete-modal-title"
            gutterBottom
          >
            Delete Task
          </Typography>
          <Alert severity="error">
            <AlertTitle>Warning</AlertTitle>
            If you proceed, this task will be deleted{" "}
            <strong>permanently</strong>!
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="warning"
              onClick={handleDeleteConfirmation}
              sx={{ mr: 1 }}
            >
              Proceed
            </Button>
            <Button variant="contained" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
