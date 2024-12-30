import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"

const TaskForm = () => {
    const { dispatch } = useTasksContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate ] = useState('')
    const [assignedUserId, setAssignedUserId] = useState('')
    const [priorityId, setPriorityId] = useState('')
    const [statusId, setStatusId] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = {
            title, 
            description,    
            due_date: new Date(dueDate),
            assigned_user_id: parseInt(assignedUserId),
            priority_id: priorityId ? parseInt(priorityId) : null,
            status_id: statusId ? parseInt(statusId) : null
        }

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json()

        // handling error
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setDescription('')
            setDueDate('')
            setAssignedUserId('')
            setPriorityId('')
            setStatusId('')
            setError(null)
            setEmptyFields([])
            console.log('new task added', json)
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new task</h3>

            <label>Task Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''} 
            />

            <label>Task Description:</label>
            <textarea 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows={2}
                columns={5}
                className={emptyFields.includes('description') ? 'error' : ''}  
            />

            <label>Due Date:</label>
            <input 
                type="date"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
                className={emptyFields.includes('due_date') ? 'error' : ''}
            />
            
            <label>Assigned User ID:</label>
            <input 
                type="number"
                onChange={(e) => setAssignedUserId(e.target.value)}
                value={assignedUserId}   
                className={emptyFields.includes('assigned_user_id') ? 'error' : ''}
            />

            <label>Priority ID:</label>
            <select 
                onChange={(e) => setPriorityId(e.target.value)}
                value={priorityId}
                className={emptyFields.includes('priority_id') ? 'error' : ''}
            >
                <option value="">Select Priority</option>
                <option value="1">1 - Low</option>
                <option value="2">2 - Medium</option>
                <option value="3">3 - High</option>
                <option value="4">4 - Urgent</option>
            </select>

            <label>Status ID:</label>
            <select 
                onChange={(e) => setStatusId(e.target.value)}
                value={statusId}
                className={emptyFields.includes('status_id') ? 'error' : ''}
            >
                <option value="">Select Status</option>
                <option value="1">1 - Draft</option>
                <option value="2">2 - In Progress</option>
                <option value="3">3 - On Hold</option>
                <option value="4">4 - Completed</option>
                <option value="5">5 - Deleted</option>
            </select>

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm