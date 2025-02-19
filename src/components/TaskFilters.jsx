import React from "react";

const TaskFilters = ({ setFiltersObj }) => {
    const handleFilter = (key, value) => {
        setFiltersObj((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="task-filters">
            <div className="filter-group">
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    onChange={(e) => handleFilter("priority", e.target.value)}
                >
                    <option value="">--Select--</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilters;