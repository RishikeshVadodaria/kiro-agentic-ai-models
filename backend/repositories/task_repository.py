import sqlite3
from typing import List, Optional
from schemas.task import Task, TaskCreate, TaskUpdate


class TaskRepository:
    def __init__(self, db_path: str = "users.db"):
        self.db_path = db_path
        self._init_db()
    
    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    notes TEXT,
                    priority TEXT DEFAULT 'MEDIUM',
                    completed BOOLEAN DEFAULT FALSE,
                    due_date TEXT,
                    elapsed_time INTEGER DEFAULT 0,
                    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
                )
            """)
    
    def create(self, task: TaskCreate) -> Task:
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute(
                "INSERT INTO tasks (title, notes, priority, completed, due_date) VALUES (?, ?, ?, ?, ?) RETURNING *",
                (task.title, task.notes, task.priority, task.completed, task.due_date)
            )
            row = cursor.fetchone()
            return Task(**dict(row))
    
    def get_all(self) -> List[Task]:
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            rows = conn.execute("SELECT * FROM tasks ORDER BY created_at DESC").fetchall()
            return [Task(**dict(row)) for row in rows]
    
    def get_by_id(self, task_id: int) -> Optional[Task]:
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            row = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
            return Task(**dict(row)) if row else None
    
    def update(self, task_id: int, task_update: TaskUpdate) -> Optional[Task]:
        updates = {k: v for k, v in task_update.dict(exclude_unset=True).items()}
        if not updates:
            return self.get_by_id(task_id)
        
        if 'due_date' in updates and updates['due_date']:
            updates['due_date'] = updates['due_date'].isoformat()
        
        set_clause = ", ".join(f"{k} = ?" for k in updates.keys())
        values = list(updates.values()) + [task_id]
        
        with sqlite3.connect(self.db_path) as conn:
            conn.execute(f"UPDATE tasks SET {set_clause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?", values)
            return self.get_by_id(task_id)
    
    def delete(self, task_id: int) -> bool:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
            return cursor.rowcount > 0
