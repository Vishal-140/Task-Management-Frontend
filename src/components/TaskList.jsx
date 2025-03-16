import { useState } from "react";
import "./TaskList.css";
import PropTypes from "prop-types";

const TaskList = ({ list, getData, filterObj }) => {
    const [editTask, setEditTask] = useState(null);
    const [editObject, setEditObject] = useState({});
    const [expandedCard, setExpandedCard] = useState(null);

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
        
        // Then check priority if its set
        const priorityMatch = !filterObj.priority || elem.priority === filterObj.priority;
        
        // Return true only if both conditions are met
        return statusMatch && priorityMatch;
    });

    const handleCardClick = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="task-list-main">
            <div className="task-header">
                <div className="task-header-row">
                    <div>Task Number</div>
                    <div>Task Title</div>
                    <div>Assignee</div>
                    <div>Assignor</div>
                    <div>Deadline</div>
                    <div>Priority</div>
                    <div>Actions</div>
                </div>
            </div>
            <div className="task-scroll-container">
                {filteredList.map((elem, idx) => (
                    <div 
                        key={elem._id} 
                        className={`task-card ${expandedCard === elem._id ? 'expanded' : ''}`}
                        onClick={() => handleCardClick(elem._id)}
                    >
                        <div>#{idx + 1}</div>
                        <div className="task-title-cell">{elem.taskTitle}</div>
                        {elem._id === editTask ? (
                            <>
                                <div>
                                    <input
                                        type="text"
                                        value={editObject.assignee || ""}
                                        onChange={(e) => handleEditField("assignee", e.target.value)}
                                        className="edit-input"
                                    />
                                </div>
                                <div>{elem.assignor}</div>
                                <div>
                                    <input
                                        type="datetime-local"
                                        value={editObject.deadline?.slice(0, 16) || ""}
                                        onChange={(e) => handleEditField("deadline", e.target.value)}
                                        className="edit-input"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={editObject.priority || ""}
                                        onChange={(e) => handleEditField("priority", e.target.value)}
                                        className="edit-input"
                                    >
                                        <option value="low">Low</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                                <div className="task-actions">
                                    <button className="btn-submit" onClick={handleEditData}>Save</button>
                                    <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>{elem.assignee}</div>
                                <div>{elem.assignor}</div>
                                <div className="deadline-cell">
                                    {new Date(elem.deadline).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    }).replace(',', '\n')}
                                </div>
                                <div>
                                    <span className={`priority-badge priority-${elem.priority}`}>
                                        {elem.priority}
                                    </span>
                                </div>
                                <div className="task-actions">
                                    <button className="btn-edit" onClick={() => {
                                        setEditObject(elem);
                                        setEditTask(elem._id);
                                    }}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(elem._id)}>Delete</button>
                                    {filterObj.status === "todo" && (
                                        <button className="btn-done" onClick={() => handleMarkAsDone(elem._id)}>Done</button>
                                    )}
                                </div>
                            </>
                        )}
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