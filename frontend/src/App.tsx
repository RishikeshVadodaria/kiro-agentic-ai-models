import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import LoginPage from './components/pages/LoginPage';
import TodoPage from './components/pages/TodoPage';

const purpleTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#e1bee7',
    },
    background: {
      default: '#1a0d1f',
      paper: '#2d1b3d',
    },
  },
});

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUsername(name);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {username ? (
        <TodoPage username={username} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </ThemeProvider>
  );
}

export default App;