import './App.css';
import ContractList from './components/ContractList';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth></Auth>,
    },
    {
      path: "/contract",
      element: <ContractList></ContractList>,
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
    },
    {
      path: "/hello",
      element: <div>Not world!</div>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
