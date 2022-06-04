import React, { useContext } from 'react';
import '../style/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopBar = () => {
/* 
Current date code written by Samuel Meddows
https://stackoverflow.com/users/525895/samuel-meddows
*/

  const { user, dispatch } = useContext(Context);
  const notifySignout = () => toast.success(`Signing out of ${user.username}`, {position: toast.POSITION.TOP_CENTER, autoClose: 5000});
	var date = new Date();
	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = date.getFullYear();
	let today = mm + '/' + dd + '/' + yyyy;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  
  const handleLogout = () => {
    notifySignout();
    // waits the specified time and then runs the arrow function
    setTimeout(() => { dispatch({type: "LOGOUT"}); }, 2000);
    
  }


  return (
    <>
      <ToastContainer />
      <div className="topbar">
              <div className="topbarLeftSide">
              <h1>Today's Tasks</h1>
              <span className="currentDate">{days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()} - ({today})</span>
              </div>
              <div className="topbarRightSide">
                  <p>Logged in as {user.username}</p>
                  <button class="signoutButton" onClick={handleLogout}>Sign out</button>
              </div>
      </div>
    </>
		
	)

}

export default TopBar;