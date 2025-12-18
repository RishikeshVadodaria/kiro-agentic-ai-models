from fastapi import APIRouter, HTTPException
from typing import List
from schemas.task import Task, TaskCreate, TaskUpdate
from services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["tasks"])
task_service = TaskService()


@router.post("/", response_model=Task)
async def create_task(task: TaskCreate):
    return task_service.create_task(task)


@router.get("/", response_model=List[Task])
async def get_tasks():
    return task_service.get_all_tasks()


@router.get("/{task_id}", response_model=Task)
async def get_task(task_id: int):
    task = task_service.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: int, task_update: TaskUpdate):
    task = task_service.update_task(task_id, task_update)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}")
async def delete_task(task_id: int):
    if not task_service.delete_task(task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
