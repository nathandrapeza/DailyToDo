import { React, useState } from "react";
import { Link } from "react-router-dom";
import '../style/style.css';
import logo from "./images/logo.png";
import githubLogo from "./images/github.svg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountReset = () => {
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

	const notifyIncompleteCredentials = () => toast.error("Incomplete account credentials.", {position: toast.POSITION.TOP_CENTER, autoClose: 2500});
	const notifyWrongEmail = () => toast.warning("This email does not belong to any account.", {position: toast.POSITION.TOP_CENTER, autoClose: 2500});
	const notifyInvalidEmail = () => toast.warning("The email entered is not valid.", {position: toast.POSITION.TOP_CENTER, autoClose: 2500});
	const notifyCodeSent = () => toast.success("A reset code has been sent to your email.", {position: toast.POSITION.TOP_CENTER, autoClose: 2500});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email == "") {
			notifyIncompleteCredentials();
		} else if (!ValidateEmail(email)) {
			notifyInvalidEmail();
		} else {
			try {
				const res = await axios.post("/reset/", {
					email,
				});
				notifyCodeSent();
				setTimeout(() => { window.location.replace(`/verify/${email}`); }, 3000);
				
			} catch (err) {
				notifyWrongEmail();
				setError(true);
			}
		}
	};

  return (
    <div className="accountReset">
	  <ToastContainer />
     	 <div className="registerUserInfoSide">
			<h1>Forgot your password?</h1><p>Don't worry, it happens!</p>
			
			<form className="accountResetForm" onSubmit={handleSubmit}>
				<label className="inputLabel">Email:</label>
				<input className="textBox" type="text" onChange={e=>setEmail(e.target.value)}></input>
				<button className="accountResetButton" type="submit">Reset</button>
			</form>
			<hr></hr>
			<div className="accountManagement">
				<Link to="/login" className="microLink"><p>Already have an account? Click here.</p></Link>
			</div>
		</div>
		</div>
    );
}

export default AccountReset;