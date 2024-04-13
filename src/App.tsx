import Content from "./components/Content/Content"
import Profile from "./components/Profile/Profile"
import Sidebar from "./components/Sidebar/Sidebar"
import './App.css';

const App = () => {

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard--content">
        <Content />
        <Profile />
      </div>
    </div>
  )
}

export default App