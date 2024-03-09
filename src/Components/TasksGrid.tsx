'use client'
import { useState } from 'react';
import { Grid, Typography, MenuItem, Select, Pagination, SelectChangeEvent } from '@mui/material';

interface TasksGridProps {
  renderTodos: (status: string) => JSX.Element[];
  totalTasks: number;
}

export default function TasksGrid({ renderTodos, totalTasks }: TasksGridProps) {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
    setPage(1); 
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const tasksPerPage = 3;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12}>
        <Select
          value={selectedStatus}
          onChange={handleStatusChange}
          fullWidth
          variant="outlined"
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h5" gutterBottom>
          {selectedStatus === 'pending' && 'Pending Tasks'}
          {selectedStatus === 'completed' && 'Completed Tasks'}
        </Typography>
        {renderTodos(selectedStatus)
          .slice((page - 1) * tasksPerPage, page * tasksPerPage)}
      </Grid>
      {totalTasks > tasksPerPage && (
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Grid>
      )}
    </Grid>
  );
}
