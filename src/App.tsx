import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddTemplatePage from './pages/AddTemplatePage';
import TemplatesListPage from './pages/TemplatesListPage';
import AddUserPage from './pages/AddUserPage';
import UsersListPage from './pages/UsersListPage';
import AddAdminPage from './pages/AddAdminPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
        <ThemeProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/templates" element={<TemplatesListPage />} />
        <Route path="/templates/add" element={<AddTemplatePage />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
        <Route path="/admins/add" element={<AddAdminPage />} />
              </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
