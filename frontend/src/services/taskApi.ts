const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface Task {
  id?: number;
  title: string;
  notes: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  due_date: string;
  elapsed_time?: number;
  created_at?: string;
  updated_at?: string;
}

export const taskApi = {
  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'elapsed_time'>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    return response.json();
  },

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    return response.json();
  }
};
