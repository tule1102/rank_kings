import { Button, Navbar } from "react-bootstrap";
import { User } from "../model"
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    const navigate = useNavigate()

    async function logout() {
        try {
            await axios.post("https://rank-kings-be.onrender.com/users/logout")
            .then((res) => {
              onLogoutSuccessful();
              navigate('https://rank-kings-be.onrender.com/')
            }, (error) => {
              console.log(error);
            });
            
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Organizer: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;