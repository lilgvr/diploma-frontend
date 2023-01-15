import React, { FC, useState } from 'react';
import styles from "./HeaderButton.module.scss";
import { Link } from "react-router-dom";
import login from "../../assets/icons/login.svg";
import logout from "../../assets/icons/logout.svg"

export const HeaderButton: FC<{ icon: string, to: string }> = ({ icon, to }) => {
    return (
        <Link to={ to } className={ styles.HeaderButtonLink }>
            <img src={ icon } alt={ icon }/>
        </Link>
    );
};

export const HeaderAccountButton: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogInClick = () => {
        setIsLoggedIn(true);
    }
    const handleLogOutClick = () => {
        setIsLoggedIn(false);
    }

    return (
        <div onClick={ isLoggedIn ? handleLogOutClick : handleLogInClick }>
            <img src={ isLoggedIn ? logout : login } alt=""/>
        </div>
    );
}
