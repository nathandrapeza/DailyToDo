import { React, useState } from "react";
import { Link } from "react-router-dom";
import '../style/style.css';
import logo from "./images/logo.png";
import githubLogo from "./images/github.svg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CodeVerification = () => {

	const url = String(window.location.href);
    const email = url.slice(url.lastIndexOf("/")+1,url.length)
    
    const [resetCode, setResetCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    console.log(url)
    console.log(email)

    
	const notifyEmptyField = () => toast.warning("Please fill out the verification form.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const notifyWrongCode = () => toast.warning("The code you have entered is invalid.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
    const notifyPasswordMismatch = () => toast.warning("The passwords are inconsistent.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const notifySuccessfulReset = () => toast.success("Your password has been reset. Redirecting to login page.", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (resetCode == "" || password == "" || confirmPassword == "") {
			notifyEmptyField();
		} else if (password != confirmPassword) {
            notifyPasswordMismatch();
        } else {
			try {
				const res = await axios.put("/reset/", {
                    email,
					resetCode,
                    password
				});
				notifySuccessfulReset();
				setTimeout(() => {window.location.replace("/login"); }, 2500);

			} catch (err) {
				notifyWrongCode();
			}
		}
	};
    

  return (
    <div className="accountReset">
	  <ToastContainer />
     	 <div className="registerUserInfoSide">
			<h1>Resetting password for {email}</h1>
			<form className="accountResetForm" onSubmit={handleSubmit}>
				<label className="inputLabel">Verification Code:</label>
				<input className="textBox" type="text" onChange={e=>setResetCode(e.target.value)}></input>
                <label className="inputLabel">New password:</label>
				<input className="textBox" type="password" onChange={e=>setPassword(e.target.value)}></input>
                <label className="inputLabel">Confirm password:</label>
				<input className="textBox" type="password" onChange={e=>setConfirmPassword(e.target.value)}></input>
				<button className="accountResetButton" type="submit">Reset</button>
			</form>
			<hr></hr>
			<div className="accountManagement">
				<Link to="/login" className="microLink"><p>In the wrong place? Click here.</p></Link>
			</div>
		</div>
		</div>
    );
}

export default CodeVerification;