import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, List, ListItem, ListItemText } from '@mui/material';

interface User {
  id: number;
  name: string;
}

const AddUserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      });
      
      if (response.ok) {
        setName('');
        fetchUsers(); // Refresh user list
        console.log('User added successfully');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          size="small"
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading || !name.trim()}
        >
          Add User
        </Button>
      </Box>
      
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AddUserForm;
