import './TaskForm.css';
import PropTypes from "prop-types";

const TaskForm = ({ getData }) => {
    const addTask = async (obj) => {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
            method: "POST",
            body: JSON.stringify(obj),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respObj = await resp.json();
        if (respObj.status === "success") {
            console.log("Task added successfully");
            getData();
            return true; // Return true on success
        } else {
            alert(respObj.message);
            return false; // Return false on failure
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();

        const taskTitle = e.target.taskTitle.value.trim();
        const assignee = e.target.assignee.value.trim();
        const deadline = e.target.deadline.value;
        const priority = e.target.priority.value;

        if (!taskTitle || assignee.length < 3) {
            alert("Task Title and Assignee are required.");
            return;
        }

        const dataObj = {
            taskTitle,
            assignee,
            deadline,
            priority,
            assignor: "Likhilesh",
        };

        const success = await addTask(dataObj);
        if (success) {
            e.target.reset(); // Reset the form on successful submission
        }
    };

    return (
        <div className="task-form-container">
            <form onSubmit={handleAddTask}>
                <div className="form-group">
                    <label>Task Title</label>
                    <input type="text" name="taskTitle" required />
                </div>
                <div className="form-group">
                    <label>Assignee</label>
                    <input type="email" name="assignee" required />
                </div>
                <div className="form-group">
                    <label>Deadline</label>
                    <input type="datetime-local" name="deadline" />
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <select name="priority">
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Add Task</button>
            </form>
        </div>
    );
};

TaskForm.propTypes = {
    getData: PropTypes.func.isRequired,
};

export default TaskForm;