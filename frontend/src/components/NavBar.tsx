import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';
import { User } from "../model"
import "../App.css"

interface NavBarProps {
    loggedInUser: User | null
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onLogoutSuccessful }: NavBarProps) => {

    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    const handleBrandClick = () => {
        if (currentPath.startsWith('/jam')) {
            const confirmed = window.confirm('Did you save before exiting? All information will be lost otherwise');
            if (!confirmed) {
                return;
            }
        }
        navigate(loggedInUser ? '/dashboard' : '/');
    };

    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
            {/* <Navbar.Brand as={Link} to={loggedInUser ? '/dashboard' : '/'}>
                Rank Kings
            </Navbar.Brand> */}
          
                <Navbar.Brand className="nav-bar-brand"onClick={handleBrandClick}>
                    {currentPath.startsWith('/jam') ? "Dashboard" : "Rank Kings"}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                            : <NavBarLoggedOutView />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;