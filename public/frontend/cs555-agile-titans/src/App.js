import "./App.css";
import ContractList from "./components/ContractList";
import CreateContract from "./components/CreateContract";
import ContractDetails from "./components/ContractDetails";
import ContractContent from './components/ContractContent';
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Issue from "./components/Issue";
import CustomerCare from "./components/CustomerCare";
import ContactUs from "./components/ContactUs/ContactUs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";
import TaskInfo from "./components/TaskInfo";
import NewProject from "./components/NewProject";
import Projects from "./components/Projects";

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
    {
      path: "/contactUs",
      element: <ContactUs></ContactUs>,
    },
    {
      path: "/newTask",
      element: <NewTask></NewTask>,
    },
    {
      path: "projects/tasks",
      element: <Tasks></Tasks>,
    },
    {
      path: "/taskInfo",
      element: <TaskInfo></TaskInfo>,
    },
    {
      path: "/newProject",
      element: <NewProject></NewProject>,
    },
    {
      path: "/projects",
      element: <Projects></Projects>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
