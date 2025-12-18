import { useState } from 'react';
import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  Box, 
  Paper,
  Alert
} from '@mui/material';
import { taskApi, type Task } from '../../services/taskApi';

interface TodoTaskFormProps {
  onTaskCreated?: (task: Task) => void;
}

interface TaskData {
  title: string;
  notes: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  due_date: string;
}

export default function TodoTaskForm({ onTaskCreated }: TodoTaskFormProps) {
  const [formData, setFormData] = useState<TaskData>({
    title: '',
    notes: '',
    priority: 'MEDIUM',
    completed: false,
    due_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const newTask = await taskApi.createTask(formData);
      onTaskCreated?.(newTask);
      setFormData({
        title: '',
        notes: '',
        priority: 'MEDIUM',
        completed: false,
        due_date: ''
      });
    } catch {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          fullWidth
          disabled={loading}
        />
        
        <TextField
          label="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          multiline
          rows={3}
          fullWidth
          disabled={loading}
        />
        
        <FormControl fullWidth disabled={loading}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={formData.priority}
            label="Priority"
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' })}
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Due Date"
          type="datetime-local"
          value={formData.due_date}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          InputLabelProps={{ shrink: true }}
          fullWidth
          disabled={loading}
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.completed}
              onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
              disabled={loading}
            />
          }
          label="Mark as completed"
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2 }}
          disabled={loading || !formData.title.trim()}
        >
          {loading ? 'Creating...' : 'Add Task'}
        </Button>
      </Box>
    </Paper>
  );
}
