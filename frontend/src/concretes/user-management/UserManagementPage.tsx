import { Container, Typography } from '@mui/material';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { useUserManagement } from './hooks/useUserManagement';

const UserManagementPage: React.FC = () => {
  const { users, addUser, removeUser, loading } = useUserManagement();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Management
      </Typography>
      <UserForm onAddUser={addUser} loading={loading} />
      <UserList users={users} onRemoveUser={removeUser} />
    </Container>
  );
};

export default UserManagementPage;
