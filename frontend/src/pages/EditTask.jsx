import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasksContext } from '../hooks/useTasksContext';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useTasksContext()
    const [task, setTask] = useState(null);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate ] = useState('')
    const [assignedUserId, setAssignedUserId] = useState('')
    const [priorityId, setPriorityId] = useState('')
    const [statusId, setStatusId] = useState('')

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    // Fetch the task details
    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch(`/api/tasks/${id}`);
            const json = await response.json();
            
            // handling error
            if (!response.ok) {
                console.log("Error received", json)
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }

            if (response.ok) {
                const formattedTask = { ...json, due_date: formatDate(json.due_date) };
                
                setTitle(json.title)
                setDescription(json.description)
                setDueDate(formattedTask.due_date)
                setAssignedUserId(json.assigned_user_id)
                setPriorityId(json.priority_id)
                setStatusId(json.status_id)
                setTask(formattedTask);
                setError(null)
                setEmptyFields([])
            }
        };
        fetchTask();
    }, [ id ]);

    const handleSave = async (e) => {
        e.preventDefault();

        const task = {
            title, 
            description,    
            due_date: new Date(dueDate),
            assigned_user_id: parseInt(assignedUserId),
            priority_id: priorityId ? parseInt(priorityId) : null,
            status_id: statusId ? parseInt(statusId) : null
        }

        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json()

        // handling error
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            console.log(json.error)
        }

        if (response.ok) {
            setError(null)
            setEmptyFields([])
            dispatch({type: 'EDIT_TASK', payload: json})
            navigate('/'); // Redirect back to the home page
        }
    };

    return (
        <div className="edit-page">
            <form className="create" onSubmit={handleSave}>
                <h3>Edit Task</h3>
                
                { !task && <div className='loading'>Loading...</div>}

                { task && <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={emptyFields.includes('title') ? 'error' : ''}
                    />

                    <label>Description:</label>
                    <textarea
                        value={description}
                        rows="4"
                        onChange={(e) => setDescription(e.target.value)}
                        className={emptyFields.includes('description') ? 'error' : ''}
                    />

                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className={emptyFields.includes('due_date') ? 'error' : ''}
                    />

                    <label>Priority ID:</label>
                    <select
                        value={priorityId}
                        onChange={(e) => setPriorityId(e.target.value)}
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
                        value={statusId}
                        onChange={(e) => setStatusId(e.target.value)}
                        className={emptyFields.includes('status_id') ? 'error' : ''}
                    >
                        <option value="">Select Status</option>
                        <option value="1">1 - Draft</option>
                        <option value="2">2 - In Progress</option>
                        <option value="3">3 - On Hold</option>
                        <option value="4">4 - Completed</option>
                        <option value="5">5 - Deleted</option>
                    </select>

                    <div className="buttons">
                        <button type="submit">Save</button>
                        
                        <button onClick={() => navigate('/')}>Cancel</button>
                    </div>

                    {error && <div className="error">{error}</div>}

                </div> 
                }
            </form>
        </div>
    );
};

export default EditTask;
