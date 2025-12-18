export type Task = {
  id?: number;
  title: string;
  notes: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  due_date: string;
  elapsed_time?: number;
  created_at?: string;
  updated_at?: string;
};
