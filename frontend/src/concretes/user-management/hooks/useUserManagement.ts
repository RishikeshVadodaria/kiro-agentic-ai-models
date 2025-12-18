import { useState, useEffect } from 'react';
import type { User } from '../types.ts';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/v1/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (name: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name,
          id: Date.now().toString() // Generate simple ID
        })
      });
      
      if (response.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, addUser, removeUser, loading };
};
