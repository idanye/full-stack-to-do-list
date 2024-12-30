import { useNavigate } from "react-router-dom";
import { useTasksContext } from "../hooks/useTasksContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow' // to display dates more understandably to the user

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext()
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit/${task._id}`)
    }
    
    const handleDelete = async () => {
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'DELETE',
        })

        const json = await response.json()
        
        if (response.ok) {
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    return ( 
        <div className="task-details">            
            <h4>{task.title}</h4>

            <p>{task.description}</p>

            <p><strong>Due date: {formatDistanceToNow(new Date (task.due_date), { addSuffix: true })}</strong></p>

            <p>Created date: {formatDistanceToNow(new Date (task.create_date), { addSuffix: true })}</p>

            <p>Updated date: {formatDistanceToNow(new Date (task.update_date), { addSuffix: true })}</p>

            <p>Assigned user: {task.assigned_user_id}</p>

            <p>Priority id: {task.priority_id}</p>

            <p>Status id: {task.status_id}</p>
            
            <div className="icon-container">
                <span onClick={handleDelete} className="material-symbols-outlined">delete</span>

                <span onClick={handleEdit}className="material-symbols-outlined">edit</span>
            </div>
        </div>
    );
}
 
export default TaskDetails;