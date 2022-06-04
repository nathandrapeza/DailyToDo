import { React, useState } from "react";
import { Link } from "react-router-dom";
import '../style/style.css';
import logo from "./images/logo.png";
import githubLogo from "./images/github.svg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);

	/*
	External javascript email validation using regular expressions
	Source: https://www.w3resource.com/javascript/form/email-validation.php
	*/
	const ValidateEmail = (emailInput) => {
	 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput))
	  {
		return (true)
	  }
		return (false)
	}

	const notifyIncompleteCredentials = () => toast.error("Incomplete account credentials.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const notifyExistingCredentials = () => toast.warning("An account with the entered username or email already exists.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const notifyInvalidEmail = () => toast.warning("The email entered is not valid.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const notifySuccessfulRegistration = () => toast.success("Account successfully registered. Redirecting to login page.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (username == "" || email == "" || password == "") {
			notifyIncompleteCredentials();
		} else if (!ValidateEmail(email)) {
			notifyInvalidEmail();
		} else {
			try {
				const res = await axios.post("/register/", {
					username,
					email,
					password,
				});
				notifySuccessfulRegistration();
				setTimeout(() => {res.data && window.location.replace("/login"); }, 2000);
				
			} catch (err) {
				notifyExistingCredentials();
				setError(true);
			}
		}
	};

  return (
    <div className="register">
	  <ToastContainer />
      <div className="registerUserInfoSide">
				<h1>Account Creation</h1>
				<form className="registerForm" onSubmit={handleSubmit}>
					<label className="inputLabel">Username:</label>
					<input className="textBox" type="text" onChange={e=>setUsername(e.target.value)}></input>
					<label className="inputLabel">Email:</label>
					<input className="textBox" type="text" onChange={e=>setEmail(e.target.value)}></input>
					<label className="inputLabel">Password:</label>
					<input className="textBox" type="password" onChange={e=>setPassword(e.target.value)}></input>
					<button className="registerButton" type="submit">Register</button>
				</form>
				<hr></hr>
				<div className="accountManagement">
					<Link to="/login" className="microLink"><p>Already have an account? Click here.</p></Link>
				</div>
			</div>
			<div className="registerImageSide">
				<img
					className="logo"
					src={logo}
					alt="side aesthetic" />
			</div>
		</div>
    );
}

export default Register;