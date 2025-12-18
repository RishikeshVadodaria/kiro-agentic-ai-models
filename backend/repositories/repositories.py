import sqlite3
import os

class UserRepository:
    def __init__(self):
        self.db_path = "users.db"
        self._init_db()

    def _init_db(self):
        conn = sqlite3.connect(self.db_path)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL
            )
        """)
        conn.commit()
        conn.close()

    async def create_user(self, user_data: dict):
        conn = sqlite3.connect(self.db_path)
        conn.execute(
            "INSERT INTO users (id, name) VALUES (?, ?)",
            (user_data["id"], user_data["name"])
        )
        conn.commit()
        conn.close()
        return user_data["id"]

    async def get_user(self, user_id: str):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT id, name FROM users WHERE id = ?", (user_id,))
        result = cur.fetchone()
        conn.close()
        return dict(result) if result else None

    async def get_all_users(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT id, name FROM users")
        results = cur.fetchall()
        conn.close()
        return [dict(row) for row in results]

    async def delete_user(self, user_id: str):
        conn = sqlite3.connect(self.db_path)
        cur = conn.cursor()
        cur.execute("DELETE FROM users WHERE id = ?", (user_id,))
        rows_affected = cur.rowcount
        conn.commit()
        conn.close()
        return rows_affected > 0
