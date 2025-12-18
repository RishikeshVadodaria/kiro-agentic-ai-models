import { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';

interface UserFormProps {
  onAddUser: (name: string) => Promise<void>;
  loading: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ onAddUser, loading }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    await onAddUser(name.trim());
    setName('');
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          variant="outlined"
          size="small"
          required
          fullWidth
        />
        <Button 
          type="submit" 
          variant="contained"
          disabled={loading || !name.trim()}
        >
          Add User
        </Button>
      </Box>
    </Paper>
  );
};
