import PropTypes from 'prop-types';
import Navbar from "../components/Navbar";

const HomePage = ({ currUser, handleLogout }) => {
    return (
        <div>
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            <h1>Home Page</h1>
        </div>
    );
};

HomePage.propTypes = {
    currUser: PropTypes.object,
    handleLogout: PropTypes.func.isRequired,
};

export default HomePage;