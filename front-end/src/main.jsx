import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { React, useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Context } from "./context/Context";
import AccountReset from "./pages/accountreset";
import CodeVerification from "./pages/codeverification";

const App = () => {
    const {user} = useContext(Context);

    

    //useEffect(() =>)
      
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={user===null ? <Login /> : <Home />}></Route>
                <Route exact path="/login" element={user===null ? <Login /> : <Home />}></Route>
                <Route exact path="/register" element={user===null ? <Register /> : <Home />}></Route>
                <Route exact path="/forgot" element={user===null ? <AccountReset /> : <Home />}></Route>
                <Route exact path="/verify/:email" element={user===null ? <CodeVerification /> : <Home />}></Route>
            </Routes>
        </Router>
    )
}

export default App;