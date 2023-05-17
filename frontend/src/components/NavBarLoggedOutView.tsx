import { Link } from "react-router-dom";


const NavBarLoggedOutView = () => {
    return (
        <>
            <Link to="/registration" className="site-title">
                Site Name
            </Link>
        </>
    );
}
export default NavBarLoggedOutView;