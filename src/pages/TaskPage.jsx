import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import "./TaskPage.css";

const TaskPage = () => {
    const [list, setList] = useState([]);
    const [filtersObj, setFiltersObj] = useState({
        priority: "",
    });

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
        setList(respBody.data.tasks);
    };

    useEffect(() => {
        getData();
    }, [filtersObj]);

    return (
        <div className="task-page">
            <aside className="sidebar">
                <h2 className="page-title">Task Management Tool</h2>
                <div className="form-container">
                    <TaskForm getData={getData} />
                </div>
            </aside>

            <main className="main-content">
                <TaskFilters setFiltersObj={setFiltersObj} />
                <div className="task-lists-container">
                    <TaskList 
                        list={list} 
                        getData={getData} 
                        filterObj={{ status: "todo" }} 
                        title="Todo List" 
                    />
                    <TaskList 
                        list={list} 
                        getData={getData} 
                        filterObj={{ status: "done" }} 
                        title="Done List" 
                    />
                </div>
            </main>
        </div>
    );
};

export default TaskPage;