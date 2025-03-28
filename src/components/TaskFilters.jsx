import PropTypes from "prop-types";
import "./TaskFilters.css";

const TaskFilters = ({ setFiltersObj, isSidebarOpen, setIsSidebarOpen }) => {
    const handleFilter = (key, value) => {
        setFiltersObj((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="filters-container">
            <button className="add-task-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? "Close Form" : "Add New Task"}
            </button>
            <div className="filter-group">
                <label>Filter by Priority:</label>
                <select
                    name="priority"
                    onChange={(e) => handleFilter("priority", e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Priorities</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>
        </div>
    );
};

TaskFilters.propTypes = {
    setFiltersObj: PropTypes.func.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    setIsSidebarOpen: PropTypes.func.isRequired,
};

export default TaskFilters;