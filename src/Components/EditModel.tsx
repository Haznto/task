import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { Todo } from "./TodoList";

interface EditModelProps {
  selectedTodo: Todo | null;
  closeEditModal: () => void;
  descriptionInput: string;
  saveDescription: () => void;
  setDescriptionInput: (value: string) => void;
}

export default function EditModel({
  selectedTodo,
  closeEditModal,
  descriptionInput,
  saveDescription,
  setDescriptionInput,
}: EditModelProps) {
  return (
    <Dialog
      open={!!selectedTodo}
      onClose={closeEditModal}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit Task Description</DialogTitle>
      <DialogContent>
        <TextField
          label="Description"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          fullWidth
          multiline
          rows={6}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={closeEditModal}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={saveDescription}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
