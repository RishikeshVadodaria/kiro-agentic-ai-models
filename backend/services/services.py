from repositories import UserRepository
from schemas import UserCreate, UserResponse

class UserService:
    def __init__(self):
        self.repository = UserRepository()

    async def create_user(self, user: UserCreate) -> UserResponse:
        user_data = user.model_dump()
        await self.repository.create_user(user_data)
        return UserResponse(**user_data)

    async def get_user(self, user_id: str) -> UserResponse:
        user_data = await self.repository.get_user(user_id)
        if not user_data:
            return None
        return UserResponse(**user_data)

    async def get_all_users(self) -> list[UserResponse]:
        users_data = await self.repository.get_all_users()
        return [UserResponse(**user) for user in users_data]

    async def delete_user(self, user_id: str) -> bool:
        return await self.repository.delete_user(user_id)
