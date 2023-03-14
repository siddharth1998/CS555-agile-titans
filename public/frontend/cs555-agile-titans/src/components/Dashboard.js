import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
	const navigate = useNavigate();

    useEffect(() => {
        let loggedIn = localStorage.getItem("Auth");

        if (!loggedIn) navigate("/");    
    });
    return (<div>This is just a Dashboard page</div>);
};

export default Dashboard;