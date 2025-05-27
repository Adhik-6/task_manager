import React, { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DataContext } from '../main';
import axios from "axios"

const Edit_menu = () => {
	const {taskList, setTaskList} = useContext(DataContext);
	const [currentTask, setCurrentTask] = useState({})
	const [modTxt, setModTxt] = useState("")
	const [taskMsg, setTaskMsg] = useState("")
	const [taskStatus, setTaskStatus] = useState(false)
	const [green, setGreen] = useState(true)
	const location = useLocation();
	const _id = location.state;  // where state is the property of the argument (which is an object) that is passed. navigate('/Edit_menu', {state: tsk._id})
	const tskIndex = taskList.findIndex(task => task._id == _id)

	function dispMsg(res){
		console.log(res)
		if(res.status < 400){
			setGreen(true)
			setTaskMsg("Successfully Updated!!")
		}
		else{
			setGreen(false)
			setTaskMsg("Something went wrong")
		}
		const timeoutId = setTimeout(() => setTaskMsg(""), 5000);
		return () => clearTimeout(timeoutId);
	}

	console.log("running Edit Menu...")

	useEffect(() => {
		// using IIFE - Immediately Invoked Function Expression.
		(async () => {
			try{
				const res = await axios.get(`http://localhost:8000/api/v1/tasks/${_id}`)
				setCurrentTask(res.data)
			} catch(err) {
				console.log(err)
			}
		})()
	}, [])

	useEffect(() => {
		if(currentTask){
			setModTxt(currentTask.task);
			setTaskStatus(currentTask.status);
		}
    }, [currentTask]);

	async function updateValue1(e){
		e.preventDefault();
		try{
			const res = await axios.patch(`http://localhost:8000/api/v1/tasks/${_id}`, {task: modTxt, status: taskStatus})
			dispMsg(res)
			setCurrentTask(res.data[tskIndex])
			setTaskList(res.data)
			console.log(modTxt, taskStatus)
		} catch(err) {
			dispMsg(err)
			console.log(err)
		}
	}

	return (
		<section className='edit'>
			<form className='edit_form'>
				<h1>Edit Task</h1>
				<div>
					<label htmlFor="task_id">Task ID</label>
					<input id="task_id" name="task_id" type="text" disabled={true} value={_id} />
				</div>
				<div>
					<label htmlFor="task_name">Task Name</label>
					<input id="task_name" name="task_name" type="text" onChange={(e) => setModTxt(e.target.value)} value={modTxt} />
				</div>
				<div className='checkbox_div'>
					<label htmlFor="complete">Completed
					{taskStatus? 
						<svg className='tsk_btn checkbox_svg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0d7a06"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
						:
						<svg className='tsk_btn checkbox_svg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
					}</label>
					<input onChange={(e) => setTaskStatus(e.target.checked)} id='complete' name='complete' type="checkbox" checked={taskStatus}/>
				</div>
				<button onClick={(e) => updateValue1(e)}>Edit</button>
				{taskMsg && <p className={green?"smsg green":"smsg red"}>{taskMsg}</p> }
			</form>
			<div>
				<Link to="/"><button>Back To Menu</button></Link>
			</div>
		</section>
	)
}

export default Edit_menu