import Todo from '@/Components/TodoList';
import { Container, Typography, CssBaseline } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Typography variant="h4" component="h1" align="center" gutterBottom>
       
      </Typography>
      <Todo />
    </Container>
  );
}
