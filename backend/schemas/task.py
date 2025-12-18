from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class Priority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class TaskCreate(BaseModel):
    title: str
    notes: Optional[str] = ""
    priority: str = "MEDIUM"
    completed: bool = False
    due_date: Optional[str] = ""


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    notes: Optional[str] = None
    priority: Optional[Priority] = None
    completed: Optional[bool] = None
    due_date: Optional[datetime] = None


class Task(BaseModel):
    id: int
    title: str
    notes: Optional[str]
    priority: str
    completed: bool
    due_date: Optional[str]
    elapsed_time: int = 0
    created_at: str
    updated_at: str
