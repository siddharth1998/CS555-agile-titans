import './Auth.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchSomething } from '../services/fetchService';
import { SERVER_URL } from '../config';

const Auth = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: "",
		password: ""
	});

	const [errorMessage, setErrorMessage] = useState(null);

	const login = () => {
		let options = {
			method: 'POST',
			body: JSON.stringify(loginData),
			redirect: 'follow'
		};
		options.headers = new Headers();
		options.headers.append("Content-Type", "application/json");

		fetchSomething(`${SERVER_URL}user/auth/login`, options, res => {
			localStorage.setItem("Auth", res.token);
			navigate("/dashboard");
		}, err => {
			localStorage.removeItem("Auth");

			if (err.status === 401) setErrorMessage("Invalid email or password.");

			if (err.status >= 500) setErrorMessage("Uh! Oh Something went wrong on our side, we will fix it :)");
		});
	};

	const handleFormChange = (e) => {
		setErrorMessage(null);
		const { name, value } = e.target;

		setLoginData((previous) => {
			if (name === "email") return { email: value, password: previous.password };
			return { email: previous.email, password: value };
		});
	};

	const preventDefault = (e) => e.preventDefault();

	return (
		<form className="login-form wrapper fadeInDown" onSubmit={preventDefault}>
			<div id="formContent">
				<div className="fadeIn first">
					<img
						src="https://slackmojis.com/emojis/10031-60fps_parrot/download"
						id="icon"
						alt="User Icon"
					/>
				</div>
				<br />

				<input
					type="text"
					id="login"
					className="fadeIn second"
					name="email"
					placeholder="Email"
					onChange={handleFormChange}
					value={loginData.email}
				/>

				<input
					type="password"
					id="password"
					className="fadeIn second"
					name="password"
					placeholder="Password"
					onChange={handleFormChange}
					value={loginData.password}
				/>
				<br />

				{errorMessage && <div className='error-message'>{errorMessage}</div>}
				<br />
				<input type="submit" className="fadeIn fourth" value="Log In" onClick={login} />
			</div>
		</form>
	);
};

export default Auth;