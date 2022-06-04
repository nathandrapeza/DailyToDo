import React, { useContext, useEffect, useRef, useState } from 'react';
import '../style/style.css';
import TopBar from '../components/topbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Context } from '../context/Context';
import axios from 'axios';
import ListItem from '../components/listitem';
import ToDoContainer from '../components/todocontainer';
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//toast.configure();

const Home = () => {

	let d = new Date();
	const [task, setTask] = useState("");
	const [duedate, setDuedate] = useState({date: d});
	const { user, dispatch } = useContext(Context);
	const [todoItems, setTodoItems] = useState([]);
	let formRef = useRef();

	const fetchTodoItems = async () => {
		const res = await axios.get(`/todo/${user.id}/`)
		console.log(res.data)
		setTodoItems(res.data)
	}
	
	useEffect(() => {
		fetchTodoItems();
	},[])

	const getDateStr = () => {
		var today = new Date();
		console.log(today);
		console.log(duedate);
		let date_str = ""
		date_str += String(today.getFullYear()) + "-"
		let month = today.getMonth() +1
		if (month < 10) {
			date_str += "0" + String(month);
		} else {
			date_str += String(month);
		}
		let date = today.getDate()
		date_str += "-"
		if (date < 10) {
			date_str += "0" + String(date);
		} else {
			date_str += String(date);
		}
		return date_str;
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (task == "") {
			console.log("wtf");
			notifyEmptyTask();
		} else {
			const res = await axios.post("/todo/", {
				user,
				task,
				duedate,
			});
			setTask("")
			const date_str = getDateStr();
			setDuedate({date: d})
			// console.log(date_str);
			fetchTodoItems();
		}
	};

	const notifyComplete = () => toast.success("Great job on completing a task! 🎉", {position: toast.POSITION.TOP_CENTER, autoClose: 2500});
	const notifyEmptyTask = () => toast.warning("Make sure your task has a description!", {position: toast.POSITION.TOP_CENTER, autoClose: 5000});

	const handleProgress = async (id) => {
		const res = await axios.put(`/todo/${id}/`, {
			// the backend will take care of the switch
		});
		const todoItem = todoItems.find(element => element.id == id);
		if (!todoItem.complete) {
			notifyComplete();
		}
		
		fetchTodoItems();
	};

	const handleDelete = async (id) => {
		const res = await axios.delete(`/todo/${id}/`, {
			// the backend will take care of the task deletion
		});

		fetchTodoItems();
	};

	/*
	const handleDelete = async (id) => {
		const res = await axios.delete("")
	}
	*/

	/*
	useEffect(() => {
		console.log(duedate)
	},[duedate]);
	*/
	console.log(duedate);

	return (
		<div className="home">
		<TopBar />
		<ToastContainer />
		<div>
            <form ref={formRef} onSubmit={handleSubmit} className="taskCreation">
                <input type="text" className="taskDesc" onChange={e=>setTask(e.target.value)} placeholder="What do you need to get done today?" value={task}></input>
				<div className="rightSide">
					<input className="dateSelector" type="date" onChange={e=>setDuedate({date: e.target.value})} value={duedate.date}></input>
					<button className="newTaskButton" type="submit">Add</button>
				</div>
            </form>
        </div>	
			<ToDoContainer todoItems={todoItems} clickCheck={handleProgress} clickDelete={handleDelete}/>
		</div>
	)
	

}

export default Home;