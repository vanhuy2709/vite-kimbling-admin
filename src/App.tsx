import Sidebar from "./components/Sidebar/Sidebar"
import { Outlet, useNavigate } from "react-router-dom";
import './App.css';
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storageUser = sessionStorage.getItem('user');

    if (!storageUser) {
      navigate('/login');
    }
  }, [])

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard--content">
        <Outlet />
      </div>
    </div>
  )
}

export default App;