import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, Chip } from '@mui/material';
import TodoTaskForm from '../molecules/TodoTaskForm';
import { taskApi, type Task } from '../../services/taskApi';

interface TodoPageProps {
  username: string;
  onLogout: () => void;
}

export default function TodoPage({ username, onLogout }: TodoPageProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  const loadTasks = async () => {
    try {
      const allTasks = await taskApi.getTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {username}'s Todos
        </Typography>
        <Button variant="outlined" onClick={onLogout}>
          Logout
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add New Task
        </Typography>
        <TodoTaskForm onTaskCreated={handleTaskCreated} />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Your Tasks ({tasks.length})
        </Typography>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} sx={{ border: 1, borderColor: 'divider', mb: 1, borderRadius: 1 }}>
              <ListItemText
                primary={task.title}
                secondary={task.notes}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip 
                  label={task.priority} 
                  color={task.priority === 'HIGH' ? 'error' : task.priority === 'MEDIUM' ? 'warning' : 'default'}
                  size="small"
                />
                {task.completed && <Chip label="Completed" color="success" size="small" />}
              </Box>
            </ListItem>
          ))}
          {tasks.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No tasks yet. Create your first task above!
            </Typography>
          )}
        </List>
      </Box>
    </Container>
  );
}
