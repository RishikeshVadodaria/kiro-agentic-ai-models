from fastapi import APIRouter, HTTPException
from schemas import UserCreate, UserResponse
from services import UserService
from .tasks import router as tasks_router

router = APIRouter(prefix="/api/v1")
user_service = UserService()

# Include tasks router without prefix since it already has /api/v1/tasks
router.include_router(tasks_router, prefix="")

@router.post("/users", response_model=UserResponse)
async def create_user(user: UserCreate):
    return await user_service.create_user(user)

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    user = await user_service.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/users", response_model=list[UserResponse])
async def get_all_users():
    return await user_service.get_all_users()

@router.delete("/users/{user_id}")
async def delete_user(user_id: str):
    success = await user_service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}
