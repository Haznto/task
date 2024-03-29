/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";

import TasksGrid from "./TasksGrid";
import EditModel from "./EditModel";
import DeleteModel from "./DeleteModel";
import Task from "./Task";
import { SearchContext } from "./ThemeProviderUp";

export interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  deleted: boolean;
}
interface SearchContextType {
  search: string;
}
// const getTasksFromLocalStorage = (): Todo[] => {
//   const storedTasks = localStorage.getItem("tasks");
//   return storedTasks ? JSON.parse(storedTasks) : [];
// };

// const saveTasksToLocalStorage = (tasks: Todo[]): void => {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// };

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedLength, setSelectedLength] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [taskToDelete, setTaskToDelete] = useState<Todo | null>(null);
  const { search } = useContext(SearchContext) as SearchContextType;
  console.log(search);
  useEffect(() => {
    const storedTodos = localStorage.getItem("tasks");

    if (storedTodos && todos.length === 0) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(todos));
    } else {
      localStorage.setItem("tasks", "");
    }
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: new Date().getTime(),
          text: inputValue,
          description: "",
          completed: false,
          deleted: false,
        },
      ]);
      setInputValue("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo
      )
    );
  };

  const toggleCompletion = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const openEditModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setDescriptionInput(todo.description);
  };

  const closeEditModal = () => {
    setSelectedTodo(null);
  };

  const saveDescription = () => {
    if (selectedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === selectedTodo.id
            ? { ...todo, description: descriptionInput }
            : todo
        )
      );
      closeEditModal();
    }
  };

  const renderTodos = (status: string) => {
    let filteredTodos = todos.filter((todo) => !todo.deleted);

    if (search.trim() !== "") {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.text.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (status !== "all") {
      filteredTodos = filteredTodos.filter((todo) =>
        status === "completed" ? todo.completed : !todo.completed
      );
    }

    setSelectedLength(filteredTodos.length);

    return filteredTodos.map((todo) => (
      <Task
        key={todo.id}
        todo={todo}
        handlers={{ toggleCompletion, deleteTodo, openEditModal }}
      />
    ));
  };

  return (
    <Box maxWidth="xl">
      <TextField
        label="Add Todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addTodo}
        style={{ marginBottom: 20 }}
      >
        Add
      </Button>

      <TasksGrid renderTodos={renderTodos} totalTasks={selectedLength} />
      <EditModel
        selectedTodo={selectedTodo}
        closeEditModal={closeEditModal}
        setDescriptionInput={setDescriptionInput}
        saveDescription={saveDescription}
        descriptionInput={descriptionInput}
      />
      <DeleteModel
        showModal={!!taskToDelete}
        handleDeleteConfirmation={() => {
          taskToDelete?.id && deleteTodo(taskToDelete.id);
          setTaskToDelete(null);
        }}
        handleCloseDeleteModal={() => setTaskToDelete(null)}
      />
    </Box>
  );
};

export default TodoList;
