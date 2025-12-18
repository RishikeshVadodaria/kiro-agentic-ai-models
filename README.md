# Agentic Models

A full-stack user and task management application built with FastAPI and React.

## Features

- **User Management**: Create, view, and delete users
- **Task Management**: Create and manage tasks with priorities and due dates
- **Modern UI**: React frontend with Material-UI components
- **RESTful API**: FastAPI backend with automatic documentation

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** - Lightweight database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Material-UI** - Component library
- **Vite** - Build tool

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Users
- `GET /api/v1/users` - List all users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/{user_id}` - Get user by ID
- `DELETE /api/v1/users/{user_id}` - Delete user

### Tasks
- `GET /api/v1/tasks` - List all tasks
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks/{task_id}` - Get task by ID
- `PUT /api/v1/tasks/{task_id}` - Update task
- `DELETE /api/v1/tasks/{task_id}` - Delete task

## Project Structure

```
agentic-models/
├── backend/
│   ├── api/           # API routes
│   ├── repositories/  # Data access layer
│   ├── services/      # Business logic
│   ├── schemas/       # Pydantic models
│   ├── config.py      # Configuration
│   ├── main.py        # Application entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API clients
│   │   ├── types/         # TypeScript types
│   │   └── concretes/     # Feature modules
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Development

### Backend Development
- The backend uses SQLite for data persistence
- Database is automatically initialized on first run
- API documentation is auto-generated at `/docs`

### Frontend Development
- Hot reload enabled for development
- Proxy configured to backend API
- Material-UI dark theme with purple accent

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).