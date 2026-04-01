import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workspaces from "./pages/Workspaces";
import Boards from "./pages/Boards";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Default route*/}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workspaces/:workspaceId" element={<Workspaces />} />
        <Route path="/boards/:boardId" element={<Boards />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
