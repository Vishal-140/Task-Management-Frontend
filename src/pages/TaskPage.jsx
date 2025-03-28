import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./TaskPage.css";
import PropTypes from 'prop-types';

const TaskPage = ({ currUser, handleLogout }) => {
    const [list, setList] = useState([]);
    const [filtersObj, setFiltersObj] = useState({
        priority: "", 
        status: "todo"
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeList, setActiveList] = useState("todo");

    const getData = async () => {
        const query = [];
        if (filtersObj.priority) {
            query.push(`priority=${filtersObj.priority}`);
        }
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
        <div className="task-page-wrapper">
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            <div className="task-page">
                <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <div className="form-container">
                        <TaskForm getData={getData} />
                    </div>
                </aside>

                <main className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
                    <TaskFilters 
                        setFiltersObj={setFiltersObj}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                    <div className="list-navigation">
                        <button 
                            className={`nav-btn ${activeList === "todo" ? "active" : ""}`}
                            onClick={() => setActiveList("todo")}
                        >
                            Todo List
                        </button>
                        <button 
                            className={`nav-btn ${activeList === "done" ? "active" : ""}`}
                            onClick={() => setActiveList("done")}
                        >
                            Done List
                        </button>
                    </div>
                    <div className="task-lists-container">
                        {activeList === "todo" && (
                            <TaskList 
                                list={list} 
                                getData={getData} 
                                filterObj={{ ...filtersObj, status: "todo" }} 
                                title="Todo List" 
                            />
                        )}
                        {activeList === "done" && (
                            <TaskList 
                                list={list} 
                                getData={getData} 
                                filterObj={{ ...filtersObj, status: "done" }} 
                                title="Done List" 
                            />
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

TaskPage.propTypes = {
    currUser: PropTypes.object,
    handleLogout: PropTypes.func.isRequired,
};

export default TaskPage;