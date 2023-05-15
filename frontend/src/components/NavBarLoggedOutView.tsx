import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// interface NavBarLoggedOutViewProps {
//     onSignUpClicked: () => void,
//     onLoginClicked: () => void,
// }

// const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
//     return (
//         <>
//             <Button onClick={onSignUpClicked}>Sign Up</Button>
//             <Button onClick={onLoginClicked}>Log In</Button>
//         </>
//     );
// }

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