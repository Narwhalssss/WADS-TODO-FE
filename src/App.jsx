import "./App.css";
import { useCookies } from "react-cookie";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: all 0.50s linear;
  }
`;

// Define light and dark theme colors
const lightTheme = {
  body: '#FFF',
  text: '#363537',
};

const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
};

function App() {
  const [cookies, setCookie] = useCookies(['theme']);
  const [theme, setTheme] = useState(cookies.theme || 'light'); // Default to light theme

  useEffect(() => {
    setCookie('theme', theme, { path: '/' });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <button className="btn" onClick={toggleTheme}>Toggle Theme</button>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
