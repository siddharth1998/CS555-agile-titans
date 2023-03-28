import "./App.css";
import ContractList from "./components/ContractList";
import CreateContract from "./components/CreateContract";
import ContractDetails from "./components/ContractDetails";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Issue from "./components/Issue";
import CustomerCare from "./components/CustomerCare";
import ContactUs from "./components/ContactUs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";
import TaskInfo from "./components/TaskInfo";

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
    {
      path: "/contactUs",
      element: <ContactUs></ContactUs>,
    },
    {
      path: "/newTask",
      element: <NewTask></NewTask>,
    },
    {
      path: "/tasks",
      element: <Tasks></Tasks>,
    },
    {
      path: "/TaskInfo",
      element: <TaskInfo></TaskInfo>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
