import { useState } from "react";
import "./TaskList.css";
import PropTypes from "prop-types";

const TaskList = ({ list, getData, filterObj, title }) => {
    const [editTask, setEditTask] = useState(null);
    const [editObject, setEditObject] = useState({});

    const handleEditField = (key, value) => {
        setEditObject((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleEditData = async () => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${editObject._id}`, {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify(editObject),
                headers: { "content-type": "application/json" },
            });

            const respObj = await resp.json();
            if (respObj.status === "success") {
                console.log("success :: updated");
                handleCancel();
                getData();
            } else {
                alert(respObj.message);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleCancel = () => {
        setEditTask(null);
        setEditObject({});
    };

    const handleDelete = async (taskId) => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (resp.status === 204) {
                console.log("success :: deleted");
                getData();
            } else {
                alert("Error in delete");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleMarkAsDone = async (taskId) => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify({ status: "done" }),
                headers: { "content-type": "application/json" },
            });

            const respObj = await resp.json();
            if (respObj.status === "success") {
                console.log("success :: updated");
                getData();
            } else {
                alert(respObj.message);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const filteredList = list.filter((elem) => {
        // First check status
        const statusMatch = elem.status === filterObj.status;
        
        // Then check priority if it's set
        const priorityMatch = !filterObj.priority || elem.priority === filterObj.priority;
        
        // Return true only if both conditions are met
        return statusMatch && priorityMatch;
    });

    return (
        <div className="task-list-main">
            <h3 className="task-list-title">{title}</h3>
            <div className="task-list-task-container">
                {filteredList.map((elem, idx) => (
                    <div key={elem._id} className="task-card">
                        <h4>#Task {idx + 1}</h4>
                        <p className="task-title">{elem.workTitle}</p>
                        <p className="task-title">{elem.taskTitle}</p>

                        <div className="edit-field">
                            <label>Assignee</label>
                            {elem._id === editTask ? (
                                <input
                                    className="input-field"
                                    value={editObject?.assignee || ""}
                                    onChange={(e) => handleEditField("assignee", e.target.value)}
                                />
                            ) : (
                                <p>{elem.assignee}</p>
                            )}
                        </div>

                        <div className="edit-field">
                            <label>Assignor</label>
                            <p>{elem.assignor}</p>
                        </div>

                        <div className="edit-field">
                            <label>Deadline</label>
                            <p>{elem.deadline}</p>
                        </div>

                        <div className="edit-field">
                            <label>Priority</label>
                            {elem._id === editTask ? (
                                <select
                                    className="priority-dropdown"
                                    name="priority"
                                    value={editObject?.priority || ""}
                                    onChange={(e) => handleEditField("priority", e.target.value)}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="low">Low</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            ) : (
                                <p className={`priority-badge priority-${elem.priority}`}>{elem.priority}</p>
                            )}
                        </div>

                        <p>{elem.status}</p>

                        <div className="task-actions">
                            {elem._id === editTask ? (
                                <>
                                    <button className="btn-submit" onClick={handleEditData}>Submit Changes</button>
                                    <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn-edit"
                                        onClick={() => {
                                            setEditObject(elem);
                                            setEditTask(elem._id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(elem._id)}>Delete</button>
                                    <button className="btn-done" onClick={() => handleMarkAsDone(elem._id)}>Mark as Done</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

TaskList.propTypes = {
    list: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired,
    filterObj: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default TaskList;