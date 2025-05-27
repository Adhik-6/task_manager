import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom' //using the useNavigate() we can pass arguments when navigating to another page. This is more like the Link element but with arguments.
import { DataContext } from '../main' 
import axios from 'axios'

const Main_menu = () => {
	const {taskList, setTaskList} = useContext(DataContext);
	const [newTask, setNewTask] = useState("")
	const [taskMsg, setTaskMsg] = useState("")
	const [green, setGreen] = useState(true)
	const navigate = useNavigate();
	
	function dispMsg(res){
		console.log(res)
		setNewTask("");
		if(res.status < 400){
			setGreen(true)
			setTaskMsg("Successfully Added!!")
		}
		else{
			setGreen(false)
			setTaskMsg("Something went wrong")
		}
		const timeoutId = setTimeout(() => setTaskMsg(""), 5000);
		return () => clearTimeout(timeoutId);
	}
	
	console.log("Running Main Menu....")

	async function addTask(e){
		e.preventDefault();
		try{
			const res = await axios.post("http://localhost:8000/api/v1/tasks", {"task": newTask})
			dispMsg(res)
			setTaskList(res.data)
		} catch(err) {
			dispMsg(err)
			console.log(err)
		}
	}

	async function checkChange(_id){
		try{
			const prevStatus = taskList.find(tsk => tsk._id == _id)
			const res = await axios.patch(`http://localhost:8000/api/v1/tasks/${_id}`, {status: !prevStatus.status})
			setTaskList(res.data)
		} catch(err) {
			console.log(err)
		}
	}

	async function delTask(_id){
		if(!window.confirm("Are you sure you wanna delete this task?")){return}
		try{
			const res = await axios.delete(`http://localhost:8000/api/v1/tasks/${_id}`)
			setTaskList(res.data)
		} catch (err) {
			console.log(err)
		}
	}

	return (
    <section className='main'>
			<form>
				<h1>Task Manager</h1>
				<div>
					<input value={newTask} onChange={(e) => setNewTask(e.target.value)} type="text" placeholder='e.g. Walk the dog' />
					<button onClick={addTask}>Add Task</button>
				</div>
				{taskMsg && <p className={green?"smsg green":"smsg red"}>{taskMsg}</p> }
			</form>
			<section className='tasks'>
				{ taskList.map((tsk) => (
				<div key={tsk._id} className='task'>
					<div>
						<input checked={tsk.status} onChange={() => checkChange(tsk._id)} id={`complete-${tsk._id}`} name='complete' type="checkbox" />
						<label className={tsk.status?"strike_through":""} htmlFor={`complete-${tsk._id}`}>
							{tsk.status? 
							<svg className='tsk_btn checkbox_main_svg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0d7a06"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
							:
							<svg className='tsk_btn checkbox_main_svg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
							}
							{tsk.task}
						</label>
					</div>
					<div>
						<svg onClick={() => navigate('/Edit_menu', {state: tsk._id})} className='tsk_btn' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4B77D1"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
						<svg onClick={() => delTask(tsk._id)} className='tsk_btn' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
					</div>
				</div>
				))}
			</section>
    </section>
    )
}

export default Main_menu