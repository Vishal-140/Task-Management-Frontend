import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import "./TaskPage.css";
import PropTypes from 'prop-types';

const TaskPage = ({ currUser, handleLogout }) => {
    const [list, setList] = useState([]);
    const [filtersObj, setFiltersObj] = useState({
        priority: "", 
        status: "todo"
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getData = async () => {
        const query = [];
        if (filtersObj.priority) {
            query.push(`priority=${filtersObj.priority}`);
        }
        console.log(query);
        const resp = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/tasks?${query}`,
            {
                credentials: "include",
            }
        ); 
        const respBody = await resp.json();
        const arrayOfTaskList = respBody.data.tasks;
        setList(arrayOfTaskList);
    };

    useEffect(() => {
        getData();
    }, [filtersObj]);

    return (
        <>
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            
            <div className="task-page">
                <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? "Close Form" : "Add New Task"}
                </button>

                <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <div className="form-container">
                        <TaskForm getData={getData} />
                    </div>
                </aside>

                <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                    <TaskFilters setFiltersObj={setFiltersObj} />
                    <div className="task-lists-container">
                        <div className="todo-list">
                            <TaskList 
                                list={list} 
                                getData={getData} 
                                filterObj={{ ...filtersObj, status: "todo" }} 
                                title="Todo List" 
                            />
                        </div>
                        <div className="done-list">
                            <TaskList 
                                list={list} 
                                getData={getData} 
                                filterObj={{ ...filtersObj, status: "done" }} 
                                title="Done List" 
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

TaskPage.propTypes = {
    currUser: PropTypes.object,
    handleLogout: PropTypes.func.isRequired,
};

export default TaskPage;