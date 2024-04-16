import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Progress Bar

// Import Page
import Dashboard from './pages/dashboard';
import Blog from './pages/blog';
import Role from './pages/role';
import LoginPage from './pages/login';

// Router Page
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'role',
        element: <Role />
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
