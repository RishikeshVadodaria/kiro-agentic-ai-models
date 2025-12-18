import { Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import type { User } from '../types.ts';

interface UserListProps {
  users: User[];
  onRemoveUser: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onRemoveUser }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem 
            key={user.id}
            secondaryAction={
              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                onClick={() => onRemoveUser(user.id)}
              >
                Remove
              </Button>
            }
          >
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
