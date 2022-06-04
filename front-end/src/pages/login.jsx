import { React, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import '../style/style.css';
import logo from "./images/logo.png";
import githubLogo from "./images/github.svg";
import axios from 'axios';
import { Context } from "../context/Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	
	/*
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	*/
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching} = useContext(Context)
	const notifyIncorrectCredentials = () => toast.error("Incorrect account credentials.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const notifyIncompleteCredentials = () => toast.error("Incomplete account credentials.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const notifySuccessfulLogin = (username) => toast.success(`Logging into ${username}.`, {position: toast.POSITION.TOP_CENTER, autoClose: 5000});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (userRef.current.value == "" || passwordRef.current.value == "") {
			notifyIncompleteCredentials();
		} else {
			dispatch({type:"LOGIN_START"});
			try {
				const res = await axios.post("/login/", {
					username: userRef.current.value,
					password: passwordRef.current.value
				});
				notifySuccessfulLogin(userRef.current.value);
				setTimeout(() => { dispatch({type:"LOGIN_SUCCESS", payload: res.data}); }, 2000);
			} catch(err) {
				notifyIncorrectCredentials();
				dispatch({type:"LOGIN_FAILRUE"});
			}
		}
	};

	
	/*
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/login/", {
				username,
				password
			});
			res.data && window.location.replace("/")
		} catch (err) {
			setError(true);
		}
	}
	*/

    return (
      <div className="login">
		<ToastContainer />
        <div className="loginUserInfoSide">
					<h1>Daily ToDo</h1>
					<form className="loginForm" onSubmit={handleSubmit}>
						<label className="inputLabel">Username:</label>
						<input className="textBox" type="text" ref={userRef}></input>
						<label className="inputLabel">Password:</label>
						<input className="textBox" type="password" ref={passwordRef}></input>
						<button className="loginButton" type="submit">Login</button>
					</form>
					<hr></hr>
					<div className="accountManagement">
						<Link to="/register" className="microLink"><p>Don't have an account? Click here.</p></Link>
						<Link to="/forgot" className="microLink"><p>Forgot your password? Click <a>here</a>.</p></Link>
						<a href="https://github.com/nathandrapeza/DailyToDo"><img className="githubLogo" src={githubLogo} alt="logo" /></a>
					</div>
				</div>
				<div className="loginImageSide">
					<img
						className="logo"
						src={logo}
						alt="side aesthetic" />
				</div>


			</div>
    );
}

export default Login;