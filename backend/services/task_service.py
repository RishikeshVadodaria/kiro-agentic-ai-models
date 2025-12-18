from typing import List, Optional
from repositories.task_repository import TaskRepository
from schemas.task import Task, TaskCreate, TaskUpdate


class TaskService:
    def __init__(self):
        self.repository = TaskRepository()
    
    def create_task(self, task_data: TaskCreate) -> Task:
        return self.repository.create(task_data)
    
    def get_all_tasks(self) -> List[Task]:
        return self.repository.get_all()
    
    def get_task(self, task_id: int) -> Optional[Task]:
        return self.repository.get_by_id(task_id)
    
    def update_task(self, task_id: int, task_update: TaskUpdate) -> Optional[Task]:
        return self.repository.update(task_id, task_update)
    
    def delete_task(self, task_id: int) -> bool:
        return self.repository.delete(task_id)
