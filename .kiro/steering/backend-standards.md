Use snake_case for Python files, packages, functions, and variables.
Use PascalCase for class names.
Use UPPER_SNAKE_CASE for constants and environment variables.
Use clear, descriptive names (no abbreviations unless widely known).
One FastAPI app per service, entry point in main.py.
Group HTTP routes under /api/v1 and use plural resource names (e.g., /api/v1/users).
Organize code into api/, schemas/, services/, repositories/, utils/, tests/.
Put all configuration in config.py and read from environment variables.
Never hard-code secrets or credentials in code.
Keep functions small and focused on a single responsibility.
Use consistent response format for success and errors.
Log structured data only; no printing directly to stdout.
Handle all unexpected errors with a global exception handler returning a safe 500 response.
Write tests for business logic and data access; use pytest and test_*.py naming.
