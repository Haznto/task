"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  CardContent,
  Card,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteModel from "./DeleteModel";
import { Todo } from "./TodoList";
interface TaskProps {
  todo: Todo;
  handlers: {
    toggleCompletion: (id: number) => void;
    deleteTodo: (id: number) => void;
    openEditModal: (todo: Todo) => void;
  };
}

export default function Task({ todo, handlers }: TaskProps) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteConfirmation = () => {
    handlers.deleteTodo(todo.id);
    setShowModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card
        key={todo.id}
        sx={{
          bgcolor: !todo.completed ? "white" : "#f0f0f0",
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {todo.text}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", marginTop: 1 }}
          >
            {todo.description}
          </Typography>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Button
                onClick={() => setShowModal(true)}
                aria-label="delete"
                sx={{ marginTop: 1, color: "#ed6c02" }}
              >
                <Delete />
              </Button>
              <Button
                onClick={() => handlers.openEditModal(todo)}
                aria-label="edit"
                color="primary"
                sx={{ marginTop: 1 }}
              >
                <Edit />
              </Button>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handlers.toggleCompletion(todo.id)}
                  color="primary"
                />
              }
              label="Completed"
              sx={{ marginTop: 2, alignSelf: "end" }}
            />
          </Box>
        </CardContent>
      </Card>

      <DeleteModel
        showModal={showModal}
        handleDeleteConfirmation={handleDeleteConfirmation}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </>
  );
}
