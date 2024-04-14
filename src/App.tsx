import Sidebar from "./components/Sidebar/Sidebar"
import { Outlet } from "react-router-dom";
import './App.css';

const App = () => {

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