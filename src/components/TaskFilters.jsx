import PropTypes from "prop-types";

const TaskFilters = ({ setFiltersObj }) => {

    const handleFilter = (key, value) => {
        setFiltersObj((prev) => {
            const newObj = { ...prev };
            newObj[key] = value;
            return newObj;
        });
    };
    return (
        <div>
            <div>
                <label>Filter by Priority</label>
                <select
                    name="priority"
                    onChange={(e) => {
                        handleFilter("priority", e.target.value);
                    }}
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


TaskFilters.propTypes = {
    setFiltersObj: PropTypes.func.isRequired,
};

export default TaskFilters;