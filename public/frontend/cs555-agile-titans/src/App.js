import './App.css';
import ContractList from './components/ContractList';
import CreateContract from './components/CreateContract';
import ContractDetails from './components/ContractDetails';
import ContractContent from './components/ContractContent';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Issue from './components/Issue';
import CustomerCare from './components/CustomerCare';
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
      path: "/contract/create",
      element: <CreateContract></CreateContract>,
    },
    {
      path: "/contract/details/:contractNo",
      element: <ContractContent></ContractContent>,
    },
    {
      path: "contract/details",
      element: <ContractDetails></ContractDetails>,
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
    },
    {
      path: "/hello",
      element: <div>Not world!</div>,
    },
    {
      path: "/ticket",
      element: <Issue></Issue>,
    },
    {
      path: "/customerCare",
      element: <CustomerCare></CustomerCare>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
