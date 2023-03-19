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

	const [signUpData, setSignUpData] = useState({
		"userName": "",
		"email": "",
		"password": "",
		"lastName": "",
		"firstName": ""
	});

	const [signUpFlag, setSignUpFlag] = useState(false);

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
			setErrorMessage(err.message);
		});
	};

	const signUp = () => {
		console.log(signUpData);
		let options = {
			method: 'POST',
			body: JSON.stringify(signUpData),
			redirect: 'follow'
		};
		options.headers = new Headers();
		options.headers.append("Content-Type", "application/json");

		fetchSomething(`${SERVER_URL}user/auth/signup`, options, res => {
			setSignUpFlag(prev => !prev);
			setLoginData(() => {
				return {
					email: "",
					password: ""
				}
			});
			setSignUpData(() => {
				return {
					"userName": "",
					"email": "",
					"password": "",
					"lastName": "",
					"firstName": ""
				};
			});
		}, err => {
			console.log(err);
			localStorage.removeItem("Auth");
			setErrorMessage(err.message);
		});
	};

	const goToSignUpForm = () => {
		setErrorMessage(null);
		setSignUpFlag(prev => !prev);
	};

	const handleFormChange = (e) => {
		setErrorMessage(null);
		const { name, value } = e.target;

		setLoginData(prev => {
			if (name === "email") return { ...prev, email: value };
			return { email: prev.email, password: value };
		});
	};

	const handleSignUpFormChange = (e) => {
		const { name, value } = e.target;

		setSignUpData(prev => {
			switch (name) {
				case "userName": return { ...prev, userName: value };
				case "email": return { ...prev, email: value };
				case "password": return { ...prev, password: value };
				case "lastName": return { ...prev, lastName: value };
				case "firstName": return { ...prev, firstName: value };
				default: return prev;
			}
		})
	}

	const preventDefault = (e) => e.preventDefault();

	return (
		<div>
			{!signUpFlag && <form className="login-form wrapper fadeInDown" onSubmit={preventDefault}>
				<div id="formContent">
					<div className="fadeIn first">
						<img
							src="https://slackmojis.com/emojis/10031-60fps_parrot/download"
							id="icon"
							alt="User Icon"
						/>
					</div>
					<br />

					<div>
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
						<div className='signup-text' onClick={goToSignUpForm}> Sign Up </div>
					</div>
				</div>
			</form>}

			{
				signUpFlag && <form className="login-form wrapper fadeInDown" onSubmit={preventDefault}>
					<div id="formContent">
						<div className="fadeIn first">
							<img
								src="https://slackmojis.com/emojis/10031-60fps_parrot/download"
								id="icon"
								alt="User Icon"
							/>
						</div>
						<br />

						<div>
							<input
								type="text"
								id="firstName"
								className="fadeIn"
								name="firstName"
								placeholder="First Name"
								onChange={handleSignUpFormChange}
								value={signUpData.firstName}
							/>

							<input
								type="text"
								id="lastName"
								className="fadeIn"
								name="lastName"
								placeholder="Last Name"
								onChange={handleSignUpFormChange}
								value={signUpData.lastName}
							/>

							<input
								type="text"
								id="userName"
								className="fadeIn"
								name="userName"
								placeholder="User Name"
								onChange={handleSignUpFormChange}
								value={signUpData.userName}
							/>

							<input
								type="text"
								id="login"
								className="fadeIn"
								name="email"
								placeholder="Email"
								onChange={handleSignUpFormChange}
								value={signUpData.email}
							/>

							<input
								type="password"
								id="password"
								className="fadeIn"
								name="password"
								placeholder="Password"
								onChange={handleSignUpFormChange}
								value={signUpData.password}
							/>
							<br />

							{errorMessage && <div className='error-message'>{errorMessage}</div>}
							<br />
							<input type="submit" className="fadeIn fourth" value="Sign Up" onClick={signUp} />
							<div className='signup-text' onClick={goToSignUpForm}> Log In </div>
						</div>

					</div>
				</form>
			}
		</div>
	);
};

export default Auth;